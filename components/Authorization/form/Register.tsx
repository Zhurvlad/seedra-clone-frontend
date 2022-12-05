import React from 'react';
import styles from "../Authorization.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema, RegisterSchema} from "../../../utils/validation";
import {CreateUserDto, LoginDto} from '../../../utils/api/types';
import {Api} from '../../../utils/api';
import {setCookie} from 'nookies';

type RegisterProps = {
    setOnLogin: (s: string) => void
}

export const Register:React.FC<RegisterProps> = ({setOnLogin}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema)
    });

    const onSubmit = async (dto: CreateUserDto) => {

        try{
            const data = await Api().user.register(dto, 'user')
            console.log(dto)
            setCookie(null, 'TJAuthToken', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
        } catch (e) {

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.onLogin}>
            <h3>Вход</h3>
            <p>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
            <div className={styles.promocode}>
                <p>E-mail</p>
                <input {...register("email")} type="text" placeholder={'E-mail'}/>
                <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div className={styles.promocode}>
                <p>FullName</p>
                <input {...register("fullName")} type="text" placeholder={'FullName'}/>
                <p className={styles.error}>{errors.fullName?.message}</p>
            </div>
            <div className={styles.promocode}>
                <p>Password</p>
                <input {...register("password")} type="text" placeholder={'Password'}/>
                <p className={styles.error}>{errors.password?.message}</p>
            </div>
            {/*<div className={styles.promocode}>
                <p>Repeat the password</p>
                <input type="text" placeholder={'Repeat the password'}/>
            </div>*/}
            <div className={styles.button}>
                <button className={styles.login}>Registration</button>
            </div>
            <img onClick={() => setOnLogin('')} src="headerIcon/closed.svg" alt="closed"/>
        </form>
    );
};


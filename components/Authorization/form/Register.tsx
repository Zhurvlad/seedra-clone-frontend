import React from 'react';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {setCookie} from 'nookies';

import {RegisterSchema} from "../../../utils/validation";
import {Api} from '../../../utils/api';
import {useAppDispatch} from '../../../redux/hooks';
import {setUserData } from '../../../redux/userSlice';
import {IRegisterForm} from "./Form.interface";

import styles from "../Authorization.module.scss";

import ClosedSVG from './closed.svg'


type RegisterProps = {
    setOnLogin: (s: string) => void
}


//TODO: Сделать нормальную ошибку при регистрации

export const Register:React.FC<RegisterProps> = ({setOnLogin}) => {
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const dispatch = useAppDispatch()


    const {register, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema)
    });


    const onSubmit = async (dto: IRegisterForm) => {
        try{
            const data = await Api().user.register(dto)
            dispatch(setUserData(data))
            setCookie(null, 'seedra', data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            setErrorMessage('')
         setOnLogin('')
        } catch (e) {
            console.log('Произошла ошибка при регистрации')
            setErrorMessage((e as Error).message)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.onLogin}>
            <h3>Вход</h3>

            <p>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
            {errorMessage &&  <p style={{color: 'red'}}>Произошла ошибка при регистрации</p>}
            <div className={styles.promoCodes}>
                <p>E-mail</p>
                <input {...register("email")} type="text" placeholder={'E-mail'}/>
                <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div className={styles.promoCodes}>
                <p>FullName</p>
                <input {...register("fullName")} type="text" placeholder={'FullName'}/>
                <p className={styles.error}>{errors.fullName?.message}</p>
            </div>
            <div className={styles.promoCodes}>
                <p>Password</p>
                <input {...register("password")} type="text" placeholder={'Password'}/>
                <p className={styles.error}>{errors.password?.message}</p>
            </div>

            <div style={{display: 'none'}} className={styles.promoCodes}>
                <p>Password</p>
                <input {...register("roles")} type="text" value={'user'} placeholder={'Password'}/>
                <p className={styles.error}>{errors.roles?.message}</p>
            </div>
            {/*<div className={styles.promoCodes}>
                <p>Repeat the password</p>
                <input type="text" placeholder={'Repeat the password'}/>
            </div>*/}
            <div className={styles.button}>
                <button className={styles.login}>Registration</button>
            </div>
            <ClosedSVG className={styles.closedSVG} onClick={() => setOnLogin('')}/>
           {/* <img onClick={() => setOnLogin('')} src="headerIcon/closed.svg" alt="closed"/>*/}
        </form>
    );
};


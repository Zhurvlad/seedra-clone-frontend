import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {setCookie} from "nookies";

import {LoginSchema} from "../../../utils/validation";
import {Api} from '../../../utils/api';
import {IRegisterForm} from "./Form.interface";

import styles from "../Authorization.module.scss";

import ClosedSVG from "./closed.svg";


type LoginProps = {
    setOnLogin: (s: string) => void
}

export const Login: React.FC<LoginProps> = ({setOnLogin}) => {
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const {register, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = async (dto: IRegisterForm) => {

        try {
            const data = await Api().user.register(dto)

            setCookie(null, 'TJAuthToken', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
        } catch (e) {
            console.log('Произошла ошибка при входе')
            setErrorMessage((e as Error).message)
        }
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className={styles.onLogin}>
            <h3>Вход</h3>
            <p>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
            {errorMessage && <p style={{color: 'red'}}>Произошла ошибка при регистрации</p>}
            <div className={styles.promoCodes}>
                <p>E-mail</p>
                <input {...register("email")} type="text" placeholder={'E-mail'}/>
                <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div className={styles.promoCodes}>
                <p>Password</p>
                <input {...register("password")} type="text" placeholder={'Password'}/>
                <p className={styles.error}>{errors.password?.message}</p>
            </div>
            <div className={styles.button}>
                <button className={styles.login}>LogIn</button>
            </div>
            {/*<img onClick={() => setOnLogin('')} src="headerIcon/closed.svg" alt="closed"/>*/}
            <ClosedSVG className={styles.closedSVG} onClick={() => setOnLogin('')}/>
        </form>
    );
};


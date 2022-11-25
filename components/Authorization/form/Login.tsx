import React from 'react';
import styles from "../Authorization.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../../utils/validation";

type LoginProps = {
    setOnLogin: (s: string) => void
}

export const Login:React.FC<LoginProps> = ({setOnLogin}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = data => console.log(data);

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
                <p>Password</p>
                <input {...register("password")} type="text" placeholder={'Password'}/>
                <p className={styles.error}>{errors.password?.message}</p>
            </div>
            <div className={styles.button}>
                <button className={styles.login}>LogIn</button>
            </div>
            <img onClick={() => setOnLogin('')} src="headerIcon/closed.svg" alt="closed"/>
        </form>
    );
};


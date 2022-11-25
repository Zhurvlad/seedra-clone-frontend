import React from 'react';
import styles from "../Authorization.module.scss";

type MainProps = {
    setOnLogin: (s: string) => void
}

export const Main:React.FC<MainProps> = ({setOnLogin}) => {
    return (
        <div className={styles.authorization}>
            <h3>Необходима авторизация</h3>
            <p>Для входа в личный кабинет необходимо войти или зарегистрироваться!</p>
            <div className={styles.button}>
                <button onClick={() => setOnLogin('login')} className={styles.login}>Войти</button>
                <button onClick={() => setOnLogin('register')}
                        className={styles.registration}>Зарегестрироваться
                </button>
            </div>
            <img onClick={() => setOnLogin('')} src="headerIcon/closed.svg" alt="closed"/>
        </div>
    );
};


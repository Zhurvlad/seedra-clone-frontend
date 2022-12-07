import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {wrapper} from "../redux/store";
import {UserApi} from '../utils/api/users';
import {Api} from '../utils/api';
import { setUserData } from '../redux/userSlice';
import {setItems} from '../redux/itemsSlice';
import {GetServerSideProps} from 'next';


function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

/*
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store =>async ({ctx, Component}) => {

  try {
//Необходимо делать async await т.к. функция ниже возвращает промис а он всегда = true
    const userData = await Api(ctx).user.getMe()
    console.log(userData)
    store.dispatch(setUserData(userData))
    const items = await Api().items.getAll()

    store.dispatch(setItems(items))
    return {
      props: {
        items,
        userData
      }
    }
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      items: null
    }
  }

})
*/



/*App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {
  try {

  /!*  const items = await Api().items.getAll()

    store.dispatch(setItems(items))
    return {
      props: {
        items
      }
    }*!/
    const userData = await Api(ctx).user.getMe()
    store.dispatch(setUserData(userData))
    console.log(userData, 9090)
    return {
      props: {
        userData
      }
    }

  } catch (e) {
    //Проверяем авторизован ли пользователь. Если нет то редиректим его
  }
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
    },
  }
})*/

export default wrapper.withRedux(App)
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {wrapper} from "../redux/store";
import {UserApi} from '../utils/api/users';


function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}




App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {
  try {
    const userData = await UserApi().getMe()
  } catch (e) {

  }
})

export default wrapper.withRedux(App)
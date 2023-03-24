import { FunctionComponent, ReactNode} from "react";
import {Header} from "../components/Header";
import styles from './Layout.module.scss'
import {Footer} from "../components/Footer";
import {AppContextProvider} from "../context/app.context";
import {IItems} from "../models/IItems";

interface LayoutProps{
    children: ReactNode
}

interface WritePageProps {
    items: IItems
}

export const Layout = ({children}: LayoutProps) :JSX.Element=> {


    return (

        <div className={styles.wrapper}>

            <div className={'container'}>
                <main className={styles.main}>

                    <Header/>
                    <div >
                        {children}
                    </div>
                </main>
                {/*<footer className={styles.footer}>
                        <Footer/>
                    </footer>*/}
            </div>

        </div>

    )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element{
        return (
          <AppContextProvider>
              <Layout>
                  <Component {...props}/>
              </Layout>
          </AppContextProvider>
        )
    }
}
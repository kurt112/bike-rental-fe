import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "../components/layout/sidebar";
import SidebarItemAdmin from "../components/layout/sidebar/sidebar-item-admin";
import SidebarItemClient from "../components/layout/sidebar/sidebar-item-client";
import Login from "../components/auth/login";
import React, {Fragment, useEffect, useState} from "react";
import {sidebar} from "../types/sidebar";
import Head from "next/head";
import {useRouter} from "next/router";


function MyApp({Component, pageProps}: AppProps) {

    const [isLogin, setLogin] = useState(false);
    const [role, setRole] = useState('');
    const [sidebarItem, setSidebarItem] = useState<Array<sidebar>>([])
    const [isLoading, setIsLoading] = useState(true);
    const [showSidebar, setShowSideBar] = useState(false);
    const Router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        const token: string | null = localStorage.getItem('token');
        const sidebarStatus: string | null = localStorage.getItem('sidebarStatus')
        let user: any | null = localStorage.getItem('user');
        if (token === null || user == null) {
            localStorage.clear();
            setIsLoading(false);
            return;
        }

        if (sidebarStatus === null) {
            localStorage.setItem('sidebarStatus', 'open');
        }

        user = JSON.parse(user);

        setLogin(true);
        setRole(user.userRole);
        setIsLoading(false);

    }, []);

    useEffect(() => {
        setIsLoading(true);
        switch (role) {
            case 'customer':
                setSidebarItem(SidebarItemClient);
                Router.push('/bike/available?search=&page=1&size=10&status=0').then(ignored => {});
                break;
            case 'admin':
                setSidebarItem(SidebarItemAdmin);
                Router.push('/bike?search=&page=1&size=10&status=0').then(ignored => {});
                break;
            default:
                break;
        }
        setIsLoading(false);

    }, [role, isLogin])

    const _handleSidebarStatus = (status: boolean) => {
        setShowSideBar(status);
    }


    return <Fragment>
        <Head>
            {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>*/}
        </Head>

        {
            showSidebar ? <div onClick={() => _handleSidebarStatus(false)}
                               className={'w-full z-40   h-screen fixed backdrop-filter backdrop-blur-sm backdrop-opacity-100'}></div>
                : null
        }
        <div className="h-screen h-full  flex items-center justify-center" style={{background: '#edf2f7'}}>
            {
                isLogin ? <Sidebar sidebarStatus={showSidebar}
                                   handleSidebarStatus={() => _handleSidebarStatus(true)}
                                   sidebars={sidebarItem}>
                        <Component {...pageProps} />
                    </Sidebar> :
                    <Login setIsLogin={setLogin}
                           setRole={setRole}
                    />
            }

            {/*<Landing/>*/}

        </div>
    </Fragment>

}

export default MyApp

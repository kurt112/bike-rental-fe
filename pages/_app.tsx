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
import Landing from "./landing/landing";
import SidebarItemEmployee from "../components/layout/sidebar/sidebar-item-employee";
// when we access the screen in landing we will get the data from local storage
// the name of the data is screen
// if the data is
// 1 -> landing
// 2 -> login

function MyApp({Component, pageProps}: AppProps) {

    const [isLogin, setLogin] = useState(true);
    const [role, setRole] = useState('');
    const [sidebarItem, setSidebarItem] = useState<Array<sidebar>>([])
    const [isLoading, setIsLoading] = useState(true);
    const [showSidebar, setShowSideBar] = useState(false);
     const [loginCLick,setLoginClick] = useState(false);

    const Router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        const token: string | null = localStorage.getItem('token');
        const sidebarStatus: string | null = localStorage.getItem('sidebarStatus')
        let user: any | null = localStorage.getItem('user');
        let screen: any | null = localStorage.getItem('screen');


        if (token === null || user == null) {
            localStorage.clear();
            setIsLoading(false);
            setLogin(false);
            if (!screen) {
                localStorage.setItem('screen','1');
            }else {
                switch (screen){
                    case '1':
                        setLoginClick(false);
                        break;
                    case '2':
                        setLoginClick(true);
                        break;
                    default:
                        setLogin(false);
                        break;
                }
            }

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
        const data = localStorage.getItem('path');

        switch (role) {
            case 'customer':
                setSidebarItem(SidebarItemClient);
                if(!data) Router.push('/bike/available?search=&page=1&size=10&status=0').then(ignored => {});
                break;
            case 'admin':
                setSidebarItem(SidebarItemAdmin);
                if(!data) Router.push('/bike?search=&page=1&size=10&status=0').then(ignored => {});
                break;
            case 'employee':
                setSidebarItem(SidebarItemEmployee)
                if(!data) Router.push('/bike?search=&page=1&size=10&status=0').then(ignored => {});
                break;
            default:
                break;
        }
        setIsLoading(false);


    }, [role, isLogin])

    const _handleSidebarStatus = (status: boolean) => {
        setShowSideBar(status);
    }

    const _handleLoginClick = (result: boolean) => {
        if(result){
            localStorage.setItem('screen','2');
        }else {
            localStorage.setItem('screen','1');
        }

        setLoginClick(result);
    }


    return <Fragment>
        <Head>
            {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>*/}
        </Head>

        {
            showSidebar ? <div onClick={() => _handleSidebarStatus(false)}
                               className={'w-full z-40   h-screen fixed backdrop-filter backdrop-blur-sm backdrop-opacity-100'}>

                </div>
                : null
        }
        <div className="h-screen h-full  flex items-center justify-center">
            {
                isLogin ? <Sidebar sidebarStatus={showSidebar}
                                   handleSidebarStatus={(status) => _handleSidebarStatus(status)}
                                   sidebars={sidebarItem}
                                   userRole={role}>
                        <Component {...pageProps} />
                    </Sidebar> :
                    loginCLick? <Login setIsLogin={setLogin}
                                       setRole={setRole}
                                       setLoginClick={_handleLoginClick}
                    />: <Landing setLogin={_handleLoginClick}></Landing>
            }

            {/*<Landing/>*/}

        </div>
    </Fragment>

}

export default MyApp

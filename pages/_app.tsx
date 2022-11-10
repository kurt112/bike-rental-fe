import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "../components/layout/sidebar";
import SidebarItemAdmin from "../components/layout/sidebar/sidebar-item-admin";
import SidebarItemClient from "../components/layout/sidebar/sidebar-item-client";
import Login from "../components/auth/login";
import {useEffect, useState} from "react";
import {sidebar} from "../types/sidebar";

function MyApp({Component, pageProps}: AppProps) {

    const [isLogin, setLogin] = useState(false);
    const [role, setRole] = useState('');
    const [sidebarItem, setSidebarItem] = useState<Array<sidebar>>([])
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        const token: string | null = localStorage.getItem('token');
        let user: any | null = localStorage.getItem('user');
        if (token == null || user == null) {
            localStorage.clear();
            setIsLoading(false);
            return;
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
                break;
            case 'admin':
                setSidebarItem(SidebarItemAdmin);
                break;
            default:
                break;
        }
        setIsLoading(false);
    }, [role, isLogin])

    return <div className="h-screen overflow-hidden flex items-center justify-center" style={{background: '#edf2f7'}}>
        {
            isLogin ? <Sidebar sidebars={sidebarItem}>
                    <Component {...pageProps} />
                </Sidebar> :
                <Login setIsLogin={setLogin}
                       setRole={setRole}
                />
        }

        {/*<Landing/>*/}

    </div>
}

export default MyApp

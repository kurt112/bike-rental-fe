import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "../components/layout/sidebar";
import SidebarItem from "../components/layout/sidebar/sidebar-item";

function MyApp({Component, pageProps}: AppProps) {

    return <div className="h-screen overflow-hidden flex items-center justify-center" style={{background: '#edf2f7'}}>
        <Sidebar sidebars={SidebarItem}>
            <Component {...pageProps} />
        </Sidebar>
    </div>
}

export default MyApp

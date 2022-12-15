import {sidebarList} from "../../../types/sidebar";
import Navbar from "../navbar/navbar";
import Image from "next/image";
import Link from "next/link";
import logo from '../sidebar/icon/bikeLogo.jpg'
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const Sidebar = ({
                     sidebars,
                     children,
                     sidebarStatus,
                     handleSidebarStatus
                 }: sidebarList) => {

    const Router = useRouter();

    const _handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will logout this account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push('/').then(ignored => {
                    localStorage.clear();
                    location.reload();
                });
            }
        })
    }

    return (
        <div className="w-full h-full ">
            <div className="flex flex-no-wrap">
                {
                    sidebarStatus ? <div style={{minHeight: 716}}
                                         className="fixed h-full z-50
                      w-64  bg-gray-800 shadow flex-col justify-between  "
                    >
                        <div className="h-full">
                            <div className=" w-full flex items-center justify-center mt-6">
                                <p className={'text-xl font-bold text-white'}> Erik Bike Shop</p>
                            </div>
                            <ul className="mt-5 px-8">
                                {
                                    sidebars.map((sidebar, i) => {
                                        return sidebar.icon ?
                                            <Link href={sidebar.link} key={i}>
                                                <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                                                    <Image
                                                        src={sidebar.icon.src}
                                                        loading="eager"
                                                        layout={'fixed'}
                                                        height={25}
                                                        width={25}
                                                        style={{filter: 'invert(0.8  )'}}
                                                        alt={sidebar.name}
                                                    />
                                                    <span className="text-sm ml-2">{sidebar.name}</span>
                                                    <div
                                                        className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">5
                                                    </div>
                                                </li>
                                            </Link>
                                            : null
                                    })
                                }
                            </ul>
                            <button onClick={_handleLogout}
                                className="w-full text-lg bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent ">
                                Logout
                            </button>
                        </div>
                        <Image src={logo} className={'w-full'} alt='logo'/>
                        <div className="px-8 border-t border-gray-700">
                            <ul className="w-full flex items-center justify-between bg-gray-800">
                                <li className="cursor-pointer text-white pt-5 pb-3">
                                    <button aria-label="show notifications"
                                            className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-bell" width="20"
                                             height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                             fill="none"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                                            <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                                        </svg>
                                    </button>
                                </li>
                                <li className="cursor-pointer text-white pt-5 pb-3">
                                    <button aria-label="open chats"
                                            className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-messages"
                                             width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5"
                                             stroke="currentColor"
                                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
                                            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
                                        </svg>
                                    </button>
                                </li>
                                <li className="cursor-pointer text-white pt-5 pb-3">
                                    <button aria-label="open settings"
                                            className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-settings"
                                             width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5"
                                             stroke="currentColor"
                                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </li>
                                <li className="cursor-pointer text-white pt-5 pb-3">
                                    <button aria-label="open logs"
                                            className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-archive"
                                             width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5"
                                             stroke="currentColor"
                                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <rect x="3" y="4" width="18" height="4" rx="2"></rect>
                                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
                                            <line x1="10" y1="12" x2="14" y2="12"></line>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div> : null
                }
                <div className="w-full h-full">
                    <Navbar handleSidebarStatus={handleSidebarStatus}/>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Sidebar

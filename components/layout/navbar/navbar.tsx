import Image from "next/image";
import {useState} from "react";
import Notification from "../../notification";

const Navbar = ({
                    handleSidebarStatus,
                    sidebarStatus
                }: any) => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');

    const [notification, setNotification ] = useState(true);

    return <div
        className="flex flex-row justify-between bg-slate-50 pt-3 pb-3 border-b-4 border-indigo-500 pr-5 pl-5 place-items-center">
        <svg className="w-7 h-7 cursor-pointer" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg" onClick={() => handleSidebarStatus(true)}>
            <path fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"></path>
        </svg>
        <h1>
            Erik Bike Shop
        </h1>
        <div className="flex justify-center align-middle place-items-center">
            {/*<Image className="w-7 h-7 rounded-full"*/}
            {/*       src="https://randomuser.me/api/portraits/women/34.jpg"*/}
            {/*       alt="Rounded avatar"*/}
            {/*       width='90'*/}
            {/*       height='100'*/}
            {/*/>*/}
            <p className=" mr-3 font-medium capitalize">
                {`${user.firstName} ${user.lastName}`}
            </p>
            <Notification/>

        </div>

    </div>
}

export default Navbar

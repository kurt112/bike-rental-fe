import {useEffect, useState} from "react";
import Image from "next/image";
import bikeIcon from '../sidebar/icon/bikeLogo.jpg'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');

    return <div className="flex flex-row justify-between bg-slate-50 pt-3 pb-3 border-b-4 border-indigo-500 pr-5 pl-5 place-items-center">
        <p>Test Path</p>
        <div className="flex justify-center align-middle place-items-center">
            <img className="w-7 h-7 rounded-full" src="https://randomuser.me/api/portraits/women/34.jpg"
                 alt="Rounded avatar"/>
            <span className="ml-3">
                {`${user.firstName} ${user.lastName}`}
            </span>
        </div>

    </div>
}

export default Navbar

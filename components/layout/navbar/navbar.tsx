import {useEffect, useState} from "react";


const Navbar = () => {



    return <div className="flex flex-row justify-between bg-slate-50 pt-3 pb-3 border-b-4 border-indigo-500 pr-5 pl-5 place-items-center">
        <p>Test Path</p>
        <p>Images</p>
        <div className="flex justify-center align-middle place-items-center">
            <img className="w-7 h-7 rounded-full" src="https://randomuser.me/api/portraits/women/34.jpg"
                 alt="Rounded avatar"/>
            <span className="ml-3">Joe Doe</span>
        </div>

    </div>
}

export default Navbar

import React, {SyntheticEvent, useState} from "react";
import {UserLogin} from "../../types/credential";
import {axiosSubmit} from "../../.config/api";
import {path} from "../../utils/api/endpoint";
import logo from '../../_images/erick.jpg';
import Image from "next/image";

const Login = ({
    setIsLogin,
    setRole,
    setLoginClick
               }: any) => {

    const [cred,setCred] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const handlerChange = (value: string, key:string) => {
        const newCred:any = {...cred};
        newCred[key] = value;
        setCred(newCred)
    }

    const _handleLogin = async (event: SyntheticEvent) =>{
        event.preventDefault();

        await axiosSubmit.post(`${path.auth}/login`, cred).then(result => {
            const {data} = result;
            const {token, user} = data;
            delete user.password;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user))
            setIsLogin(true);
            setRole(user.userRole);
        })
    }

    return (
        <section className="h-fit w-full flex justify-center item items-center">
            <div className="h-full w-full">
                <div className="bg-white min-h-screen  flex justify-center items-center bg-green-800">
                    <div className=' shadow-2xl w-3/4 flex justify-center items-center text-gray-800 bg-white' style={{height: '900px'}}>
                        <div className=" md:w-8/12 lg:w-6/12 mb-12 md:mb-0 border-r-2 border-gray-600 flex justify-center items-center">
                            <Image
                                src={logo}
                                className="h-screen"
                                alt="Phone image"
                                width="400" height="400"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 ">
                            <form>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        value={cred.username}
                                        onChange={(e) => handlerChange(e.target.value,'username')}
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        value={cred.password}
                                        onChange={(e) => handlerChange(e.target.value, 'password')}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        {/*<input*/}
                                        {/*    type="checkbox"*/}
                                        {/*    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"*/}
                                        {/*    id="exampleCheck3"*/}
                                        {/*    checked*/}
                                        {/*/>*/}
                                        {/*<label className="form-check-label inline-block text-gray-800"*/}
                                        {/*       htmlFor="exampleCheck2"*/}
                                        {/*       defaultValue={true}*/}
                                        {/*>Remember me</label*/}
                                        {/*>*/}
                                    </div>
                                    {/*<Link*/}
                                    {/*    href=''*/}
                                    {/*    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"*/}
                                    {/*>Forgot password?</Link>*/}
                                </div>

                                <button
                                    type="submit"
                                    className="mb-5 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={_handleLogin}
                                >
                                    Sign in
                                </button>
                                <button
                                    className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={() => setLoginClick(false)}
                                >
                                    Go back
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;

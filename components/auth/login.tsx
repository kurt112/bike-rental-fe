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

    const [error,setError] = useState<string>('');

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
            setError('');
            console.log(user);
        }).catch(error => {
            const {data} = error.response;
            setError(data.message);
        })
    }

    return (

        <section className="h-fit w-full flex justify-center item items-center">
            <div className="h-full w-full">
                <div className="bg-white min-h-screen  flex justify-center items-center bg-gradient-to-tl from-green-400 via-neutral-200 to-green-400">
                    <div className='shadow-2xl w-10/12 md:w-1/2 flex justify-center items-center text-gray-800 bg-white'>
                        <div className="lg:w-6/12  pb-10 pt-10 text-center">
                            <div className={'mb-10'}>
                                <Image
                                    src={logo}
                                    alt="Phone image"
                                    width="150" height="150"
                                />
                            </div>
                            <form onSubmit={_handleLogin}>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        required
                                        value={cred.username}
                                        onChange={(e) => handlerChange(e.target.value,'username')}
                                    />
                                </div>

                                <div className="text-right">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        value={cred.password}
                                        required
                                        onChange={(e) => handlerChange(e.target.value, 'password')}
                                    />
                                    {
                                        error !== '' ? <span className="text-sm text-red-600"> {error}</span>: null
                                    }
                                </div>
                                <p className="mb-3 mt-3 text-md text-gray-600 "> Don&lsquo;t have an account ?
                                    <span className='ml-2 text-blue-600 cursor-pointer'>
                                        Sign up now
                                    </span>
                                </p>
                                <button
                                    type="submit"
                                    className="mb-5 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
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

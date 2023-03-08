import {NextPage} from "next";
import React, {Fragment, SyntheticEvent, useState} from "react";
import Head from "next/head";
import Back from "../../../components/layout/back";
import {handlePatchPassword} from "../../../api/user -api";
import Swal from "sweetalert2";

interface passwordType {
    current: string,
    new: string,
    retypeNew: string
}

const Password: NextPage = () => {

    const [password, setPassword] = useState<passwordType>({
        current: '',
        new: '',
        retypeNew: ''
    })
    const [messageValidation, setMessageValidation] = useState<string>('');

    const _handleUpdatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password.new !== password.retypeNew) {
            setMessageValidation('password not match!')
            return;
        }else {
            setMessageValidation('')
        }

        await handlePatchPassword(password.new, password.current).then(result => {
            const {data}  = result;
            Swal.fire(
                'Success!',
                `${data.message}`,
                'success'
            ).then(() => {
                setPassword({
                    current: '',
                    new: '',
                    retypeNew: ''
                });
            })
        }).catch(error => {
            setMessageValidation(error.message);
        })
    }

    const _handlePasswordChange = (data: string, target: any) => {
        const currentPassword: any = {...password}
        currentPassword[target] = data;
        setPassword(currentPassword);
    }

    return <Fragment>
        <Head>
            <title>Update Password</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
            <div className="w-full bg-green shadow z-1 flex justify-between p-2">
                <Back/>
            </div>
            <br/>
            <div className="bg-grey-lightest">
                <div className="mx-auto">
                    <div className=" mx-auto bg-white rounded ">
                        <div className="text-black text-4xl pl-2">
                            Update Password
                        </div>
                        <form onSubmit={(e) => _handleUpdatePassword(e)}>
                            <div className="py-4 px-8 mb-10">
                                <div className="flex mb-4">
                                    <div className="w-1/3">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="current_password">Current Password</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="current_password"
                                            type="password"
                                            placeholder="Current Password"
                                            value={password.current}
                                            onChange={(e) => _handlePasswordChange(e.target.value, 'current')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/3 mr-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="first_name">New Password</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="new-password"
                                            type="password"
                                            placeholder="New Password"
                                            value={password.new}
                                            onChange={(e) => _handlePasswordChange(e.target.value, 'new')}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <div className="w-1/3 ml-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="retypePass">
                                            Retype New Password
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="retypePass"
                                            type="password"
                                            placeholder="Retype New Password"
                                            value={password.retypeNew}
                                            onChange={(e) => _handlePasswordChange(e.target.value, 'retypeNew')}
                                            required
                                        />
                                    </div>

                                </div>

                                {
                                    messageValidation ? <div className="flex mb-4">
                                     <span className="text-sm text-red-600">
                                         {messageValidation}
                                     </span>
                                    </div> : null
                                }

                                <div className="mb-4">
                                    <button type="submit"
                                            className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
}

export default Password
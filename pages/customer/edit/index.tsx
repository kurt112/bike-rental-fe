import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../components/layout/back";
import {getCustomerData, handleDeleteCustomer, handlePatchCustomer} from "../../../api/customer-api";
import {Fragment, SyntheticEvent, useState} from "react";
import {CustomerCreate} from "../../../types/customer";
import moment from "moment";
import {UserCreate} from "../../../types/user";
import {useRouter} from "next/router";

const EditCustomer: NextPage = ({currentCustomer}: any) => {
    const router = useRouter();

    const [user,setUser] = useState<UserCreate>({...currentCustomer.user});

    const [reTypePassword, setReTypePassword] = useState(user.password)

    const [customer, setCustomer] = useState<CustomerCreate>({...currentCustomer});

    const changeUser = (data: string, target: string) => {
        const currentUser: any = {...user}
        currentUser[target] = data;
        setUser(currentUser);
        const currentCustomer:CustomerCreate = {...customer};
        currentCustomer.user = currentUser;
        setCustomer(currentCustomer);
    }
    const [isEdit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!isEdit);
    }

    const _patchCustomer = async (e: SyntheticEvent) => {
        await handlePatchCustomer(customer).then(ignored => {
            router.reload();
        })
    }

    return <Fragment>
        <Head>
            <title>Edit Customer</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
            <div className="w-full bg-green shadow z-1 flex justify-between p-2">
                <Back/>
                <button type="button"
                        onClick={() => handleDeleteCustomer(currentCustomer.id)}
                        className="text-red-700 hover:bg-red-700 hover:text-white  border-2 border-red-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span className="sr-only">Delete</span>
                </button>

                {
                    isEdit ?
                        <button onClick={handleEdit} type="button"
                                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            View
                        </button> :
                        <button type="button"
                                onClick={handleEdit}
                                className="rounded-full text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                        </button>
                }
            </div>
            <br/>
            <div className="bg-grey-lightest">
                <div className="mx-auto">
                    <div className=" mx-auto bg-white rounded ">
                        <div className="text-black text-4xl pl-2">Edit Customer
                        </div>
                        <div className="py-4 px-8 mb-10">
                            <div className="flex mb-4">
                                <div className="w-1/3 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="first_name">First Name</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        value={user.firstName? user.firstName:''}
                                        onChange={(e) => changeUser(e.target.value, 'firstName')}
                                        disabled={!isEdit}
                                    />
                                </div>
                                <div className="w-1/3 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="first_name">Middle Name</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="middle-name"
                                        type="text"
                                        disabled={!isEdit}
                                        placeholder="Middle Name"
                                        value={user.middleName?user.middleName:''}
                                        onChange={(e) => changeUser(e.target.value, 'middleName')}
                                    />
                                </div>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">
                                        Last Name
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="last_name"
                                        type="text"
                                        disabled={!isEdit}
                                        placeholder="Last Name"
                                        value={user.lastName?user.lastName:''}
                                        onChange={(e) => changeUser(e.target.value, 'lastName')}
                                    />
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="w-1/3 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                    >Email</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        type="email"
                                        disabled={!isEdit}
                                        placeholder="Ex. Juan@email.com"
                                        value={user.email?user.email:''}
                                        onChange={(e) => changeUser(e.target.value, 'email')}
                                    />
                                </div>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Password</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        type="password"
                                        disabled={!isEdit}
                                        placeholder="Password"
                                        value={user.password?user.password:''}
                                        onChange={(e) => changeUser(e.target.value, 'password')}
                                    />
                                </div>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="password">Retype Password</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        type="password"
                                        disabled={!isEdit}
                                        placeholder="Retype Password"
                                        value={reTypePassword}
                                        onChange={(e) => setReTypePassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="w-1/3 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="gender">Gender</label>
                                    <select  id="gender"
                                             disabled={!isEdit}
                                             value={user.gender?user.gender:''}
                                             onChange={(e) => changeUser(e.target.value,'gender')}
                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Birthdate</label>
                                    <input
                                        disabled={!isEdit}
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        type="date"
                                        value={user.birthdate? moment(user.birthdate).format('YYYY-MM-DD').toString():new Date().toString()}
                                        onChange={(e) => changeUser(e.target.value, 'birthdate')}
                                    />
                                </div>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="cellphone">
                                        Cellphone
                                    </label>
                                    <input
                                        disabled={!isEdit}
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="cellphone"
                                        type="text"
                                        placeholder="Cellphone"
                                        value={user.cellphone?user.cellphone:''}
                                        onChange={(e) => changeUser(e.target.value, 'cellphone')}
                                    />
                                </div>
                            </div>

                            {
                                isEdit?<button onClick={(e) => _patchCustomer(e)} type="button" className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                    Submit
                                </button>:null
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
}

export default EditCustomer;


export const getServerSideProps = async (context: any) => {
    const {id} = context.query;

    const currentCustomer = await getCustomerData(id);

    if (!currentCustomer) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            currentCustomer,
        },
    };
};

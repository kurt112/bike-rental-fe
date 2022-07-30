import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../components/layout/back";
import {getCustomerData, handleSubmitCustomer} from "../api";
import {Fragment, useState} from "react";
import {CustomerCreate} from "../../../types/customer";
import moment from "moment";

const EditCustomer: NextPage = ({currentCustomer}: any) => {

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

    console.log(user);
    return <Fragment>
        <Head>
            <title>Edit Customer</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
            <Back/>
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
                                    />
                                </div>
                                <div className="w-1/3 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="first_name">Middle Name</label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="middle-name"
                                        type="text"
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
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        type="date"
                                        value={user.birthdate? moment(user.birthdate).format('YYYY-MM-DD').toString():new Date().toString()}
                                        onChange={(e) => changeUser(e.target.value, 'birthdate')}
                                    />
                                </div>
                                <p>{}</p>
                                <div className="w-1/3 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="cellphone">
                                        Cellphone
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                        id="cellphone"
                                        type="text"
                                        placeholder="Cellphone"
                                        value={user.cellphone?user.cellphone:''}
                                        onChange={(e) => changeUser(e.target.value, 'cellphone')}
                                    />
                                </div>
                            </div>
                            <button onClick={(e) => handleSubmitCustomer(e,customer)} type="button" className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                Submit
                            </button>
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

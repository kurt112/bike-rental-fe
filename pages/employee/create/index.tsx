import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../components/layout/back";
import {Fragment, useState} from "react";
import {UserCreate} from "../../../types/user";
import {EmployeeCreate} from "../../../types/employee";
import {handleSubmitEmployee} from "../../../api/employee-api";

const CreateEmployee: NextPage = () => {
    const [user, setUser] = useState<UserCreate>({
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "Male",
        password: "",
        birthdate: "",
        cellphone: "",
        userRole: "employee",
        isAccountNotExpired: true,
        isAccountNotLocked: true,
        isCredentialNotExpired: true,
        isEnabled: true
    });

    const [reTypePassword, setReTypePassword] = useState('')

    const [employee, setEmployee] = useState<EmployeeCreate>({
        user: user
    });


    const changeUser = (data: string, target: string) => {
        const currentUser: any = {...user}
        currentUser[target] = data;
        setUser(currentUser);
        const currentEmployee: EmployeeCreate = {...employee};
        currentEmployee.user = currentUser;
        setEmployee(currentEmployee);
    }

    return (
        <Fragment>
            <Head>
                <title>Create Employee</title>
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
                            <div className="text-black text-4xl pl-2">Create Employee
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
                                            value={user.firstName}
                                            onChange={(e) => changeUser(e.target.value, 'firstName')}
                                            required
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
                                            value={user.middleName}
                                            onChange={(e) => changeUser(e.target.value, 'middleName')}
                                            required
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
                                            value={user.lastName}
                                            onChange={(e) => changeUser(e.target.value, 'lastName')}
                                            required
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
                                            value={user.email}
                                            onChange={(e) => changeUser(e.target.value, 'email')}
                                            required
                                        />
                                    </div>
                                    <div className="w-1/3 ml-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="last_name">Password</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            type="password"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={(e) => changeUser(e.target.value, 'password')}
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <div className="w-1/3 mr-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="gender">Gender</label>
                                        <select id="gender"
                                                value={user.gender}
                                                onChange={(e) => changeUser(e.target.value, 'gender')}
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
                                            value={user.birthdate}
                                            onChange={(e) => changeUser(e.target.value, 'birthdate')}
                                            required
                                        />
                                    </div>
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
                                            value={user.cellphone}
                                            onChange={(e) => changeUser(e.target.value, 'cellphone')}
                                            required
                                        />
                                    </div>
                                </div>
                                <button onClick={(e) => handleSubmitEmployee(e, employee)}
                                        className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateEmployee;

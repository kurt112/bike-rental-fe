import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../components/layout/back";
import React, {Fragment, SyntheticEvent, useState} from "react";
import {UserCreate, userInitValidation, UserValidationMessage} from "../../../types/user";
import {EmployeeCreate} from "../../../types/employee";
import {handleSubmitEmployee} from "../../../api/employee-api";
import {useRouter} from "next/router";
import {validateRegisterCustomerApi} from "../../../api/customer-api";

const CreateEmployee: NextPage = () => {

    const router = useRouter()
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
        isEnabled: true,
        isRenting: false
    });

    const [reTypePassword, setReTypePassword] = useState('')

    const [employee, setEmployee] = useState<EmployeeCreate>({
        user: user,
        isActive: true
    });
    const [validation, setValidation] = useState<UserValidationMessage>({...userInitValidation});

    const changeUser = (data: string, target: string) => {
        const currentUser: any = {...user}
        currentUser[target] = data;
        setUser(currentUser);
        const currentEmployee: EmployeeCreate = {...employee};
        currentEmployee.user = currentUser;
        setEmployee(currentEmployee);
    }

    const submitEmployee =async (e: SyntheticEvent) => {
        const tempValidation: UserValidationMessage = {...validation}
        e.preventDefault();


        // ui validation
        if (employee.user?.password !== reTypePassword) {
            tempValidation.password.exist = true;
            tempValidation.password.message = "Password do not match";
            setValidation(tempValidation);
            return;
        }else {
            tempValidation.password.exist = false;
        }

        await handleSubmitEmployee(employee).then(ignored => {}).catch(error => {
            console.log(error);
            // validate in backend
            const backendValidation: UserValidationMessage = validateRegisterCustomerApi(tempValidation, error);
            setValidation(backendValidation);
        });

        // router.reload();
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
                            <form onSubmit={(e) => submitEmployee(e)}>
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
                                            {
                                                userInitValidation.firstName.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.firstName.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.middleName.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.lastName.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.lastName.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.lastName.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.email.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.email.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.password.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.password.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.password.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.password.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.gender.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.gender.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.birthdate.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.birthdate.message}
                                               </span> : null
                                            }
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
                                            {
                                                userInitValidation.cellphone.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.cellphone.message}
                                               </span> : null
                                            }
                                        </div>

                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/4 mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="role">Role</label>
                                            <select id="role"
                                                    value={user.userRole}
                                                    onChange={(e) => changeUser(e.target.value, 'userRole')}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="admin">Admin</option>
                                                <option value="employee">Employee</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                            className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateEmployee;

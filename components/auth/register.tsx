import React, {Fragment, SyntheticEvent, useState} from "react";
import {UserCreate, userInitValidation, UserValidationMessage} from "../../types/user";
import {CustomerCreate} from "../../types/customer";
import {handleSubmitCustomer, validateCustomer, validateRegisterCustomerApi} from "../../api/customer-api";
import Swal from "sweetalert2";
const Register = ({
                      setRegisterClick
                  }: any) => {
    const [user, setUser] = useState<UserCreate>({
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
            gender: "Male",
        password: "",
        birthdate: "",
        cellphone: "",
        userRole: "customer",
        isAccountNotExpired: true,
        isAccountNotLocked: true,
        isCredentialNotExpired: true,
        isEnabled: true,
        isRenting: false
    });

    const [validation, setValidation] = useState<UserValidationMessage>({...userInitValidation});

    const [reTypePassword, setReTypePassword] = useState('')

    const [customer, setCustomer] = useState<CustomerCreate>({
        user: user,
        toPay: 0,
        isMember: true,
        isActive: true
    });

    const changeUser = (data: string, target: string) => {
        const currentUser: any = {...user}
        currentUser[target] = data;
        setUser(currentUser);
        const currentCustomer: CustomerCreate = {...customer};
        currentCustomer.user = currentUser;
        setCustomer(currentCustomer);
    }

    const _handleSubmitCustomer = async (e: SyntheticEvent) => {
        e.preventDefault();
        let userId = -1;
        const tempValidation: UserValidationMessage = {...validation}

        validateCustomer(tempValidation, customer, setValidation, reTypePassword);

        if(validation.password.exist){return;}

        await handleSubmitCustomer(customer).then(result => {
            const {data} = result;
            userId = data.userId;
            setUser({
                email: "",
                firstName: "",
                lastName: "",
                middleName: "",
                gender: "Male",
                password: "",
                birthdate: "",
                cellphone: "",
                userRole: "customer",
                isAccountNotExpired: true,
                isAccountNotLocked: true,
                isCredentialNotExpired: true,
                isEnabled: true,
                isRenting: false
            })
            setReTypePassword('')
             Swal.fire(
                'Create Account!',
                'Create Account Success!',
                'success'
            ).then(() => {

            })
        }).catch(error => {
            // validate in backend
            const backendValidation: UserValidationMessage = validateRegisterCustomerApi(tempValidation, error);
            setValidation(backendValidation);
        });



        // location.reload();
    }

    const _handleGoBack = () => {
        setRegisterClick(false);
    }

    return (
        <Fragment>
            <section className="h-fit w-full flex justify-center item items-center">
                <div className="h-full w-full">
                    <div
                        className="bg-white min-h-screen  flex justify-center items-center bg-gradient-to-tl from-green-400 via-neutral-200 to-green-400">
                        <div
                            className='shadow-2xl w-10/12 md:w-1/2 flex justify-center items-center text-gray-800 bg-white'>
                            <div className="w-full  pb-10 pt-10 text-center">
                                <p className='font-semibold text-3xl'> Register now!</p>
                                <form onSubmit={(e) => _handleSubmitCustomer(e)}>
                                    <div className="py-4 px-8 mb-10">
                                        <div className="w-full mb-4">
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
                                        <div className="w-full mb-4">
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="middle-name"
                                                type="text"
                                                placeholder="Middle Name"
                                                value={user.middleName}
                                                onChange={(e) => changeUser(e.target.value, 'middleName')}
                                            />
                                            {
                                                userInitValidation.middleName.exist ?
                                                    <span className="text-sm text-red-600">
                                                   {validation.lastName.message}
                                               </span> : null
                                            }
                                        </div>
                                        <div className="w-full mb-4">
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

                                        <div className="w-full mr-1 mb-4">
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                type="email"
                                                placeholder="Enter Your email"
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
                                        <div className="w-full mb-4">
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
                                        <div className="w-full mb-4">
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

                                        <div className="w-full mb-4">
                                            <select id="gender"
                                                    value={user.gender}
                                                    onChange={(e) => changeUser(e.target.value, 'gender')}
                                                    className="bg-white-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                        <div className="w-full mb-4">
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
                                        <div className="w-full mb-4">
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

                                        <div className={'flex justify-between'}>
                                            <a
                                                onClick={_handleGoBack}
                                                className="pr-20 pl-20 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                                Go Back
                                            </a>
                                            <button
                                                type={'submit'}
                                                className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                Submit
                                            </button>
                                        </div>

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </Fragment>
    )
}

export default Register;

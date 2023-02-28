import {NextPage} from "next";
import React, {Fragment, SyntheticEvent, useEffect, useState} from "react";
import {UserCreate, userInitValidation, UserValidationMessage} from "../../types/user";
import Head from "next/head";
import Back from "../../components/layout/back";
import {getUserData, handlePatchUser, handleUploadValidIdUser} from "../../api/user -api";
import moment from "moment";
import Image from "next/image";
import {uploadToS3} from "../../api/aws/s3";
import Swal from "sweetalert2";

const Profile: NextPage = () => {

    const [validation, setValidation] = useState<UserValidationMessage>({...userInitValidation});
    const [images, setImages] = useState<Array<string>>();
    // this state is for uploading
    const [imageFile, setImageFile] = useState<any>()
    const [user, setUser] = useState<UserCreate>({
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "Male",
        password: "",
        birthdate: "",
        cellphone: "",
        userRole: "",
        isAccountNotExpired: true,
        isAccountNotLocked: true,
        isCredentialNotExpired: true,
        isEnabled: true,
        isRenting: false
    });


    const changeUser = (data: string, target: string) => {
        const currentUser: any = {...user}
        currentUser[target] = data;
        setUser(currentUser);
    }

    const submitUser = async (e: SyntheticEvent) => {
        e.preventDefault();


        if(images){
            await uploadToS3(imageFile[0], null).then(image => {
                handleUploadValidIdUser("" + user.id, image).then(result => {
                    console.log(result);
                })
            })
        }

        await handlePatchUser(user).then(ignored => {
            Swal.fire('Profile Updated',
                'The updated data will take effect after you re login',
                'success')
        })

    }

    useEffect(() => {
        getUserData().then(result => {
            result.birthdate = moment(result.birthdate).format('YYYY-MM-DD');
            setUser(result);
        })
    }, [])

    const uploadImage = async (e: any) => {
        const {files} = e.target;
        const currentImages: Array<string> = [];
        const tempImagesToUpload: any = [];

        Object.keys(files).forEach(i => {
            tempImagesToUpload.push(files[i]);
            currentImages.push(URL.createObjectURL(files[i]));
        });
        setImageFile(tempImagesToUpload);
        setImages(currentImages);
    }
    return (
        <Fragment>
            <Head>
                <title>Update Profile</title>
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
                                Update Profile
                            </div>
                            <form onSubmit={(e) => submitUser(e)}>
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
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="email">
                                            Upload Valid Id
                                        </label>
                                        <div className="flex justify-center items-center w-full">
                                            <input id="dropzone-file" type="file"
                                                   onChange={(e) => uploadImage(e)}
                                            />
                                        </div>
                                        <br/>
                                        <div
                                            className="max-h-96 overflow-y-auto container grid grid-cols-3 gap-2 mx-auto divide-y mb-5">
                                            <div className="w-full rounded">
                                                {
                                                    images ? <Image alt={'bike images'} src={images ? images[0] : ''}
                                                                    width="100%"
                                                                    height="100"
                                                                    layout="responsive"
                                                                    objectFit="contain"
                                                    /> : user.validIdPhoto ?
                                                        <Image alt={'bike images'}
                                                               src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${user.validIdPhoto}`}
                                                               width="100%"
                                                               height="100"
                                                               layout="responsive"
                                                               objectFit="contain"
                                                        /> :
                                                        <p className={'text-3xl bg-gray-400 text-center'}>
                                                            No Valid Id Found
                                                        </p>
                                                }

                                            </div>
                                        </div>

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
    )
}

export default Profile
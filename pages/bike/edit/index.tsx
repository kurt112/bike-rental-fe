import {NextPage} from "next";
import {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import {BikeObject} from "../../../types/bike";
import {getBikeData, handleDeleteBike, handleSubmit} from "../../../api/bike-api";
import Back from "../../../components/layout/back";
import Image from "next/image";

const EditBike: NextPage = ({bike}: any) => {

    const [newBike, setNewBike] = useState<BikeObject>({...bike});
    const [isEdit, setEdit] = useState(false);

    const [pictures, setPictures] = useState<any>();

    // this state is for uploading
    const [imageFile, setImageFile] = useState<FormData | null | undefined>()

    const handleEdit = () => {
        setEdit(!isEdit);
    }

    const changeBike = (data: string, target: string) => {
        const currentBike: any = {...bike}
        currentBike[target] = data;
        setNewBike(currentBike);
    }

    const uploadImage = async (e: any) => {
        const {files} = e.target;
        const currentImages: Array<string> = [];
        const tempImagesToUpload: any = [];

        Object.keys(files).forEach(i => {
            tempImagesToUpload.push(files[i]);
            currentImages.push(URL.createObjectURL(files[i]));
        });
        setImageFile(tempImagesToUpload);
        setPictures(currentImages);
    }

    return (
        <Fragment>
            <Head>
                <title>Edit Bike</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
                <div className="w-full bg-green shadow z-1 flex justify-between p-2">
                    <Back/>
                    <button type="button"
                            onClick={() => handleDeleteBike(bike.id)}
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
                            <div className="text-black text-4xl pl-2">Edit Bike
                            </div>
                            <div className="py-4 px-8 mb-10">
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="first_name">Brand</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="first_name"
                                            type="text"
                                            placeholder="Bike Brand"
                                            disabled={!isEdit}
                                            value={newBike.brand}
                                            onChange={(e) => changeBike(e.target.value, 'brand')}
                                        />
                                    </div>
                                    <div className="w-1/2 ml-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="last_name">
                                            Name/Model
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="last_name"
                                            type="text"
                                            placeholder="Bike Model"
                                            disabled={!isEdit}
                                            value={newBike.name}
                                            onChange={(e) => changeBike(e.target.value, 'name')}
                                        />
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <div className="w-1/3 mr-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="first_name">Quantity</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="first_name"
                                            type="number"
                                            placeholder="Enter Quantity"
                                            disabled={!isEdit}
                                            value={newBike.quantity}
                                            onChange={(e) => changeBike(e.target.value, 'quantity')}
                                        />
                                    </div>
                                    <div className="w-1/3 ml-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="last_name">Price/Hr</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="last_name"
                                            disabled={!isEdit}
                                            type="number"
                                            placeholder="Bike Price/Hr"
                                            value={newBike.price}
                                            onChange={(e) => changeBike(e.target.value, 'price')}
                                        />
                                    </div>
                                    <div className="w-1/3 ml-1">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="last_name">Size</label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                            id="last_name"
                                            type="number"
                                            disabled={!isEdit}
                                            value={newBike.size}
                                            placeholder="Size"
                                            onChange={(e) => changeBike(e.target.value, 'size')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                        Bike Description
                                    </label>
                                    <textarea id="message" rows={4}
                                              disabled={!isEdit}
                                              value={newBike.description}
                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              placeholder="Enter Bike Description"
                                              onChange={(e) => changeBike(e.target.value, 'description')}
                                    >

                                    </textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                        Bike Picture&lsquo;s
                                    </label>
                                    <div className="flex justify-center items-center w-full">
                                        <label htmlFor="dropzone-file"
                                               className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400"
                                                     fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                    className="font-semi-bold">Click to upload Bike Picture</span> or
                                                    drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                                    GIF
                                                    (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" disabled={!isEdit} type="file" className="hidden"
                                                   multiple
                                                   onChange={(e) => uploadImage(e)}/>
                                        </label>
                                    </div>
                                    <br/>

                                    <section className="overflow-hidden text-gray-700 ">
                                        <div className="container  mx-auto ">
                                            <div className="flex flex-wrap -m-1 md:-m-2">
                                                {
                                                    isEdit ? pictures?.map((picture: any, index: number) => {
                                                            return <div className="flex flex-wrap" key={index}>
                                                                <div className="w-64 p-1 md:p-2">
                                                                    <Image alt={'bike images'}
                                                                           key={index}
                                                                           src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${picture.pictureName}`}
                                                                           width="100%"
                                                                           height="100"
                                                                           layout="responsive"
                                                                           objectFit="contain"
                                                                    />
                                                                </div>
                                                            </div>
                                                        }) :
                                                        newBike.bikePictures?.map((picture: any, index: number) => {
                                                            return <div className="flex flex-wrap" key={index}>
                                                                <div className="w-64 p-1 md:p-2">
                                                                    <Image
                                                                        src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${picture.pictureName}`}
                                                                        alt="bike image"
                                                                        width="100%"
                                                                        height="100"
                                                                        layout="responsive"
                                                                        objectFit="contain"
                                                                    />

                                                                </div>
                                                            </div>
                                                        })
                                                }

                                            </div>
                                        </div>
                                    </section>

                                    <br/>
                                    {
                                        isEdit ?
                                            <button onClick={(e) => handleSubmit(e, newBike, imageFile)} type="button"
                                                    className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                Submit
                                            </button> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditBike;

export const getServerSideProps = async (context: any) => {
    const {id} = context.query;


    const bike = await getBikeData(id);


    if (!bike) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            bike,
        },
    };
}


import {NextPage} from "next";
import {Fragment} from "react";
import Head from "next/head";
import Link from "next/link";

const EditBike:NextPage = () => {
    return (
       <Fragment>
           <Head>
               <title>Create Bike</title>
               <meta name="viewport" content="initial-scale=1.0, width=device-width" />
           </Head>
           <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
               <div className="w-full bg-green shadow z-1">
                   <Link href="javascript:history.back()">
                       <button type="button"
                               className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                           <svg className=" h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                           </svg>
                           Back
                       </button>

                   </Link>
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
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="first_name"
                                              type="text"
                                              placeholder="Bike Brand"
                                              // value={bike.brand}
                                              // onChange={(e) => changeBike(e.target.value,'brand')}
                                       />
                                   </div>
                                   <div className="w-1/2 ml-1">
                                       <label className="block text-grey-darker text-sm font-bold mb-2"
                                              htmlFor="last_name">
                                           Name/Model
                                       </label>
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="last_name"
                                              type="text"
                                              placeholder="Bike Model"
                                              // value={bike.name}
                                              // onChange={(e) => changeBike(e.target.value,'name')}
                                       />
                                   </div>
                               </div>

                               <div className="flex mb-4">
                                   <div className="w-1/4 mr-1">
                                       <label className="block text-grey-darker text-sm font-bold mb-2"
                                              htmlFor="first_name">Quantity</label>
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="first_name"
                                              type="number"
                                              placeholder="Enter Quantity"
                                              // value={bike.quantity}
                                              // onChange={(e) => changeBike(e.target.value,'quantity')}
                                       />
                                   </div>
                                   <div className="w-1/4 ml-1">
                                       <label className="block text-grey-darker text-sm font-bold mb-2"
                                              htmlFor="last_name">Price/Hr</label>
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="last_name"
                                              type="number"
                                              placeholder="Bike Price/Hr"
                                              // value={bike.price}
                                              // onChange={(e) => changeBike(e.target.value,'price')}
                                       />
                                   </div>
                                   <div className="w-1/4 ml-1">
                                       <label className="block text-grey-darker text-sm font-bold mb-2"
                                              htmlFor="last_name">Size</label>
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="last_name"
                                              type="number"
                                              placeholder="Size"
                                              // value={bike.size}
                                              // onChange={(e) => changeBike(e.target.value,'size')}
                                       />
                                   </div>
                                   <div className="w-1/4 ml-1">
                                       <label className="block text-grey-darker text-sm font-bold mb-2"
                                              htmlFor="last_name">Current Store</label>
                                       <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                              id="last_name"
                                              type="text"
                                              placeholder="Current Store"
                                       />
                                   </div>
                               </div>

                               <div className="mb-4">
                                   <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                       Bike Description
                                   </label>
                                   <textarea id="message" rows={4}
                                             // value={bike.description}
                                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                             placeholder="Enter Bike Description"
                                             // onChange={(e) => changeBike(e.target.value,'description')}
                                   >

                                    </textarea>
                               </div>

                               <div className="mb-4\">
                                   <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                       Bike Picture's
                                   </label>
                                   <div className="flex justify-center items-center w-full">
                                       <label htmlFor="dropzone-file"
                                              className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                           <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                               <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                               </svg>
                                               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                   className="font-semi-bold">Click to upload Bike Picture</span> or drag and drop</p>
                                               <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF
                                                   (MAX. 800x400px)</p>
                                           </div>
                                           {/*<input id="dropzone-file" type="file" className="hidden" multiple*/}
                                           {/*       onChange={(e) => uploadImage(e)}/>*/}
                                       </label>
                                   </div>
                                   <br/>
                                   {/*<div className="max-h-96 overflow-y-auto container grid grid-cols-3 gap-2 mx-auto divide-y mb-5">*/}
                                   {/*    {*/}
                                   {/*        images ? images.map((image, i) => {*/}
                                   {/*            return (*/}
                                   {/*                <div className="w-full rounded">*/}
                                   {/*                    <img alt={'bike images'} key={i} src={image} />*/}
                                   {/*                </div>*/}
                                   {/*            )*/}
                                   {/*        }) : null*/}
                                   {/*    }*/}
                                   {/*</div>*/}
                                   {/*<button onClick={(e) => handleSubmit(e)} type="button" className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">*/}
                                   {/*    Submit*/}
                                   {/*</button>*/}
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

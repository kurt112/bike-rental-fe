import {NextPage} from "next";
import Head from "next/head";
import {Fragment} from "react";
import Link from "next/link";

const BikeProfile: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Bike Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div id="bike-profile-nav" className={"mb-5 shadow-sm"}>

                <div className="relative absolute bg-white pl-3 pt-3 pb-3 flex">
                    <Link href="bike/edit/">
                        <button type="button"
                                className="text-red-700 border border-red-700 hover:bg-red-800 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            <span className="sr-only">Delete</span>
                        </button>

                    </Link>

                    <Link href="/bike/edit">
                        <button type="button"
                                className="ml-5 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                        </button>
                    </Link>

                </div>
            </div>
            <div className={'container mx-auto px-20 bg-white pt-1 shadow-sm pb-10'}>
                <div className="flex justify-center mt-5">
                    <div className={'border-gray-500'}>
                        <p className={'text-4xl border-b-2 w-96 text-center pb-2 '}>Bike Profile</p>
                    </div>
                </div>
                <div className={'container mx-auto px-60'}>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                    <div className={'flex justify-between mt-10'}>
                        <p className={'text-2xl font-bold'}>Name:</p>
                        <p className={'text-2xl'}>hotdog</p>
                    </div>
                </div>
                <p>imaages dito sa baba</p>
            </div>

        </Fragment>
    )
}

export default BikeProfile

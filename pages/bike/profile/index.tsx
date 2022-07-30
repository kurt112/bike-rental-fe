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

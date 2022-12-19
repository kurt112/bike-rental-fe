import {NextPage} from "next";
import {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import {
    cancelRequestBikeByCustomer,
    getBikeByCustomer,
    rented,
    requested,
    setRequestAndRentedToEmpty
} from "../../api/bike-api";
import {BikeObject} from "../../types/bike";
import Image from "next/image";
import NoBikeImage from "../../components/layout/sidebar/icon/noBikeImage.png";
import Link from "next/link";
const BikeRequest: NextPage = () => {

    const [bikes,setBikes] = useState<Array<BikeObject>>();
    const [pictures] = useState([]);

    useEffect(() => {
        if(requested.length === 0 && rented.length === 0)  {
            getBikeByCustomer('').then(ignored => {
                setBikes(requested)
            })
        } else {
            setBikes(requested)
        }

    },[])

    const _handleCancel = async (bikeId: string) => {
        if(bikeId === ''){
            return alert('No Id Found');
        }
        let cancel = false;
        await cancelRequestBikeByCustomer(bikeId).then(ignored => {
            cancel = true;
        })

        if(!cancel) return;
        setRequestAndRentedToEmpty();
        await getBikeByCustomer('').then(ignored => {
            setBikes(requested)
        });
    }

    return <Fragment>
        <Head>
            <title>Bike Requested</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className={'container mx-auto h-full w-full '}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {
                    bikes?.map((bike: BikeObject, i: number) => {
                        const qty = bike.parentBike?.quantity;
                        return (
                            <div className={'w-full'} key={i}>
                                <div
                                    className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        pictures[i] === '' ?
                                            <Link href={'#'}>
                                                <Image className="rounded-t-lg"
                                                       src={NoBikeImage}
                                                       alt="No Bike Found"
                                                       width="100%"
                                                       height="100"
                                                       layout="responsive"
                                                       objectFit="contain"
                                                />

                                            </Link> :
                                            <Link href={'#'}>
                                                <Image className="rounded-t-lg"
                                                       src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.parentBike?.bikePictures[0].pictureName}`}
                                                       alt="bike image"
                                                       width="100%" height="100" layout="responsive"
                                                       objectFit="contain"

                                                />
                                            </Link>
                                    }

                                    <div className="p-5">
                                        <Link href="">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {bike.name}
                                            </h5>
                                        </Link>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bike.description}</p>
                                        <hr/>
                                        <h1 className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                                            ₱{bike.price}/hour
                                            ({qty} in stock)</h1>
                                        <button onClick={() => _handleCancel(bike.id?bike.id:'')}
                                                className="w-full inline-flex place-content-center  py-2 px-3 text-sm font-medium  text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            Cancel

                                            <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5"  fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    </Fragment>
}

export default BikeRequest;


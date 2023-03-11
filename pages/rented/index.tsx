import {NextPage} from "next";
import {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import {getBikeByCustomer, rented, requested} from "../../api/bike-api";
import {BikeObject} from "../../types/bike";
import Image from "next/image";
import NoBikeImage from "../../components/layout/sidebar/icon/noBikeImage.png";
import Link from "next/link";

const Rented: NextPage = () => {

    const [bikes, setBikes] = useState<Array<BikeObject>>();

    useEffect(() => {
        if (requested.length === 0 && rented.length === 0) {
            getBikeByCustomer('').then(ignored => {
                setBikes(rented)
            })
        } else {
            setBikes(rented)
        }
    }, [])

    return <Fragment>
        <Head>
            <title>Rent History</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

        <div className={'container mx-auto h-full w-full '}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {
                    bikes?.map((bike: BikeObject, i: number) => {
                        return (
                            <div className={'w-full overflow-hidden relative h-92 mt-2'} key={i}>
                                <div
                                    className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        bike.parentBike?.bikePictures.length === 0 ?
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
                                                       width="100%"
                                                       height="100"
                                                       layout="responsive"
                                                />
                                            </Link>
                                    }
                                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                                        <h3 className="text-2xl text-white font-bold">
                                            {bike.name}<br/>{` (₱${bike.price}/hour)`}
                                        </h3>

                                        <p className="mt-2 text-md text-gray-300">
                                            {bike.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                bikes === undefined || bikes.length <= 0 ?<div className='w-full text-center mt-20'>
                    <p className={'text-5xl text-gray-500'}>
                        No Bike Found
                    </p>
                </div>:null
            }
        </div>

    </Fragment>
}

export default Rented;


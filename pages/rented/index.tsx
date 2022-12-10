import {NextPage} from "next";
import {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import {getBikeByCustomer, loadImages, rented, requested} from "../bike/api";
import {BikeObject} from "../../types/bike";
import Image from "next/image";
import NoBikeImage from "../../components/layout/sidebar/icon/noBikeImage.png";

const Rented: NextPage = () => {

    const [bikes, setBikes] = useState<Array<BikeObject>>();
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        if (requested.length === 0 && rented.length === 0) {
            getBikeByCustomer('').then(ignored => {
                setBikes(rented)
                loadImages(rented, setPictures).then(ignored => {
                })
            })
        } else {
            setBikes(rented)
            loadImages(rented, setPictures).then(ignored => {})
        }
    }, [])

    return <Fragment>
        <Head>
            <title>Bike Rented</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

        <div className={'container mx-auto h-full w-full '}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {
                    bikes?.map((bike: BikeObject, i: number) => {
                        return (
                            <div className={'w-full'} key={i}>
                                <div
                                    className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        pictures[i] === '' ?
                                            <a href={'#'}>
                                                <Image className="rounded-t-lg"
                                                       src={NoBikeImage}
                                                       alt="No Bike Found"
                                                       width="100%"
                                                       height="100"
                                                       layout="responsive"
                                                       objectFit="contain"
                                                />

                                            </a> :
                                            <a href={'#'}>
                                                <Image className="rounded-t-lg"
                                                       src={`data:image/png;base64,${pictures[i]}`}
                                                       alt="bike image"
                                                       width="100%" height="100" layout="responsive"
                                                       objectFit="contain"

                                                />
                                            </a>
                                    }

                                    <div className="p-2">
                                        <a href="">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {bike.name}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bike.description}</p>
                                        <hr/>


                                        <div className="text-xl font-normal text-gray-700 dark:text-gray-400">
                                            <b>Start:</b> {`${bike.price}₱`}
                                            <br/>
                                            <b>End:</b> {`${bike.price}₱`}

                                        </div>
                                        <hr/>
                                        <h1 className="text-center  text-xl font-normal text-gray-700 dark:text-gray-400">
                                           {`${bike.price}₱/hr`}
                                        </h1>

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

export default Rented;


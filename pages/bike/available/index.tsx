import {NextPage} from "next";
import {bikeSettings, getBikeAvailable, loadImages, requestBikeByCustomer} from "../../../api/bike-api";
import {useEffect, useState} from "react";
import {BikeObject} from "../../../types/bike";
import Image from "next/image";
import NoBikeImage from '../../../components/layout/sidebar/icon/noBikeImage.png'
import Link from "next/link";

const Available: NextPage = ({
                                 bikes,
                             }: any) => {

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        loadImages(bikes, setPictures).then(ignored => {
        })
        // eslint-disable-next-line
    }, [])

    console.log(bikes);


    return (
        <div className={'container mx-auto h-full w-full '}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {
                    bikes.map((bike: BikeObject, i: number) => {
                        return (
                            <div className={'w-full overflow-hidden'} key={i}>
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
                                                       src={`data:image/png;base64,${pictures[i]}`}
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
                                            {`${bike.price}$/hour (${bike.quantity} in stock)`}
                                        </h1>
                                        <Link href={`/bike/available/request?id=${bike.id}`}>
                                            <button
                                                className="w-full inline-flex place-content-center  py-2 px-3 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Request
                                                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

    export default Available

    export const getServerSideProps = async (context: any) => {

        const {search, page, size} = context.query;

        const data = await Promise.all(
            [
                await getBikeAvailable(search, page, size),
                await bikeSettings()
            ]
        )


        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                bikes: data[0],
                settings: data[1]
            },
        };
    };

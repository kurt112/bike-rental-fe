import {NextPage} from "next";
import {bikeSettings, getBikeAvailable} from "../../../api/bike-api";
import {BikeObject} from "../../../types/bike";
import Image from "next/image";
import NoBikeImage from '../../../components/layout/sidebar/icon/noBikeImage.png'
import Link from "next/link";
import Head from "next/head";
import {Fragment} from "react";

const Available: NextPage = ({
                                 bikes,
                             }: any) => {
    return (
        <Fragment>
            <Head>
                <title>Bike Available</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'container mx-auto h-full w-full '}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {
                        bikes.map((bike: BikeObject, i: number) => {
                            return (
                                <div className={'w-full overflow-hidden relative h-92 mt-2'} key={i}>
                                    <div
                                        className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        {
                                            bike.bikePictures.length <=0 ?
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
                                                           src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.bikePictures[0].pictureName}`}
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
                                        <div className="absolute bottom-0 left-0 right-0">
                                            <Link href={`/bike/available/request?id=${bike.id}`}>
                                                <button
                                                    className="opacity-200 z-50 w-full inline-flex place-content-center  py-2 px-3 text-sm font-medium  text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                    Rent Now
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
        </Fragment>
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

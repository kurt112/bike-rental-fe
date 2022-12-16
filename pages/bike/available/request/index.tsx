import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../../components/layout/back";
import {Fragment, useEffect, useState} from "react";
import moment from "moment";
import {getBikeData, requestBikeByCustomer} from "../../../../api/bike-api";
import Image from "next/image";
import {BikeObject} from "../../../../types/bike";
import {axiosCreate} from "../../../../.config/api";

const BikeRequest: NextPage = ({bike}: any) => {

    console.log(bike);

    const [newBike, setNewBike] = useState<BikeObject>({...bike});
    const [today, setToday] = useState<any>();
    const [pictures, setPictures] = useState<any>(null);

    useEffect(() => {
        const tempToday = moment().format('yyyy-MM-DDThh:mm');

        setToday(tempToday)
        images().then(e => {
            setPictures(e);
        })
    }, []);

    const images = async () => {
        const currentPictures: any = [];

        await Promise.all(
            bike.bikePictures.map(async (blob: any) => {
                const params = new URLSearchParams();
                params.append("id", blob.id);

                const {picture} = await axiosCreate.get("bike/photo", {params}).then(result => {
                    return result.data;
                });

                currentPictures.push(picture);
            })
        )

        return currentPictures;
    }

    const changeBike = (data: string, target: string) => {
        const currentBike: any = {...newBike}
        currentBike[target] = data;
        setNewBike(currentBike);
        console.log(currentBike);
    }

    return (
        <Fragment>
            <Head>
                <title>Request Bike</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
                <div className="w-full bg-green shadow z-1 flex justify-between p-2">
                    <Back/>
                </div>
                <br/>
                <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
                    <div className="text-black text-4xl pl-2">
                        Bike Data To Request
                    </div>
                    <div className="bg-grey-lightest">
                        <div className="mx-auto">
                            <div className=" mx-auto bg-white rounded ">

                                <div className="py-4 px-8 mb-10">
                                    <div className="flex mb-4">
                                        <div className="w-1/3 mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="bike_brand">Brand</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="bike_brand"
                                                type="text"
                                                placeholder="Bike Brand"
                                                disabled={true}
                                                value={newBike.brand}
                                            />
                                        </div>
                                        <div className="w-1/3 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="bike_model">
                                                Name/Model
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="bike_model"
                                                type="text"
                                                placeholder="Bike Model"
                                                value={newBike.name}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="w-1/3 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="bike_code">
                                                Name/Model
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="bike_code"
                                                type="text"
                                                placeholder="Bike Code"
                                                value={newBike.code}
                                                disabled={true}
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
                                                value={newBike.quantity}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="w-1/3 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="last_name">Price/Hr</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="last_name"
                                                type="number"
                                                placeholder="Bike Price/Hr"
                                                value={newBike.price}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="w-1/3 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="last_name">Size</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="last_name"
                                                type="number"
                                                value={newBike.size}
                                                placeholder="Size"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="email">
                                            Bike Description
                                        </label>
                                        <textarea id="message" rows={4}
                                                  value={newBike.description}
                                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                  placeholder="Enter Bike Description"
                                                  disabled={true}
                                        >

                                    </textarea>
                                    </div>
                                    <div className="mb-4 mx-auto">
                                        <section className="overflow-hidden text-gray-700 ">
                                            <div className="container  mx-auto ">
                                                <div className="flex flex-wrap -m-1 md:-m-2 justify-center">
                                                    {
                                                        pictures?.map((e: any) => {
                                                            return <div className="flex flex-wrap" key={e.id}>
                                                                <div className="w-64 p-1 md:p-2 ">
                                                                    <Image
                                                                        src={`data:image/png;base64,${e.blob}`}
                                                                        alt="bike image"
                                                                        width="100%" height="100" layout="responsive"
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
                                    </div>
                                    <hr/>
                                    <br/>
                                    <div className="bg-grey-lightest">
                                        <div className="mx-auto">
                                            <div className="text-black text-4xl pl-2">
                                                Request Bike Date
                                            </div>
                                            <div className=" mx-auto bg-white rounded ">

                                                <div className="px-8 mb-10">
                                                    <div className="flex mb-4">
                                                        <div className="w-1/2 mr-1">
                                                            <label
                                                                className="block text-grey-darker text-sm font-bold mb-2"
                                                                htmlFor="start_barrow">Start Barrow</label>
                                                            <input
                                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                                id="start_barrow"
                                                                type="datetime-local"
                                                                placeholder="Start Barrow"
                                                                min={today}
                                                                required={true}
                                                                value={bike.startBarrow}
                                                                onChange={(e) => changeBike(e.target.value, 'startBarrow')}
                                                            />
                                                        </div>
                                                        <div className="w-1/2 ml-1">
                                                            <label
                                                                className="block text-grey-darker text-sm font-bold mb-2"
                                                                htmlFor="last_name">
                                                                End Barrow
                                                            </label>
                                                            <input
                                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                                id="end_barrow"
                                                                type="datetime-local"
                                                                placeholder="End Model"
                                                                min={today}
                                                                required={true}
                                                                value={bike.endBarrow}
                                                                onChange={(e) => changeBike(e.target.value, 'endBarrow')}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" px-8 mb-10">
                                                    <button
                                                        onClick={() => requestBikeByCustomer(newBike)}
                                                        type="button"
                                                        className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                        Request Bike
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default BikeRequest
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

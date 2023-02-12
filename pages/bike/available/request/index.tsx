import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../../components/layout/back";
import {Fragment, useEffect, useState} from "react";
import moment from "moment";
import {getBikeData, requestBikeByCustomer} from "../../../../api/bike-api";
import Image from "next/image";
import {BikeObject} from "../../../../types/bike";
import Swal from "sweetalert2";

const BikeRequest: NextPage = ({bike}: any) => {

    const [newBike, setNewBike] = useState<BikeObject>({...bike});
    const [startBarrow, setStartBarrow] = useState<any>()
    const [endBarrow, setEndBarrow] = useState<any>()
    const [today, setToday] = useState<any>();
    const [agreeToTermAndCondition, setAgreeToTermAndCondition] = useState<boolean>(false);
    const [estimate,setEstimate] = useState<number>(0);

    useEffect(() => {
        const tempToday = moment().format('yyyy-MM-DDThh:mm');

        setToday(tempToday)
    }, []);

    const changeBike = (data: string, target: string) => {
        const currentBike: any = {...newBike}
        currentBike[target] = data;
        setNewBike(currentBike);
    }

    const _handleChangeStartBarrow = (data: string) => {
        changeBike(data, 'startBarrow');
        setStartBarrow(moment(data).format('yyyy-MM-DDThh:mm'));
        // setStartBarrow
    }

    const _handleEndBarrow = (data: string) => {
        changeBike(data, 'endBarrow')
        setEndBarrow(moment(data).format('yyyy-MM-DDThh:mm'));

        if(startBarrow > endBarrow) {
            return alert("Please end date should greater than to start date")
        }
    }

    useEffect(() => {
        const tempEndBarrow = moment(endBarrow);
        const tempStartBarrow = moment(startBarrow);

        const minutesDiff = tempEndBarrow.diff(tempStartBarrow, 'minutes');
        let totalHour = Math.floor(minutesDiff / 60);
        const excessMinutes = minutesDiff % 60 <= 0 ? 0: 1;

        totalHour += excessMinutes;

        setEstimate(totalHour * newBike.price)
    }, [startBarrow,endBarrow])

    const viewTermAndCondition = () => {
        Swal.fire({
            title: 'Term&lsquo;s and conditions',
            text: "Wherever used herein, the term “equipment” shall include any equipment rented from Erik’s Bike Shop. " +
                " Erik’s Bike Shop, and its employees shall not be responsible for personal injuries or property damage, " +
                "loss or delay incurred by any person arising out of negligence of any direct or supplemental carrier or other person rendering any of the services or " +
                "products being offered in these rentals; nor shall Erik’s Bike Shop be responsible for any injuries, death, damage, " +
                "loss or delay in any means of transportation or by reasons of any event beyond the actual control of Erik’s Bike Shop. ",

            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Don&lsquo;t Agree`,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I agree',
            width: '80%'
        }).then((result) => {
            if (result.isConfirmed) {
                setAgreeToTermAndCondition(true);
            }else if (result.isDenied) {
                setAgreeToTermAndCondition(false);
            }
        })
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
                <div
                    className="flex flex-col items-center justify-center h-full font-sans antialiased  w-full overflow-y-auto">
                    <div className=" w-10/12">
                        <div className="mx-auto">
                            <div className=" mx-auto bg-white rounded ">
                                <div className="flex flex-row justify-center items-center w-full bg-white border border-gray-200 rounded-lg shadow md:flex-row
                                dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-center ">
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            Name and brand:
                                            <span
                                                className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white"> {`${newBike.name}`} ({newBike.brand})</span>
                                        </h5>
                                        <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
                                            {newBike.description}
                                        </p>
                                        <div className='flex flex-row justify-center border-2    border-green-400'>
                                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                Price:
                                                <span
                                                    className={'mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white'}> {newBike.price}/hr </span>
                                            </h5>

                                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ml-3">
                                                Size:
                                                <span
                                                    className={'mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white'}> {newBike.size}</span>
                                            </h5>

                                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ml-3">
                                                Code:
                                                <span
                                                    className={'mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white'}> {newBike.code}</span>
                                            </h5>
                                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ml-3">
                                                Stock:
                                                <span
                                                    className={'mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white'}> {newBike.quantity}</span>
                                            </h5>
                                        </div>



                                        <section className="overflow-hidden text-gray-700 ">
                                            <div className="container  mx-auto ">
                                                <div className="flex flex-wrap -m-1 md:-m-2 justify-center">
                                                    {

                                                        newBike.bikePictures?.map((picture: any) => {
                                                            return <div className="flex flex-wrap" key={picture.id}>
                                                                <div className="w-64 p-1 md:p-2 ">
                                                                    <Image
                                                                        src={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${picture.pictureName}`}
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

                                        <div className="mx-auto">
                                            <div className="text-black text-4xl pl-2 mb-3 mt-5">
                                                Request bike date and time
                                            </div>
                                            <hr/>
                                            <br/>
                                            <div className=" mx-auto bg-white rounded ">
                                                <div className="px-8 mb-10">
                                                    <div className="flex mb-4 flex-wrap">
                                                        <div className="w-full mr-1">
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
                                                                onChange={(e) => _handleChangeStartBarrow(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="w-full ml-1">
                                                            <label
                                                                className="block text-grey-darker text-sm font-bold mb-2"
                                                                htmlFor="end_barrow">
                                                                End Barrow
                                                            </label>
                                                            <input
                                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                                id="end_barrow"
                                                                type="datetime-local"
                                                                placeholder="End Model"
                                                                min={startBarrow === undefined? today: startBarrow}
                                                                required={true}
                                                                value={bike.endBarrow}
                                                                onChange={(e) => _handleEndBarrow(e.target.value)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="flex justify-center items-center mx-auto">

                                                        <input checked={agreeToTermAndCondition} id="checked-checkbox" type="checkbox" readOnly
                                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                                               rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
                                                               focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="checked-checkbox"
                                                               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            I Agree to these
                                                            <span className='ml-1 font-semibold text-blue-600 underline cursor-pointer' onClick={viewTermAndCondition}>
                                                            terms and conditions
                                                        </span>
                                                        </label>
                                                    </div>
                                                    <p className='mt-10 font-semibold'>Total Bill Estimate:
                                                        <span className='font-normal ml-2'>₱{estimate}</span>
                                                    </p>
                                                </div>

                                                <div className="px-8 mb-10">
                                                    <button
                                                        disabled={!agreeToTermAndCondition}
                                                        onClick={() => requestBikeByCustomer(newBike)}
                                                        type="button"
                                                        className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                        Request Bike
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 px-8 mb-10">
                                    <div className="bg-grey-lightest">
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

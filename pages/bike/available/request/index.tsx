import {NextPage} from "next";
import Head from "next/head";
import Back from "../../../../components/layout/back";
import React, {Fragment, useEffect, useState} from "react";
import moment from "moment";
import {getBikeData, requestBikeByCustomer} from "../../../../api/bike-api";
import Image from "next/image";
import {BikeObject} from "../../../../types/bike";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {uploadToS3} from "../../../../api/aws/s3";
import {handleUploadReceiptCustomer} from "../../../../api/customer-api";

const BikeRequest: NextPage = ({bike}: any) => {
    const router = useRouter();
    const [newBike, setNewBike] = useState<BikeObject>({...bike});
    const [startBarrow, setStartBarrow] = useState<any>()
    const [endBarrow, setEndBarrow] = useState<any>()
    const [today, setToday] = useState<any>();
    const [agreeToTermAndCondition, setAgreeToTermAndCondition] = useState<boolean>(false);
    const [estimate, setEstimate] = useState<number>(0);
    const [receipt,setReceipt] =  useState<any>('');

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
        _handleEndBarrow(data);
    }

    const _handleEndBarrow = (data: string) => {
        changeBike(data, 'endBarrow')
        setEndBarrow(moment(data).format('yyyy-MM-DDThh:mm'));
    }

    useEffect(() => {
        const tempEndBarrow = moment(endBarrow);
        const tempStartBarrow = moment(startBarrow);

        const minutesDiff = tempEndBarrow.diff(tempStartBarrow, 'minutes');
        console.log(minutesDiff);
        let totalHour = Math.floor(minutesDiff / 60);
        const excessMinutes = minutesDiff % 60 <= 0 ? 0 : 1;

        totalHour += excessMinutes;

        setEstimate(totalHour * newBike.price)
    }, [startBarrow, endBarrow])

    const viewTermAndCondition = () => {
        Swal.fire({
            title: 'Term&lsquo;s and conditions',
            html:
                'Wherever used herein, the term “equipment” shall include any equipment rented from Erik’s Bike Shop. ' +
                'Erik’s Bike Shop, and its employees shall not be responsible for personal injuries or property damage, ' +
                'loss or delay incurred by any person arising out of negligence of any direct or supplemental carrier or other person rendering any of the services or' +
                'products being offered in these rentals; nor shall Erik’s Bike Shop be responsible for any injuries, death, damage,' +
                'loss or delay in any means of transportation or by reasons of any event beyond the actual control of Erik’s Bike Shop.<br><br/><hr/><br>' +
                '<ol style="text-align: left; font-weight: normal;">' +
                '<li><b>1. <b/>Renters follow any suggested route at their own risk and agree not to hold Erik’s Bike Shop responsible for injury or death resulting from accidents.</li>' +
                '<li><b>2. <b/>We strongly recommend the use of approved helmets whenever mounted on a bicycle.</li>' +
                '<li><b>3. <b/>The bicycles provided for use are in satisfactory operating condition and participants agree to use them at their own risk or call fault to the attention of a company representative. </li>' +
                '<li><b>4. <b/>Individual bike specifications are subject to change based on availability of replacement components.</li>' +
                '<li><b>5. <b/>Instruction in the use, assembly and maintenance of bicycles will not be provided and participants affirm that they are competent and familiar with the use of a multi-speed bicycle.</li>' +
                '</ol>' +
                '<br><br/><hr/><br>' +
                '<h1>MAINTENANCE, TUNING AND RESPONSIBILITY</h1><br/>' +
                'While all our bikes are professionally serviced before dispatch, bicycles may need tuning or maintenance during the rental period; such maintenance will be carried out at the renter\'s expense.  Erik’s Bike Shop will cover the cost of damages due to equipment failures beyond the renters control, i.e., damage occurred during transport or worn parts.  <br/><br/>' +
                '<ol style="text-align: left; font-weight: normal;">' +
                '<l1 ><b>1. </b>Any faults must be communicated to Erik’s Bike Shop within 24 hours of receipt of the equipment. </l1><br/>' +
                '<l1><b>2. </b>To be eligible for a refund on such parts and service, you must provide Erik’s Bike Shop with a photo of the damaged or worn parts and an invoice for new parts or services. </l1><br/>' +
                '<l1><b>3. </b>Erik’s Bike Shop is responsible for structural faults such as damaged frames, worn bottom brackets, suspension, and wheel hubs. </l1><br/>' +
                '<l1><b>4. </b>Erik’s Bike Shop is not responsible for the following occurrences during bike rental:  gear tune ups / punctures / broken spokes / broken chains / broken derailleurs / broken drop - outs / wheel rim damage / torn saddles / stripped threads on pedal crank / damage beyond the control of Erik’s Bike Shop and resultant of rider use or misuse.</l1><br/>' +
                '<l1><b>5. </b>If you are undertaking an unassisted bicycle tour, we strongly recommend that you have some basic bicycle maintenance knowledge.  A list of the closest bike shops can be provided on request.</l1><br/>' +
                '</ol>' +
                '<h1>RESPONSIBILITY FOR DAMAGE OR LOSS</h1><br/>' +
                'Customer agrees he/she will return the bike and equipment in the same good condition as when received, ordinary wear and tear accepted, and to repair and replace lost or stolen, damaged or broken bicycles or parts or to reimburse Erik’s Bike Shop for said equipment. Therefore, regardless of the party at fault, customer understands and agrees to be responsible for the theft or damage to said equipment.',
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Don&lsquo;t Agree`,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I agree',
            width: '80%',
        }).then((result) => {
            if (result.isConfirmed) {
                setAgreeToTermAndCondition(true);
            } else if (result.isDenied) {
                setAgreeToTermAndCondition(false);
            }
        })
    }

    const _handleUploadReceipt = (e:any) => {
        const {files} = e.target;
        setReceipt(files[0]);
    }

    const _handleRequestBikeByCustomer = async (newBike:any) => {

        let success = false;

        await requestBikeByCustomer(newBike).then(ignored => {
            success = true
       }).catch(error => {
            Swal.fire(
                'Error Requesting Bike!',
                'Please cancel other request',
                'error'
            ).then(() => {

            })
        })

        if(success && receipt !== ''){
            await uploadToS3(receipt,null).then(name => {
                handleUploadReceiptCustomer(name).then(ignored => {
                    router.back();
                })
            })
        }else if (success) {
            router.back();
        }
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
                                                                defaultValue={startBarrow}
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
                                                                placeholder="End Barrow"
                                                                min={startBarrow === undefined ? today : startBarrow}
                                                                required={true}
                                                                defaultValue={endBarrow}
                                                                onChange={(e) => _handleEndBarrow(e.target.value)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="flex justify-center items-center mx-auto">

                                                        <input checked={agreeToTermAndCondition} id="checked-checkbox"
                                                               type="checkbox" readOnly
                                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                                               rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
                                                               focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="checked-checkbox"
                                                               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            I Agree to these
                                                            <span
                                                                className='ml-1 font-semibold text-blue-600 underline cursor-pointer'
                                                                onClick={viewTermAndCondition}>
                                                            terms and conditions
                                                        </span>
                                                        </label>
                                                    </div>
                                                    <p className='mt-10 font-semibold'>Total Bill Estimate:
                                                        <span className='font-normal ml-2'>₱{estimate}</span>
                                                    </p>
                                                    <input id="dropzone-file" type="file"
                                                           onChange={(e) => _handleUploadReceipt(e)}
                                                           className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                                    />

                                                </div>

                                                <div className="px-8 mb-10">
                                                    <button
                                                        disabled={!agreeToTermAndCondition}
                                                        onClick={() => _handleRequestBikeByCustomer(newBike)}
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

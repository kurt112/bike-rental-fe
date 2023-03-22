import { Fragment, useEffect, useState } from "react";
import { getCustomerBill } from "../../../api/customer-api";
import gcash from "../../../_images/billing/gcash.png";
import paymaya from "../../../_images/billing/payMaya.png";
import bdo from "../../../_images/billing/bdo.png";
import bpi from "../../../_images/billing/bpi.svg";
import securityBank from "../../../_images/billing/securityBank.jpg";
import Image from "next/image";
import { getStoreData } from "../../../api/store-api";
import { Store } from "../../../types/store";
import Head from "next/head";

const CustomerBill = () => {
    const [bill, setBill] = useState<number>(0);

    const [sbNumber, setSecurityBank] = useState<any>('');
    const [gcashNumber, setGcashNumber] = useState<any>('');
    const [paymayaNumber, setPaymayaNumber] = useState<any>('');
    const [bpiNumber, setBpiNumber] = useState<any>('');
    const [bdoNumber, setBdoNumber] = useState<any>('');

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        setSecurityBank(localStorage.getItem('securityBank'))
        setGcashNumber(localStorage.getItem('gcash'));
        setPaymayaNumber(localStorage.getItem('paymaya'));
        setBpiNumber(localStorage.getItem('bpi'));
        setBdoNumber(localStorage.getItem('bdo'));
        if (localUser === undefined || localUser === null) return;
        const user = JSON.parse(localUser);
        getCustomerBill(user.id).then(data => {
            if (!data) setBill(0)
            setBill(data);
        })
        getStoreData(1).then((store: Store) => {
            if (store.securityBank !== null) localStorage.setItem('securityBank', store.securityBank);
            if (store.bpi !== null) localStorage.setItem('bpi', store.bpi);
            if (store.bdo !== null) localStorage.setItem('bdo', store.bdo);
            if (store.paymaya !== null) localStorage.setItem('paymaya', store.paymaya);
            if (store.gcash !== null) localStorage.setItem('gcash', store.gcash);
        });
    }, []);
    return (
        <Fragment>
            <Head>
                <title>Customer Bill</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='flex justify-evenly  mt-10 flex-wrap'>
                {
                    gcashNumber ? <div
                        className="p-3 pl-10 pr-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                        <Image className="rounded-t-lg"
                            src={gcash}
                            alt="g cash"
                            width={150}
                            height={100} />
                        <h5 className="mb-2 text-xl font-semibold font-bold tracking-tight text-gray-900 dark:text-white">
                            {localStorage.getItem('gcash')}
                        </h5>
                    </div> : null
                }

                {
                    paymayaNumber ? <div
                        className="p-3 pl-10 pr-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                        <Image className="rounded-t-lg"
                            src={paymaya}
                            alt="paymaya"
                            width={150}
                            height={100} />
                        <h5 className="mb-2 text-xl font-semibold font-bold tracking-tight text-gray-900 dark:text-white">
                            {localStorage.getItem('paymaya')}
                        </h5>
                    </div> : null
                }
                {
                    bdoNumber ? <div
                        className="p-3 pl-10 pr-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                        <Image className="rounded-t-lg"
                            src={bdo}
                            alt="bdo"
                            width={150}
                            height={100} />
                        <h5 className="mb-2 text-xl font-semibold font-bold tracking-tight text-gray-900 dark:text-white">
                            {localStorage.getItem('bdo')}
                        </h5>
                    </div> : null
                }
                {
                    bpiNumber ? <div
                        className="p-3 pl-10 pr-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                        <Image className="rounded-t-lg"
                            src={bpi}
                            alt="bdo"
                            width={150}
                            height={100} />
                        <h5 className="mb-2 text-xl font-semibold font-bold tracking-tight text-gray-900 dark:text-white">
                            {localStorage.getItem('bpi')}
                        </h5>
                    </div> : null
                }
                {
                    sbNumber ? <div
                        className="p-3 pl-10 pr-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
                        <Image className="rounded-t-lg"
                            src={securityBank}
                            alt="securityBank"
                            width={150}
                            height={100} />
                        <h5 className="mb-2 text-xl font-semibold font-bold tracking-tight text-gray-900 dark:text-white">
                            {sbNumber}
                        </h5>
                    </div> : null
                }

            </div>
            <div className='flex justify-center content-center items-center' style={{ height: '70vh' }}>
                <h1 className='text-6xl subpixel-antialiased font-mono text-center'>
                    Current Bill <br />
                    ₱<span className={'ml-3'}>{bill}</span>
                </h1>
            </div>
        </Fragment>
    )
}

export default CustomerBill;

import {NextPage} from "next";
import Head from "next/head";
import React, {Fragment} from "react";
import {graphQl} from "../../.config/api";
import {useRouter} from "next/router";
import Link from "next/link";
import {receiptColumn} from "../../types/receipt";
import {getFromNowDate} from "../../utils/date";
import {customerReceiptSettings} from "../../api/customer-api";

const Receipt: NextPage = ({
                               customerReceipts,
                               settings
                           }: any) => {

    const router = useRouter()
    const {search, page, size, status}: any = router.query

    return (
        <Fragment>
            <Head>
                <title>Receipts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mr-2 ml-2 mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            receiptColumn ? receiptColumn.map((column, key) => {
                                return (
                                    <th scope="col" className="py-3 px-6" key={key}>
                                        {column}
                                    </th>
                                )
                            }) : null
                        }

                    </tr>
                    </thead>
                    <tbody>
                    {
                        customerReceipts?.map((receipt: any) => {
                            const {customer, bike} = receipt;
                            const {user} = customer
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={receipt.id}>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.firstName}
                                    </th>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.lastName}
                                    </th>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {bike === null ? 'Not Found' : bike.code}
                                    </th>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {bike === null ? 'Not Found' : bike.name}
                                    </th>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                                        {getFromNowDate(receipt.createdAt)}
                                    </th>

                                    <td className="py-4 px-6">
                                        <a target="_blank" rel="noopener noreferrer"
                                           href={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${receipt.picture}`}>
                                           <span
                                               className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                               View Receipt
                                           </span>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <nav className="flex justify-between items-center pt-4 pb-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-5">Showing <span
                                className="font-semibold text-gray-900 dark:text-white">{page}</span> of <span
                                className="font-semibold text-gray-900 dark:text-white">{settings.totalPages}</span>
                            </span>
                    <ul className="inline-flex items-center -space-x-px mr-5">
                        {
                            page > 1 ? <li className='cursor-pointer'>
                                <Link
                                    href={`/receipt?search=${search}&page=${parseInt(page) - 1}&size=${size}&status=${status}`}>
                                    <div
                                        className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </Link>
                            </li> : null
                        }

                        {
                            Array.from(Array(settings.totalPages).keys()).map((page) => {
                                return (
                                    <li key={page} className={'cursor-pointer'}>
                                        <Link
                                            href={`/receipt?search=${search}&page=${page + 1}&size=${size}&status=${status}`}>
                                            <div
                                                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                {page + 1}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        {
                            page >= settings.totalPages ? null :
                                <Link
                                    href={`/receipt?search=${search}&page=${parseInt(page) + 1}&size=${size}&status=${status}`}>
                                    <li className='cursor-pointer'>
                                        <div
                                            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Next</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </li>
                                </Link>

                        }

                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default Receipt

export const getServerSideProps = async (context: any) => {
    const {search, page, size, status} = context.query;
    const query = () => {
        return {
            query: `query{
                        getCustomerReceipts(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
                                id,
                                createdAt,
                                updatedAt,
                                picture,
                                customer{
                                    user{
                                        firstName,
                                        lastName
                                    }
                                },
                                bike{
                                   name,
                                   code
                                }
                             }
                        }`
        }
    };

    const data = await Promise.all(
        [
            await graphQl.post('', query()),
            await customerReceiptSettings()
        ]
    )

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            customerReceipts: data[0].data.data.getCustomerReceipts,
            settings: data[1]
        },
    };
};

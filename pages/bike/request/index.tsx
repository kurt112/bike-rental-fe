import {NextPage} from "next";
import React, {Fragment, useState} from "react";
import Head from "next/head";
import {requestedColumn} from "../../../types/rent";
import {getBikeStatus} from "../../../utils/bike";
import {
    bikeSettings,
    getBikes,
    handleApproveRequestByCustomer,
    handleRejectBikeRequestBYCustomer
} from "../../../api/bike-api";
import {useRouter} from "next/router";
import {pagination} from "../../../types/pagination";
import Link from "next/link";
import {formatDateWithTime} from "../../../utils/date";
import Swal from "sweetalert2";

const Requested: NextPage = ({bikes, settings}: any) => {
    const router = useRouter()
    const {search, page, size, status}: any = router.query
    const [pagination, setPagination] = useState<pagination>({search, page, size, status})

    const handleSearch = (data: string) => {
        const tempPagination = {...pagination};
        router.query.search = data;
        tempPagination.search = data;
        setPagination(tempPagination);
    }

    const __handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') searchClick().then(ignored => {
        });
    }

    const searchClick = async () => {
        await router.push(`/bike/request?search=${pagination.search}&page=${1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`)
    }

    const _handleApprove = async (userId: string, bikeId: string) => {

        Swal.fire({
            title: 'Pending for Approval',
            text: "You want to approve this request?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleApproveRequestByCustomer(userId, bikeId).then(ignored => {
                    searchClick();
                })
            }
        })
    }

    const _handleReject = async (userId: string, bikeId: string) => {
        Swal.fire({
            title: 'Request Reject',
            text: "Are you sure you want to reject this request?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleRejectBikeRequestBYCustomer(userId, bikeId).then(ignored => {
                    searchClick();
                })
            }
        })
    }


    return <Fragment>
        <Head>
            <title>Bike Request</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mr-2 ml-2 mt-5">
            <div className="pb-4 bg-white dark:bg-gray-900 pt-2 pl-2 flex justify-between p-4">
                <div id="right">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1 absolute">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                               value={pagination.search}
                               onKeyUp={(event) => __handleEnter(event)}
                               onChange={(e) => handleSearch(e.target.value)}
                               className="p-2 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search Anything"/>
                        <button type="submit"
                                onClick={searchClick}
                                className="text-white ml-2.5  right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {
                        requestedColumn ? requestedColumn.map((column, key) => {
                            return (
                                <th scope="col" className="py-3 px-6 text-center" key={key}>
                                    {column}
                                </th>
                            )
                        }) : null
                    }

                </tr>
                </thead>
                <tbody>

                {
                    bikes ? bikes.map((bike: any, i: number) => {
                        const {assignedCustomer} = bike;
                        const {user} = assignedCustomer;
                        const {firstName, lastName} = user
                        return (
                            <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={i}>
                                <th scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {firstName}
                                </th>
                                <td className="py-4 px-6">
                                    {lastName}
                                </td>
                                <td className="py-4 px-6">
                                    {
                                        bike.startBarrow ? formatDateWithTime(bike.startBarrow) : 'No Date Found'
                                    }
                                </td>
                                <td className="py-4 px-6">
                                    {
                                        bike.endBarrow ? formatDateWithTime(bike.endBarrow) : 'No Date Found'
                                    }
                                </td>

                                <td className="py-4 px-6">
                                    {bike.name}
                                </td>
                                <td className="py-4 px-6">
                                    {bike.price}
                                </td>
                                <td className="py-4 px-6">
                                    {
                                        bike.customerReceipt === null ?
                                            <span
                                                className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                No Receipt Attached
                                            </span>
                                            :
                                            <a target="_blank" rel="noopener noreferrer"
                                               href={`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.customerReceipt.picture}`}>
                                                <span
                                                    className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                    View Receipt
                                                </span>
                                            </a>
                                    }

                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => _handleApprove(user.id, bike.id)}
                                            type="button"
                                            className="mr-5 text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path fillRule="evenodd"
                                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Icon description</span>
                                    </button>

                                    <button onClick={() => _handleReject(user.id, bike.id)}
                                            type="button"
                                            className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Icon description</span>
                                    </button>
                                </td>
                            </tr>
                        )
                    }) : null
                }

                </tbody>
            </table>
            <nav className="flex justify-between items-center pt-4 pb-4" aria-label="Table navigation">
                           <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-5">Showing <span
                               className="font-semibold text-gray-900 dark:text-white">{page}</span> of <span
                               className="font-semibold text-gray-900 dark:text-white">{settings.totalPages}</span></span>
                <ul className="inline-flex items-center -space-x-px mr-5">
                    {
                        page > 1 ? <li className='cursor-pointer'>
                            <Link
                                href={`/bike?search=${search}&page=${parseInt(page) - 1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`}>
                                <button
                                    className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </Link>
                        </li> : null
                    }
                    {
                        Array.from(Array(settings.totalPages).keys()).map((page) => {
                            return (
                                <li key={page} className={'cursor-pointer'}>
                                    <Link
                                        href={`/bike/request?search=${search}&page=${page + 1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`}>
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
                            <Fragment>
                                <Link
                                    href={`/bike?search=${search}&page=${parseInt(page) + 1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`}>
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
                            </Fragment>
                    }
                </ul>
            </nav>
        </div>
    </Fragment>
}

export default Requested;

export const getServerSideProps = async (context: any) => {
    const {search, page, size} = context.query;

    const data = await Promise.all(
        [
            await getBikes(search, page, size, getBikeStatus.FOR_REQUEST),
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


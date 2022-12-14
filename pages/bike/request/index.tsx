import {NextPage} from "next";
import React, {Fragment, useState} from "react";
import Head from "next/head";
import {rentedColumn} from "../../../types/rent";
import {getBikeStatus} from "../../../utils/bike";
import {bikeSettings, getBikes} from "../../../api/bike-api";
import {useRouter} from "next/router";
import {pagination} from "../../../types/pagination";
import Link from "next/link";

const Requested:NextPage = ({bikes,settings}: any) =>{
    const router = useRouter()
    const {search, page, size, status}:any = router.query
    const [pagination, setPagination] = useState<pagination>({search, page, size, status})


    const handleSearch = (data: string) => {
        const tempPagination = {...pagination};
        router.query.search = data;
        tempPagination.search = data;
        setPagination(tempPagination);
    }

    const __handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') searchClick().then(ignored => {});
    }

    const searchClick = async () => {
        await router.push(`/bike?search=${pagination.search}&page=${1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`)
    }

    const _handleTerminate = async (userId: string, bikeId: string) => {
        // await handleApproveRequestByCustomer(userId, bikeId);
    }

    return <Fragment>
        <Head>
            <title>Bike Request</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                        rentedColumn?rentedColumn.map((column, key) => {
                            return (
                                <th scope="col" className="py-3 px-6" key={key}>
                                    {column}
                                </th>
                            )
                        }): null
                    }

                </tr>
                </thead>
                <tbody>

                {
                    bikes?bikes.map((bike: any, i: number) => {
                        const {assignedCustomer} = bike;
                        const {user} = assignedCustomer;
                        const {firstName, lastName} = user
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                <th scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {firstName}
                                </th>
                                <td className="py-4 px-6">
                                    {lastName}
                                </td>
                                <td className="py-4 px-6">
                                    No value
                                </td>
                                <td className="py-4 px-6">
                                    No Value
                                </td>

                                <td className="py-4 px-6">
                                    {bike.name}
                                </td>
                                <td className="py-4 px-6">
                                    {bike.price}
                                </td>
                                <td className="py-4 px-6">
                                    <Link href={`/employee/edit?id=${user.id}`}>
                                        <div className="cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">
                                            Approve
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }): null
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
                                    <Link href={`/bike?search=${search}&page=${page+1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`}>
                                        <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {page+1}
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                    {
                        page >= settings.totalPages ? null :
                            <Link
                                href={`/bike?search=${search}&page=${parseInt(page) + 1}&size=${size}&status=${getBikeStatus.FOR_REQUEST}`}>
                                <li className='cursor-pointer'>
                                    <div className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
}

export default Requested;

export const getServerSideProps = async (context: any) => {
    const {search, page, size} = context.query;

    const data=  await Promise.all(
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


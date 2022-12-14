import {NextPage} from "next";
import Head from "next/head";
import React, {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {pagination} from "../../types/pagination";
import Link from "next/link";
import {formatDate} from "../../utils/date";
import {employeeColumns} from "../../types/employee";
import {customerSettings, getEmployees} from "../../api/employee-api";
import {Button} from "@chakra-ui/react";

const Employee: NextPage = ({employees,settings}: any) => {
    const router = useRouter()
    const {search, page, size, status}:any = router.query
    const [pagination, setPagination] = useState<pagination>({search, page, size, status})


    const handleSearch = (data: string) => {
        const tempPagination = {...pagination};
        tempPagination.search = data;
        router.query.search = data;
        setPagination(tempPagination);
    }


    const __handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter')
            searchClick().then(ignored => {});

    }

    const searchClick = async () => {
        await router.push(`/employee?search=${pagination.search}&page=${1}&size=${size}&status=${status}`)
    }

    return (
        <Fragment>
            <Head>
                <title>Employees</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mr-2 ml-2 mt-5">
                <div className="pb-4 bg-white dark:bg-gray-900 pt-2 pl-2 flex justify-between p-4">
                    <div id="left">
                        <Link href="employee/create">
                            <div className="relative mt-1 absolute">
                                <button
                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span
                                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Create Employee
                            </span>
                                </button>
                            </div>
                        </Link>
                    </div>
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
                                   onKeyUp={(event) => __handleEnter(event)}
                                   value={pagination.search}
                                   onChange={(e) => handleSearch(e.target.value)}
                                   className="p-2 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search Anything"/>
                            <button
                                onClick={searchClick}
                                type="submit"
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
                            employeeColumns ? employeeColumns.map((column, key) => {
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
                        employees ? employees.map((employee: any) => {
                            const {user} = employee;
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={user.id}>
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.firstName}
                                    </th>
                                    <td className="py-4 px-6">
                                        {user.lastName}
                                    </td>
                                    <td className="py-4 px-6">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {user.cellphone}
                                    </td>

                                    <td className="py-4 px-6">
                                        {user.birthdate ? formatDate(user.birthdate) : 'NA'}
                                    </td>
                                    <td className="py-4 px-6">
                                        {user.gender}
                                    </td>

                                    <td className="py-4 px-6">
                                        <Link href={`/employee/edit?id=${employee.id}`}
                                           className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
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
                            className="font-semibold text-gray-900 dark:text-white">{settings.totalPages}</span>
                            </span>
                    <ul className="inline-flex items-center -space-x-px mr-5">

                        {
                            page > 1 ? <li className='cursor-pointer'>
                                <Link
                                    href={`/employee?search=${search}&page=${parseInt(page) - 1}&size=${size}&status=${status}`}>
                                    <Button
                                        className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Button>
                                </Link>
                            </li> : null
                        }

                        {
                            Array.from(Array(settings.totalPages).keys()).map((page) => {
                                return (
                                    <li key={page} className={'cursor-pointer'}>
                                        <Link href={`/employee?search=${search}&page=${page+1}&size=${size}&status=${status}`}>
                                            <Button className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                {page+1}
                                            </Button>
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        {
                            page >= settings.totalPages ? null :
                                <Link
                                    href={`/employee?search=${search}&page=${parseInt(page) + 1}&size=${size}&status=${status}`}>
                                    <li className='cursor-pointer'>
                                        <Button className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Next</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </Button>
                                    </li>
                                </Link>

                        }
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}
export default Employee

export const getServerSideProps = async (context: any) => {
    const {search, page, size, status} = context.query;

    const data = await Promise.all(
        [
            await getEmployees(search, page, size, status),
            await customerSettings()
        ]
    )

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            employees: data[0],
            settings: data[1]
        },
    };
};

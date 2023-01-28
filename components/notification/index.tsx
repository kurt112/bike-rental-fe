import {Fragment, useEffect, useState} from "react";
import {getNotifications} from "../../api/notification-api";
import {NotificationType} from "../../types/notification";
import image from '../../_images/erick.jpg';
import {formatDateWithTime, getFromNowDate} from "../../utils/date";
const Notification = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [page,setPage] = useState<number>(1);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        loadNotification();
    }, [])

    const loadNotification = () => {
        getNotifications(page,10).then(result => {
            if(result.length === 0){
                alert('No more notification to load');
                return;
            }
            const tempNotifications = [...notifications,...result ];

            setNotifications(tempNotifications);
            setPage(page+1);
        })


    }


    return (
        <Fragment>
            <button id="dropdownNotificationButton" onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                    type="button">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <div className="relative flex">
                    <div
                        className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                </div>
            </button>
            {
                isOpen?
                    <div id="dropdownNotification"
                         className="absolute right-0 top-0 mt-10 bg-white rounded-lg shadow-xl  z-50 headerFont text-base font-normal"
                         aria-labelledby="dropdownNotificationButton">
                        <div
                            className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                            Notifications
                        </div>
                        <div onClick={() => setIsOpen(false)} className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto z-50">
                            {
                                notifications?.map((notification: NotificationType) => {
                                    return <a href={notification.link} className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" key={notification.id}>
                                        <div className="flex-shrink-0 relative">
                                            <img className="rounded-full w-11 h-11" src={image.src}
                                                 alt="Joseph image"/>
                                            <div
                                                className="absolute z-50 flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"    ><span
                                                className="font-semibold text-gray-900 dark:text-white">{`${notification.from.firstName} ${notification.from.lastName} `}</span>
                                                {notification.message}
                                            </div>
                                            <div className="text-xs text-blue-600 dark:text-blue-500">{getFromNowDate(notification.createdAt)}</div>
                                        </div>
                                    </a>
                                })
                            }
                        </div>
                        <a onClick={loadNotification}
                           className="cursor-pointer block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                            <div className="inline-flex items-center ">
                                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fillRule="evenodd"
                                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                Load More
                            </div>
                        </a>
                    </div>: null
            }
        </Fragment>
    )
}

export default Notification

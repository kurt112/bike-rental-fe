import {NotificationType} from "../../types/notification";
import Link from "next/link";
import React, {Fragment} from "react";
import image from "../../_images/erick.jpg";
import {getFromNowDate} from "../../utils/date";
import Image from "next/image";
interface props {
    notification: NotificationType
}
const notificationCard = ({notification}: props) => {
    return <div className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                key={notification.id}>
        <Link href={notification.link === null ? '#' : notification.link}>
            <Fragment>
                <div className="flex-shrink-0 relative">
                    <Image className="rounded-full" src={image.src}
                           alt="Joseph image"
                           width={44}
                           height={44}
                           objectFit="contain"
                    />
                    <div
                        className="absolute z-50 flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                        <svg className="w-3 h-3 text-white" fill="currentColor"
                             stroke="currentColor" strokeWidth="1.5"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"></path>
                        </svg>
                    </div>
                </div>
                <div className="w-full pl-3">
                    <div
                        className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span
                        className="font-semibold text-gray-900 dark:text-white">{`${notification.from.firstName} ${notification.from.lastName} `}</span>
                        {notification.message}
                    </div>
                    <div
                        className="text-xs text-blue-600 dark:text-blue-500">{getFromNowDate(notification.createdAt)}</div>
                </div>
            </Fragment>
        </Link>
    </div>
}

export default notificationCard;

import {NextPage} from "next";

const Rented: NextPage = () => {
    return (
        <div className="grid grid-cols-4 gap-4 justify-center mt-3">
            <div className="flex justify-center ml-3 mr-3 mb-3">
                <div
                    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt=""/>
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bike
                                Name</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Description here</p>
                        <hr/>
                        <br/>
                        <h1 className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">Expiration: July 24, 2022 </h1>
                        <h1 className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">Time: 10:50:00 AM </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rented

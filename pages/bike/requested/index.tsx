import {NextPage} from "next";

const Requested: NextPage = () => {

    const _handleCancel = () => {

    }

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
                        <h1 className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">44$/hour (44 in stock)</h1>
                        <button onClick={_handleCancel}
                           className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Cancel
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Requested

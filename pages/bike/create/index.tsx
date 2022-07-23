import {NextPage} from "next";
import Link from "next/link";

const createBike: NextPage = () => {
    return (
        <div className="h-full font-sans antialiased bg-white w-full overflow-y-auto">
            <div className="w-full bg-green shadow z-1">
                <Link href="javascript:history.back()">
                    <button type="button"
                            className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                        <svg className=" h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                        </svg>
                        Back
                    </button>

                </Link>
            </div>
            <br/>
            <div className="bg-grey-lightest">
                <div className="mx-auto">
                    <div className=" mx-auto bg-white rounded ">
                        <div className="text-black text-xl pl-3 ">Create Bike
                        </div>
                        <div className="py-4 px-8">
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="first_name">Brand</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="first_name" type="text" placeholder="Bike Brand"/>
                                </div>
                                <div className="w-1/2 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Name/Model</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="last_name" type="text" placeholder="Bike Model"/>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="w-1/4 mr-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="first_name">Quantity</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="first_name" type="number" placeholder="Bike Brand"/>
                                </div>
                                <div className="w-1/4 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Price/Hr</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="last_name" type="number" placeholder="Bike Price/Hr"/>
                                </div>
                                <div className="w-1/4 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Size</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="last_name" type="number" placeholder="Size"/>
                                </div>
                                <div className="w-1/4 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2"
                                           htmlFor="last_name">Current Store</label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                           id="last_name" type="text" placeholder="Current Store"/>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                    Bike Description
                                </label>
                                <textarea id="message" rows={4}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Your message..."></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                    Bike Picture's
                                </label>
                                <main className=" mx-auto max-w-screen-lg h-full">
                                    <article aria-label="File Upload Modal"
                                             className="relative h-full flex flex-col bg-white rounded-md"
                                        // onDrop="dropHandler(event);" onDragOver="dragOverHandler(event);"
                                        // onDragLeave="dragLeaveHandler(event);" onDragEnter="dragEnterHandler(event);"
                                    >
                                        <div id="overlay"
                                             className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                                            <i>
                                                <svg className="fill-current w-12 h-12 mb-3 text-blue-700"
                                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24">
                                                    <path
                                                        d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"/>
                                                </svg>
                                            </i>
                                            <p className="text-lg text-blue-700">Drop files to upload</p>
                                        </div>

                                        <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                                            <header
                                                className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                                </p>
                                                <input id="hidden-input" type="file" multiple className="hidden"/>
                                                <button id="button"
                                                        className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                    Upload a file
                                                </button>
                                            </header>

                                            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                                To Upload
                                            </h1>

                                            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                                                <li id="empty"
                                                    className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                                    <img className="mx-auto w-32"
                                                         src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                                         alt="no data"/>
                                                    <span className="text-small text-gray-500">No files selected</span>
                                                </li>
                                            </ul>
                                        </section>

                                        <footer className="flex justify-end px-8 pb-8 pt-4">
                                            <button id="submit"
                                                    className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                                                Upload now
                                            </button>
                                            <button id="cancel"
                                                    className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                Cancel
                                            </button>
                                        </footer>
                                    </article>
                                </main>
                                <template id="file-template">

                                </template>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default createBike

import Head from "next/head";
import Back from "../../components/layout/back";
import {Fragment, useEffect, useState} from "react";
import {getStoreData, handleSubmit} from "../../api/store-api";
import {NextPage} from "next";
import {StoreMap} from "../../utils/googleMap/StoreMap";
import {getBikes} from "../../api/bike-api";
import {getBikeStatus} from "../../utils/bike";
import {BikeObject} from "../../types/bike";

const EditStore: NextPage = () => {

    const [isEdit, setEdit] = useState(false);
    const [store, setStore] = useState<any>(null);
    const [bikes,setBikes] = useState<BikeObject>();
    const [role,setRole] = useState<string>('NA');
    const handleEdit = () => {
        if(role !== 'admin') {
            return alert('To edit this you must be admin role')
        }
        setEdit(!isEdit);
    }

    const changeStore = (data: any, target: any) => {
        const currentStore = {...store}
        currentStore[target] = data;
        setStore(currentStore);
    }

    useEffect(() => {
        if (store === null) {
            getStoreData(1).then(store => {
                setStore(store);
            });
        }

        let user: any | null = localStorage.getItem('user');
        user = JSON.parse(user);
        setRole(user.userRole)

        const interval = setInterval(() => {
            getBikes("all", 0, 0, getBikeStatus.RENTED).then(result => {
                setBikes(result);
            });
            console.log("Getting location");
        }, 3000);
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, []);



    return <Fragment>
        <Head>
            <title>View Store</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        {
            store !== null ?
                <div className="h-full font-sans antialiased bg-white    w-full overflow-y-auto">
                    <div className="w-full bg-green shadow z-1 flex justify-between p-2">
                        <Back/>
                        {
                            isEdit ?
                                <button onClick={handleEdit} type="button"
                                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    View
                                </button> :
                                <button type="button"
                                        onClick={handleEdit}
                                        className="rounded-full text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                    <span className="sr-only">Edit</span>
                                </button>
                        }
                        <div></div>
                    </div>
                    <br/>
                    <div className="bg-grey-lightest">
                        <div className="mx-auto">
                            <div className=" mx-auto bg-white rounded ">
                                <div className="text-black text-4xl pl-2">
                                    {
                                        isEdit ? 'Edit Store' : 'Store Data'
                                    }
                                </div>
                                <div className="py-4 px-8 mb-10">
                                    <div className="flex mb-4">
                                        <div className="w-full mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="first_name">Store</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="first_name"
                                                type="text"
                                                placeholder="Store Name"
                                                disabled={!isEdit}
                                                value={store.name}
                                                onChange={(e) => changeStore(e.target.value, 'name')}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="last_name">Latitude</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="last_name"
                                                disabled={!isEdit}
                                                type="number"
                                                placeholder="Enter Latitude"
                                                value={store.latitude}
                                                onChange={(e) => changeStore(e.target.value, 'latitude')}
                                            />
                                        </div>

                                        <div className="w-1/2 mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="first_name">Longitude</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="first_name"
                                                type="number"
                                                placeholder="Enter Longitude"
                                                disabled={!isEdit}
                                                value={store.longitude}
                                                onChange={(e) => changeStore(e.target.value, 'longitude')}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mb-4">
                                        <div className="w-1/2 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="last_name">Scope Color</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="last_name"
                                                disabled={!isEdit}
                                                type="text"
                                                placeholder="Enter ScopeColor"
                                                value={store.scopeColor}
                                                onChange={(e) => changeStore(e.target.value, 'scopeColor')}
                                            />
                                        </div>

                                        <div className="w-1/2 mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="first_name">Scope Edge Color</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="first_name"
                                                type="text"
                                                placeholder="Enter ScopeEdge Color"
                                                disabled={!isEdit}
                                                value={store.scopeEdgeColor}
                                                onChange={(e) => changeStore(e.target.value, 'scopeEdgeColor')}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mb-4">
                                        <div className="w-full mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="first_name">Radius</label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                id="first_name"
                                                type="text"
                                                placeholder="Store Name"
                                                disabled={!isEdit}
                                                value={store.radius}
                                                onChange={(e) => changeStore(e.target.value, 'radius')}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mb-4">
                                        {
                                            StoreMap(store,bikes)
                                        }
                                    </div>
                                    {
                                        isEdit ? <button onClick={(e) => handleSubmit(e, store)} type="button"
                                                         className="pr-20 pl-20 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                            Submit
                                        </button> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null
        }
    </Fragment>
}

export default EditStore;

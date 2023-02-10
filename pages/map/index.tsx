import {NextPage} from "next";
import {useEffect, useState} from "react";
import {StoreMap} from "../../utils/googleMap/StoreMap";
import {Store} from "../../types/store";
import {getStoreData} from "../../api/store-api";
import {BikeObject} from "../../types/bike";
import {
    getBikeByCustomerWithLocation, getBikes
} from "../../api/bike-api";
import {getBikeStatus} from "../../utils/bike";

const ClientMap:NextPage = () => {
    const [store, setStore] = useState<Store>({
        id: '',
        latitude: '',
        name: '',
        longitude: '',
        radius: '',
        scopeColor: '',
        scopeEdgeColor: ''
    });

    const [bikes, setBikes] = useState<Array<BikeObject>>([]);

    useEffect(() => {
        if (store.id === '') {
            getStoreData(1).then(store => {
                setStore(store);
            });
        }

        const interval = setInterval(() => {
            getBikeByCustomerWithLocation('').then(bikeResult => {
                setBikes(bikeResult);
            })
        }, 3000);
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, []);


    return (
        StoreMap(store, null, bikes)
    )
}

export default ClientMap
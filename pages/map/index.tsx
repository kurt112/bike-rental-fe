import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Store} from "../../types/store";
import {getStoreData} from "../../api/store-api";
import {BikeObject} from "../../types/bike";
import {
    getBikeByCustomerWithLocation
} from "../../api/bike-api";
import StoreMap from "../../utils/googleMap/StoreMap";

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

    const [bikes, setBikes] = useState<[BikeObject] | null>(null);

    useEffect(() => {
        if (store.id === '') {
            getStoreData(1).then(store => {
                setStore(store);
            });
        }

        const interval = setInterval(() => {
            console.log('updating your location')
            getBikeByCustomerWithLocation('').then(bikeResult => {
                setBikes(bikeResult);
            })
        }, 3000);
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, []);


    return (
        <StoreMap newStore={store} clientBike={bikes} bikes={null}></StoreMap>

    )
}

export default ClientMap

// (store, null, bikes)
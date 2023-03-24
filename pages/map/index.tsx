import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Store} from "../../types/store";
import {getStoreData} from "../../api/store-api";
import {BikeObject} from "../../types/bike";
import {
    getBikeByCustomerWithLocation
} from "../../api/bike-api";
import StoreMap from "../../utils/googleMap/StoreMap";
import { computeDistanceBetween } from "spherical-geometry-js";

const ClientMap:NextPage = () => {
    const [store, setStore] = useState<Store>({
        id: '',
        latitude: '',
        name: '',
        longitude: '',
        radius: '',
        scopeColor: '',
        scopeEdgeColor: '',
        bpi: '',
        gcash: '',
        paymaya: '',
        bdo: '',
        securityBank:''
    });

    const [bikes, setBikes] = useState<[BikeObject] | null>(null);

    const alertIfNotInside = (bike: [BikeObject]) => {
        if(bike == null) return;
        const currentBike = bike[0];
        console.log(currentBike); 
        if(currentBike === null || currentBike === undefined) return;
        console.log('The number');
        console.log(computeDistanceBetween(
            [currentBike.latitude?+currentBike.latitude:0,currentBike.longitude?+currentBike.longitude: 0],
            [+store.latitude, +store.longitude],
            +store.radius));
    }


    useEffect(() => {
        if (store.id === '') {
            getStoreData(1).then((store:Store) => {
                setStore(store);
                if(store.securityBank !== null) localStorage.setItem('securityBank',store.securityBank);
                if(store.bpi !== null) localStorage.setItem('bpi',store.bpi);
                if(store.bdo !== null) localStorage.setItem('bdo',store.bdo);
                if(store.paymaya !== null) localStorage.setItem('paymaya',store.paymaya);
                if(store.gcash !== null) localStorage.setItem('gcash',store.gcash);
            }); 
        }

        const interval = setInterval(() => {
            getBikeByCustomerWithLocation('').then(bikeResult => {
                setBikes(bikeResult);
                console.log('wew');
                
                alertIfNotInside(bikeResult)
            });
        }, 3000);
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, []);


    return (
        <StoreMap newStore={store} clientBike={bikes} bikes={null}/>

    )
}

export default ClientMap

// (store, null, bikes)
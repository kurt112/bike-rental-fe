import {CircleF, GoogleMap, LoadScriptNext, MarkerF} from "@react-google-maps/api";
import {Store} from "../../types/store";
import {BikeObject} from "../../types/bike";
import React, {Fragment} from "react";
import marker from '../../_images/bike-marker.png'

interface props {
    newStore: Store,
    bikes: [BikeObject] | null,
    clientBike: [BikeObject] | null
}

const StoreMap = ({
                      newStore,
                      bikes,
                      clientBike
                  }: props) => {
    console.log(bikes);
    console.log(clientBike);
    return newStore === null ? null :
        <LoadScriptNext googleMapsApiKey={process.env.mapKey ? process.env.mapKey : ''}>
            <div className="w-full h-screen">
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={{lng: +newStore.longitude, lat: +newStore.latitude}}
                    zoom={13.4}

                    // onClick={(e) => _mapClick(e)}
                >
                    <Fragment>
                        <MarkerF label={newStore.name} title={'Current Store'}
                                 position={{lng: +newStore.longitude, lat: +newStore.latitude}}
                        />
                        {
                            bikes?.map(bike => {
                                let name = 'No Customer Found';
                                if (bike.assignedCustomer?.user != undefined) {
                                    const {user} = bike.assignedCustomer;
                                    name = user.firstName + ' ' + user?.lastName;
                                }
                                return <MarkerF label={name} title={name}
                                                key={bike.id}
                                                icon={marker.src}
                                                position={{
                                                    lng: bike.longitude ? +bike.longitude : 1,
                                                    lat: bike.latitude ? +bike.latitude : 2
                                                }}
                                />
                            })
                        }
                        {
                            clientBike?.map(bike => {
                                let name = 'You';
                                return <MarkerF label={name} title={name}
                                                key={bike.id}
                                                icon={marker.src}
                                                position={{
                                                    lng: bike.longitude ? +bike.longitude : 1,
                                                    lat: bike.latitude ? +bike.latitude : 2
                                                }}
                                />
                            })
                        }
                        <CircleF radius={+newStore.radius} options={
                            {
                                strokeColor: newStore.scopeEdgeColor,
                                center: {lng: +newStore.longitude, lat: +newStore.latitude},
                                fillColor: newStore.scopeColor
                            }
                        }
                        />
                    </Fragment>

                </GoogleMap>
            </div>
        </LoadScriptNext>
}

export default StoreMap
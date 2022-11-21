import {CircleF, GoogleMap, LoadScript, LoadScriptNext, MarkerF} from "@react-google-maps/api";
import {Store} from "../../types/store";

export const StoreMap: any = (newStore: Store) => {
    return (
        <LoadScriptNext googleMapsApiKey={"AIzaSyDemKVk7XsaxU-Vt2jmE1TcRv1rOlL_SNA"}>
            <div className="w-full h-screen">
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={{lng: +newStore.longitude, lat: +newStore.latitude}}
                    zoom={13.4}
                    // onClick={(e) => _mapClick(e)}
                >
                    <MarkerF label={newStore.name} title={'Current Store'}
                             position={{lng: +newStore.longitude, lat: +newStore.latitude}}/>
                    <CircleF radius={+newStore.radius} options={
                        {
                            strokeColor: newStore.scopeEdgeColor,
                            center: {lng: +newStore.longitude, lat: +newStore.latitude},
                            fillColor: newStore.scopeColor
                        }
                    }
                    />

                </GoogleMap>
            </div>
        </LoadScriptNext>
    )

}

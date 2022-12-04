import {axiosGet} from "../../.config/api";
import {NextRouter} from "next/router";
import {SetStateAction} from "react";

export const tableSettings = async (url:string, router:NextRouter, setTotalPages: SetStateAction<any>) => {
    await axiosGet.get(url).then(result => {
        let {data} = result;

        data = data.data;
        const {totalPages, currentPage} = data;

        const tempTotalPages: Array<number> = [];

        for (let i = 1; i <= totalPages; i++) {
            tempTotalPages.push(i);
        }

        setTotalPages(tempTotalPages);

        router.query.page = currentPage

        router.push({
                query: {...router.query}
            },
            undefined,
            {}
        ).then(ignored => {

        })
    })
}

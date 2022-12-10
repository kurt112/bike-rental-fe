import {sidebar} from "../../../types/sidebar";
import receipt from './icon/receipt.svg'
import request from './icon/request.svg'
import contract from './icon/contract.svg'
import available from './icon/available.svg'
const sidebarsItemClient:Array<sidebar> = [
    {icon: available,link:'/bike/available?search=&page=1&size=10&status=0',name: 'Available'},
    {icon: request,link:'/request   ',name: 'Requested'},
    {icon: contract,link:'/rented',name: 'Rented'},
    {icon: receipt,link:'/customer/bill',name: 'Bill'}
]

export default sidebarsItemClient;



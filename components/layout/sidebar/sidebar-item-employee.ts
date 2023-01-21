import {sidebar} from "../../../types/sidebar";
import bike from './icon/bike.svg'
import customer from './icon/customer.svg'
import receipt from './icon/receipt.svg'
import request from './icon/request.svg'
import store from './icon/store.svg'
import contract from './icon/contract.svg'
import {getBikeStatus} from "../../../utils/bike";
const sidebarItemEmployee:Array<sidebar> = [
    // {icon: bikeIcon,link:'#',name: 'Dashboard'},
    {icon: bike,link:'/bike?search=&page=1&size=10&status=0',name: 'Bike'},
    {icon: customer,link:'/customer?search=&page=1&size=10&status=0',name: 'Customer'},
    {icon: receipt,link:'/receipt?search=&page=1&size=10&status=0',name: 'Receipt'},
    {icon: contract,link:`/bike/rented?search=&page=1&size=10&status=${getBikeStatus.RENTED}`,name: 'Rented'},
    {icon: request,link:`/bike/request?search=&page=1&size=10&status=${getBikeStatus.FOR_REQUEST}`,name: 'Requests'},
    {icon: store,link:'/store',name: 'Store'},
]

export default sidebarItemEmployee;



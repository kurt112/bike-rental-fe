import {sidebar} from "../../../types/sidebar";
import bikeIcon from './icon/test.svg'
import bike from './icon/bike.svg'
import customer from './icon/customer.svg'
import employee from './icon/employee.svg'
import receipt from './icon/receipt.svg'
import request from './icon/request.svg'
import store from './icon/store.svg'
import contract from './icon/contract.svg'
const sidebarItemAdmin:Array<sidebar> = [
    {icon: bikeIcon,link:'#',name: 'Dashboard'},
    {icon: bike,link:'/bike?search=&page=1&size=10&status=0',name: 'Bike'},
    {icon: customer,link:'/customer?search=&page=1&size=10&status=0',name: 'Customer'},
    {icon: receipt,link:'/receipt?search=&page=1&size=10&status=0',name: 'Receipt'},
    {icon: employee,link:'/employee?search=&page=1&size=10&status=0',name: 'Employee'},
    {icon: contract,link:'/bike/rented?search=&page=1&size=10&status=0',name: 'Rented'},
    {icon: request,link:'/bike/request?search=&page=1&size=10&status=0',name: 'Requests'},
    {icon: store,link:'/store',name: 'Store'},
]

export default sidebarItemAdmin;



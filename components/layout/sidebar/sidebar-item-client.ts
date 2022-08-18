import {sidebar} from "../../../types/sidebar";
import bikeIcon from './icon/test.svg'
import performance from './icon/dashboard.svg'
const sidebarItemAdmin:Array<sidebar> = [
    {icon: performance,link:'/bike?search=&page=0&size=10&status=0',name: 'Available'},
    {icon: performance,link:'/bike?search=&page=0&size=10&status=0',name: 'Requested'},
    {icon: performance,link:'/customer?search=&page=0&size=10&status=0',name: 'Rented'},
]

export default sidebarItemAdmin;



import {sidebar} from "../../../types/sidebar";
import bikeIcon from './icon/test.svg'
import dashboard from './icon/dashboard.svg'
import performance from './icon/dashboard.svg'
const sidebarItem:Array<sidebar> = [
    {icon: bikeIcon,link:'#',name: 'Dashboard'},
    {icon: performance,link:'/bike?search=&page=0&size=10&status=0',name: 'Bike'},
    {icon: performance,link:'/customer?search=&page=0&size=10&status=0',name: 'Customer'},
    {icon: dashboard,link:'/receipt?search=&page=0&size=10&status=0',name: 'Receipt'},
    {icon: dashboard,link:'/employee?search=&page=0&size=10&status=0',name: 'Employee'},
    {icon: dashboard,link:'/settings?search=&page=0&size=10&status=0',name: 'Settings'},
]

export default sidebarItem;

import {sidebar} from "../../../types/sidebar";
import bikeIcon from './icon/test.svg'
import dashboard from './icon/dashboard.svg'
import performance from './icon/dashboard.svg'
const sidebarItem:Array<sidebar> = [
    {icon: bikeIcon,link:'#',name: 'Dashboard'},
    {icon: performance,link:'/bike',name: 'Bike'},
    {icon: performance,link:'#',name: 'Customer'},
    {icon: dashboard,link:'#',name: 'Receipt'},
    {icon: dashboard,link:'#',name: 'Employee'},
    {icon: dashboard,link:'#',name: 'Settings'},
]

export default sidebarItem;

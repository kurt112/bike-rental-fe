import {sidebar} from "../../../types/sidebar";
import performance from './icon/dashboard.svg'
const sidebarsItemClient:Array<sidebar> = [
    {icon: performance,link:'/bike/available?search=&page=0&size=10&status=0',name: 'Available'},
    {icon: performance,link:'/bike/requested?search=&page=0&size=10&status=0',name: 'Requested'},
    {icon: performance,link:'/bike/rented?search=&page=0&size=10&status=0',name: 'Rented'},
    {icon: performance,link:'/customer/bill',name: 'Bill'}
]

export default sidebarsItemClient;



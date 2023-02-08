import {Fragment, useEffect, useState} from "react";
import parseJson from "parse-json";
import {getCustomerBill} from "../../../api/customer-api";

const CustomerBill = () => {
    const[user, setUser] = useState<any>();
    const [bill,setBill] = useState<number>();

    useEffect(() => {
        getCustomerBill(user.id).then(data => {
            setUser(localStorage.getItem('user'));
            if(!data) setBill(0)
            setBill(data);
        })
    },[]);

    return (
      <Fragment>
          <div className='flex justify-center content-center items-center' style={{height: '90vh'}}>
              <h1 className='text-6xl subpixel-antialiased font-mono text-center'>
                  Current Bill <br/>

                  ₱{bill}
              </h1>
          </div>
      </Fragment>
    )
}

export default CustomerBill;

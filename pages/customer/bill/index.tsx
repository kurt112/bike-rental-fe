import {Fragment, useEffect, useState} from "react";
import {getCustomerBill} from "../../../api/customer-api";

const CustomerBill = () => {
    const [bill,setBill] = useState<number>(0);

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if(localUser !== undefined) return;

        const user = JSON.parse(localUser);
        getCustomerBill(user.id).then(data => {
            if(!data) setBill(0)
            setBill(data);
        })
    },[]);

    return (
      <Fragment>
          <div className='flex justify-center content-center items-center' style={{height: '90vh'}}>
              <h1 className='text-6xl subpixel-antialiased font-mono text-center'>
                  Current Bill <br/>

                  ₱<span className={'ml-3'}>{bill}</span>
              </h1>
          </div>
      </Fragment>
    )
}

export default CustomerBill;

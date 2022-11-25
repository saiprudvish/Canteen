import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { UserService } from '../user.service';

@Component({
  selector: 'app-currentorders',
  templateUrl: './currentorders.component.html',
  styleUrls: ['./currentorders.component.css']
})
export class CurrentordersComponent implements OnInit {



 UserOrderDetails:any;
  orderid:any;
  date:any;
  time:any;
  cost:any;
  orders:any;
   
  constructor(private us:UserService) { }
  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: "AIzaSyC3_sVw1vM2JJYHIZrmhW0eYOfz9aEOJKI",
      authDomain: "vnrcanteen-dc1ee.firebaseapp.com",
      projectId: "vnrcanteen-dc1ee",
      storageBucket: "vnrcanteen-dc1ee.appspot.com",
      messagingSenderId: "560693712371",
      appId: "1:560693712371:web:2ff1567022f2b7f06c2e86",
      measurementId: "G-SZ11ZY2DL6"
    };
  
    const app = initializeApp(firebaseConfig);
    const auth=getAuth(app);
    
    //console.log(auth.currentUser?.photoURL)
    
    const user = auth.currentUser;
    //console.log(user)
    let username=user?.uid

    this.us.userordersdetails(username).subscribe(
      res=>{
        //console.log(res.message)
        this.UserOrderDetails=res.message;
        this.date=this.UserOrderDetails.orderdetails.ordereddate;
        this.orderid=this.UserOrderDetails.orderId;
        this.time=this.UserOrderDetails.orderdetails.orderedtime;
        this.orders=this.UserOrderDetails.orderdetails.orderedfood;
        this.cost=this.UserOrderDetails.orderdetails.total;
        //console.log(this.cost)
       console.log(this.orders)
      }
    )
  }

}

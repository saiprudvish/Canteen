import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { UserService } from '../user.service';
import {Observable, of} from 'rxjs'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
   ijj:any;
  fooditems:any;
  usname:any;
  ans:any;
  usmail:any;
  userCartObj:any;
  products:any;
  userObj:any;
  count:any;
 size:any=0;
  sum:any;
  dis:any=0;
  con:any=0;
  add:any;
  constructor(private us:UserService) { }

  ngOnInit(): void {
  
     //get user data from local storage
     const firebaseConfig = {
      apiKey: "AIzaSyC3_sVw1vM2JJYHIZrmhW0eYOfz9aEOJKI",
      authDomain: "vnrcanteen-dc1ee.firebaseapp.com",
      projectId: "vnrcanteen-dc1ee",
      storageBucket: "vnrcanteen-dc1ee.appspot.com",
      messagingSenderId: "560693712371",
      appId: "1:560693712371:web:2ff1567022f2b7f06c2e86",
      measurementId: "G-SZ11ZY2DL6"
    };
    
  
  this.us.getProducts().subscribe((userData:any)=>{

    this.fooditems=userData.message;

      // console.log(this.users)
 },
err=>{
  console.log("err in getting info data",err)
}

)



    const app = initializeApp(firebaseConfig);
    const auth=getAuth(app);
    
    //console.log(auth.currentUser?.photoURL)
    
    const user = auth.currentUser;
    //console.log(user)
    let username=user?.uid
    this.usname=auth.currentUser?.displayName
    this.usmail=user?.email
     //get userCartObj from API
     this.us.getProductsFromUserCart(username).subscribe(
       res=>{
           //console.log(res.message)
           this.products=res.message.products
          //this.ans=JSON.stringify(this.products)
         let siz = this.products.length
         this.add=0;
         for(let i=0; i<siz;i++){
       
          let obj=this.products[i];
          //console.log(obj.cost)
             this.size = this.size + (obj.foodcount)
              this.add = this.add + (obj.foodcount * obj.cost);
         }
          //console.log(this.add)
         //this.sum=this.add;
        
       }
   
     
     )
     this.sum = this.add + this.con + this.dis;
     
     // console.log(this.add)
   
    
     
   
  }
  additem(item:any){
    //console.log(item)
     
  this.ijj=item;


let productObject=this.fooditems[item-1]
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

//console.log(auth)

const user = auth.currentUser;
let username=user?.uid

     

let newUserProductObj={username,productObject}
  
   this.us.sendProductToUserCart(newUserProductObj).subscribe(
     res=>{
       alert(res['message'])
       this.us.updateDataObservable(res.latestCartObj)
     },
     err=>{
       console.log("err in posting product to cart ",err)
       alert("Something wrong in adding product to cart...")
     }
    
   )

       
  this.us.getProducts().subscribe((userData:any)=>{

    this.fooditems=userData.message;
      // console.log(this.users)
 },
err=>{
  console.log("err in getting info data",err)
}

)
  
 }

  deleteitem(item:any){
    //console.log(item)
     
  
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
  
  //console.log(auth)
  
  const user = auth.currentUser;
  let username=user?.uid
  
     
  
  let newUserProductObj={username,item}
  
   this.us.deleteProductfromUserCart(newUserProductObj).subscribe(
     res=>{
  
      this.us.updateDataObservable(res.latestCartObj)
       alert(res['message'])
      
     },
     err=>{
       console.log("err in posting product to cart ",err)
       alert("Something wrong in adding product to cart...")
     }
   )
       
  this.us.getProducts().subscribe((userData:any)=>{

    this.fooditems=userData.message;
      // console.log(this.users)
 },
err=>{
  console.log("err in getting info data",err)
}

)
    }  

}

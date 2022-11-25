import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { UserService } from '../user.service';
import {Observable, of} from 'rxjs'
import { Router } from '@angular/router';
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
  couponstatus:boolean= false
  size:any=0;
  sum:any=0;
  dis:any=0;
  con:any=0;
  fee:any=0;
  add:any;
  coupon="";
  constructor(private us:UserService,private router:Router) { }
   
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
              this.sum=this.add
         }

       
       }
   
     
     )


    
  
     
     // console.log(this.add)
   
    
     
   
  }


  Applycoupon(){
    // console.log(this.add)
    let date: Date = new Date();  
    let day=date.getDay()
  if(this.couponstatus==false){
      
          if(this.coupon=="VNR5"){
          //console.log("It is a friday.");
          alert("COUPON APPLIED")
          this.con=10;
         this.couponstatus=true;
          this.sum=this.add - 10;
          }
     
       else if(this.coupon=="VNR6"){
          alert("COUPON APPLIED")
          this.con=10;
         this.couponstatus=true;
          this.sum=this.add - 10;
          }
          else {
            alert("COUPON INVALID")
          }
      
  }


    //console.log(this.sum)
  
  else{
    alert("COUPON ALREADY USED")
  }
 
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


 //orderss
 placeorder(){
 

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
    
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate)
  // let date: Date = new Date();
   let t=new Date().toJSON().slice(11,19); 
let orderedObj={
total:this.sum,
ordereduser:username,
ordereddate:currentDate,
orderedtime:t,
orderedfood:this.products
}
  
//console.log(orderedObj)
this.us.updateuserorders(orderedObj).subscribe(
res=>{
  //console.log(res)
   
}
)
   
  alert("ORDER PLACED")
  this.router.navigateByUrl('/corders')
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

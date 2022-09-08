import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  


  constructor(public us:UserService,private ar:Router){}
fooditems:any;
  ngOnInit(): void {
    this.us.getProducts().subscribe(
      userData=>{
        //assign movies
        this.fooditems=userData.message;
     //   console.log(this.fooditems)
     
       
      },
      err=>{
        console.log("err in getting movies data",err)
      }
  )
  }

 additem(item:any){
    //console.log(item)
     
let productObject=this.fooditems[item-1];
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
   if(username !=null){
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
    }
    else{
      alert("Please Login first")
    }
  
 }
}

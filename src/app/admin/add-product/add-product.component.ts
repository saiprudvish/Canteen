import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private us:UserService) { }

  ngOnInit(): void {
  }
  onAddProduct(prodObj:any){
    this.us.addNewProduct(prodObj).subscribe(
      res=>{
       alert(res.message)
      },
      err=>{
        console.log("err in adding rpoduct",err)
        alert("Something went wrong in adding product")
      }
    )
  }

}

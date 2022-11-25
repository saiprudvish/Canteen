//create mini express application
const exp=require("express")

const expressErrorHandler = require("express-async-handler")
const userApi=exp.Router();






userApi.use(exp.json())



userApi.post('/add-product', expressErrorHandler(async (req, res, next) => {

  let itemsCollectionObj = req.app.get("itemsCollectionObj")
  newquestion = req.body;
  //console.log(newProduct)
  //search
  let qobj = await itemsCollectionObj.findOne({ foodid: newquestion.foodid});

  if(qobj === null){
     let qstionsObj= await itemsCollectionObj.insertOne(newquestion)
     res.send({message:"new product added"})
  }
  else{
        res.send({message:"product already existed with this id"})
  }

}))

userApi.post("/updateorders", expressErrorHandler(async (req, res, next) => {

  let ordersCollectionObj = req.app.get("ordersCollectionObj")
   let orderdetails=req.body
   let k=orderdetails.ordereduser.slice(4,10)
   await ordersCollectionObj.remove({orderId:k})
   await ordersCollectionObj.insertOne({orderId:k,orderdetails})
      
   let obj={
    date:orderdetails.ordereddate,
    time:orderdetails.orderedtime,
    userOrderid:k,
    products:orderdetails.orderedfood,
    cost:orderdetails.total
   }
    
   //console.log(orders)
    res.send({message: obj })
   
 
  //console.log(products)
 

}))



//update order status
userApi.get("/getitems", expressErrorHandler(async (req, res, next) => {

  let itemsCollectionObj = req.app.get("itemsCollectionObj")

  let products = await itemsCollectionObj.find().sort({foodid:1}).toArray()
  //console.log(products)
  res.send({ message: products })

}))

 
//add to cart
userApi.post("/add-to-cart", expressErrorHandler(async (req, res, next) => {


  let itemsCollectionObj = req.app.get("itemsCollectionObj")
  let userCartCollectionObject = req.app.get("userCartCollectionObject")
  let newProdObject = req.body;
  //console.log(newProdObject)
  let idd=newProdObject.productObject.foodid;
  let userCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
  let val = await itemsCollectionObj.findOne({foodid:idd})
  if(val.quantity===0){ 
    res.send({message:"Product Out of stock"})
}
else{
  let quant=(val.quantity) -1;
    let reduceProduct = await itemsCollectionObj.updateOne({foodid:idd},{$set:{quantity:quant}})
 // console.log(reduceProduct)
  if (userCartObj === null) {
          let products = [];
          products.push(newProdObject.productObject)
          let newUserCartObject = { username: newProdObject.username, products }
      await userCartCollectionObject.insertOne(newUserCartObject)
      let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
      res.send({ message: "New product Added", latestCartObj: latestCartObj })
  }
  else {
    //console.log(userCartObj)
const index = userCartObj.products.findIndex(object => {
 return object.foodid === idd;
});
if (index !== -1) {
userCartObj.products[index].foodcount ++ ;
}
else{
userCartObj.products.push(newProdObject.productObject)
}
         await userCartCollectionObject.updateOne({ username: newProdObject.username }, { $set: { ...userCartObj } })
         let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
         res.send({ message: "New product Added", latestCartObj: latestCartObj })       
  }
}
}))
userApi.get("/getproducts/:username", expressErrorHandler(async (req, res, next) => {

  let userCartCollectionObject = req.app.get("userCartCollectionObject")

  let un = req.params.username;
  let userProdObj = await userCartCollectionObject.findOne({ username: un })
  if (userProdObj.products.length === 0) {
      res.send({ message: "Cart-empty" })
  }
  else {
    
      res.send({ message: userProdObj })
  }

}))



userApi.get("/getorderdetails/:username", expressErrorHandler(async (req, res, next) => {

  let ordersCollectionObj = req.app.get("ordersCollectionObj")
   
  let un = req.params.username;
  let k=un.slice(4,10)
  let userProdObj = await ordersCollectionObj.findOne({ orderId: k })
  //console.log(userProdObj)
  res.send({message:userProdObj})

}))




userApi.post("/del-from-cart", expressErrorHandler(async (req, res, next) => {
  let itemsCollectionObj = req.app.get("itemsCollectionObj")
  let userCartCollectionObject = req.app.get("userCartCollectionObject")
  let newProdObject = req.body;
  let j=req.body.username
  let  i= req.body.item;
  let val = await itemsCollectionObj.findOne({foodid:i})
  let quant=(val.quantity) + 1;
  let reduceProduct = await itemsCollectionObj.updateOne({foodid:i},{$set:{quantity:quant}})
 let userCartObj = await userCartCollectionObject.findOne({ username: j })
 const index = userCartObj.products.findIndex(object => {
  return object.foodid === i;
 });
 if (index !== -1) {
  if(userCartObj.products[index].foodcount > 0){
  userCartObj.products[index].foodcount -- ;
  await userCartCollectionObject.updateOne({ username: j }, { $set: { ...userCartObj } })
  }
  if(userCartObj.products[index].foodcount === 0){
    let c= await userCartCollectionObject.updateOne( { "username": j }, { $pull: { "products": { "foodid": i } } } )
  
  }
}
let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
res.send({ message: " product deleted", latestCartObj: latestCartObj })  

}))






//export userApi
module.exports=userApi; 
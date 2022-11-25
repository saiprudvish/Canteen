const exp = require('express');

const path=require("path")
const app=exp();
app.use(exp.static(path.join(__dirname,"./dist/vnrcanteen/")))



//require("dotenv").config()
const userApi=require("./APIS/userApi")
app.use('/user',userApi)


const mc=require("mongodb").MongoClient

//connection string

//const databaseUrl = process.env.DATABASE_URL;
 const databaseUrl="mongodb+srv://prudvish_database:sai1234@cluster1.bxt0f.mongodb.net/vnrcanteen?retryWrites=true&w=majority"


//connect to DB
mc.connect(databaseUrl, {useNewUrlParser:true,  useUnifiedTopology: true}, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("vnrcanteen")
        //create collection object
    let  itemsCollectionObj= databaseObj.collection("itemscollection")
    let  ordersCollectionObj= databaseObj.collection("userorderscollection")
    let  userCartCollectionObject=databaseObj.collection("usercartcollection")
  
    app.set("userCartCollectionObject",userCartCollectionObject)
    
    app.set("ordersCollectionObj",ordersCollectionObj)
    app.set("itemsCollectionObj",itemsCollectionObj)


        console.log("connected to database")

    }
})



app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'dist/vnrcanteen/index.html'), function(err){
      if(err){
          res.status(500).send(err)
      }
  })
})

app.use((req, res, next) => {

  res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: `error is ${err.message}` })
})


//assign port
const port = 3000;
app.listen(port, () => console.log(`server on ${port}...`))

const express= require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");

const app =express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const itemsSchema= new mongoose.Schema(
  {
    name:String
  }
);
const Item =mongoose.model("Item",itemsSchema);
const  item1 =new Item (
  {
    name:"welcome to my to do list"

  }
);

const item2=new Item(
  {
    name:"hit the + button to add new item"
  }
);
const item3=new Item (
  {
    name:"<-- hit this to delet item"
    
  }
);
const defaultItem =[item1,item2,item3];
 Item.insertMany(defaultItem)
       .then(function () {
          console.log("Successfully saved defult items to DB");
    })
       .catch(function (err) {
         console.log(err);
     });
    //  Item.deleteMany({name :"<-- hit this to delet item"})
    //     .then(result => {
    //      console.log("delet successfuly");
    //    })
    //    .catch(err => {
    //       console.log(err);
    //    });

app.get("/", function(req,res){

  Item.find()
  .then(items => res.render("list", {listTitle:"Today" ,NewListItem:finditems}))
  .catch(error => console.error(error));

})


app.post("/", function(req,res){

let item = req.body.newItem;

if(req.body.list==="work"){
  workItems.push(item);
  res.redirect("/work");

}else{

  items.push(item);
  res.redirect("/");
}

});

app.get("/work", function(req,res){

res.render("list", {listTitle:"work list" , NewListItem:workItems});
});

app.get("/about", function(req,res){

res.render("about");
});

app.listen("3000", function(req,res){
  console.log("server is running on port 3000");
})

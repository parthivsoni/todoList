const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.1:27017/todoList");
const trySchema = new mongoose.Schema({
    name:String 
});
const item = mongoose.model("task",trySchema);
const todo_list = new item({
    name:"Create some videos"
});
// todo_list.save();

app.get("/", async (req, res) => {
    try {
      const foundItems = await item.find({});
      res.render("list", { dayej: foundItems });
    } catch (err) {
      console.log(err);
    }
  });

app.post("/", async (req,res)=>{
    const itemName =  await req.body.ele1;
    const todo4 = new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    const checked = req.body.checkbox1;
    try {
        await item.findByIdAndDelete(checked);
        console.log("Delete has been done");
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item");
    }
});

// app.post("/delete", async (req,res) => {
//     const checked = await req.body.checkbox1;
//     item.findByIdAndDelete(checked, (err) =>{
//         if(!err){
//             // confirm("Are you sure ? ")
//             console.log("Deleted");
//             res.redirect("/");
//         }
//     });
// });

app.listen("9000",function(){
    console.log("Server is running");
});

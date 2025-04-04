const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors())
app.use(express.json())
const mongoose = require('mongoose');
//Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection error", err));

// const inputArray=["Apple","Banana"]
//Model creation
const fruitlist = mongoose.model("list", { name: String }, "fruit")

app.get("/", (req, res) => {
    res.send("DB started")
})

app.post("/addfruit", (req, res) => {
    let newfruit = req.body.newfruit

    let addedfruit = new fruitlist({
        name: newfruit
    })
    addedfruit.save().then(() => { console.log("List updated") })
})
app.get("/fruits", (req, res) => {
    fruitlist.find().
        then((data1) => {

            res.send(data1)
        })

        .catch((error) => { console.log(error) })
})
app.delete("/deletefruit", (req, res) => {
    let { newfruit } = req.body;
    fruitlist.deleteOne({ name: newfruit })
        .then(() => {
            console.log(newfruit, "deleted");
            res.send({ message: "Deleted successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: "Failed to delete" });
        });
});

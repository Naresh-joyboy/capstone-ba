const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { UserModel,QueryModel1 } = require("./Employe");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET =
  "jdsudkdsid5841645488151646()jhudksdnkbsjcbdscds21c6ds4v6ds1vds15v4dsvndsdsoiods8789631450dcdudsnisasoduiypewfif";


mongoose
  .connect(
    "mongodb+srv://nareshpattss:nareshnew@newpro.tsklfpm.mongodb.net/?retryWrites=true&w=majority&appName=newpro",
  )

  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ email: user.email }, JWT_SECRET);
          res.json({
            success: true,
            data: {
              token,
              useremail: user.email
            }
          });
        } else {
          res.json({
            success: false,
            message: "The password is incorrect"
          });
        }
      } else {
        res.json({
          success: false,
          message: "No record existed"
        });
      }
    });
  });
  
app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then((students) => res.json(students) )
    .catch((err) => res.json(err,"register error"));
});

// --------------------Recquery.data------------------------------

app.get("/usersdet", (req, res) => {
    QueryModel1.find({})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.post("/userr", (req, res) => {
  req.body.ids = QueryModel1.length + 1;
  QueryModel1.create(req.body)
    .then((students) => res.json(students))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
  console.log("server is running");
});

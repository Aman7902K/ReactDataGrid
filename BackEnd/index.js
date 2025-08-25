const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2");
const con = require("./utils/createConnection");
const sampleData = require("./Data/bulk_data");
const cors = require("cors");
 
dotenv.config();
 
const port = 3000;
 
app.use(cors());
app.use(express.json());
 
 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE testDB", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   let sql = `CREATE TABLE customers (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name TEXT,
//         status VARCHAR(100),
//         amount DECIMAL(10,2),
//         date DATE)`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });
 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   let sql = "INSERT INTO customers (name, status, amount, date) VALUES ?";
//   con.query(sql, [sampleData], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
// });
 
app.get("/customers", (req, res) => {
    try {
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM customers", function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
            });
        });
    }catch(err){
        res.json(err);
    }
})
 
app.delete("/customers", (req, res) => {
    try {
        const ids = req.body.ids;
        console.log(ids);
        const q = `DELETE FROM customers WHERE id IN (${ids.join(",")})`;
 
        con.connect(function (err) {
            if (err) throw err;
            con.query(q, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
                res.json(result.affectedRows + " deleted succesfully!");
            });
        })
    } catch (err) {
        res.json(err);
    }
});
 
app.use("/",(req,res)=>{
    res.json({error : "Route not found"});
});
 
app.listen(port, () => {
    console.log("Connection successfully");
});
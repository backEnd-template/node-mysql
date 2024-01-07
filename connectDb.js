import mysql from "mysql";
import dotenv from "dotenv"

dotenv.config()

console.log('data base connection',process.env.DATABASE);
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-mysql",
})

con.connect((err) => {
    if (err) {
        console.log('error connecting',err);
    } else {
        console.log("connected");
    }
})


export default con
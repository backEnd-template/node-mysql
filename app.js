import Express from "express";
import con from "./connectDb.js";
import bcrypt from "bcrypt";

const app = Express();
app.use(Express.json());

app.post("/users", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";

    con.query(query, [req.body.username, hash], (err, result) => {
        res.status(200).json(result);
    })
})

app.get("/users", (req, res) => {
    const query = "SELECT * FROM users";

    con.query(query, (err, result) => {
        // NOTE: remove password from result

        for (let i = 0; i < result.length; i++) {
            delete result[i].password
        }

        res.status(200).json(result);
    })
})

app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
    const query = `SELECT * FROM users where id = ${req.params.id}`;

    con.query(query, (err, result) => {
        delete result[0].password
        res.status(200).json(result);
    })
})

app.patch("/users/:id", (req, res) => {
    const query = `UPDATE users SET username = '${req.body.username}' WHERE id = ${req.params.id}`;

    con.query(query, (err, result) => {
        res.status(200).json(result);
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})
const express = require('express')
const app = express()

const users = require('./MOCK_DATA.json')

const PORT = 3000

// GET request API
app.get("/api/users", ( req, res )=>{
    return res.json(users);
})

app.get("/users", ( req, res )=>{
    const html =    `
    <ul>
        ${ users.map( (user) => {
            return `<li> ${user["first_name"]} </li>`
        }).join("")}
    </ul>
    `
    return res.send(html);
})

// dynamic route for requests
app
.route("/api/users/:id")
.get((req, res)=>{
    const id = Number( req.params.id );
    console.log(id);
    return res.json(users[id-1]);
})
.post((req, res)=>{
    const id = Number( req.params.id );
    return res.json({ status : "pending"});
})
.patch((req, res)=>{
    const id = Number( req.params.id );
    return res.json({ status : "pending"});
})
.delete((req, res)=>{
    const id = Number( req.params.id );
    return res.json({ status : "pending"});
})



app.listen(PORT, ()=>{
    console.log("listening to port 3000"); 
})




const express = require('express')
const app = express()

const users = require('./MOCK_DATA.json')

const PORT = 3000

// GET request API
app.get("/users/api", ( req, res )=>{
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

app.listen(PORT, ()=>{
    console.log("listening to port 3000"); 
})




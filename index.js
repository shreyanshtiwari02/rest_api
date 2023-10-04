const express = require('express')
const app = express()
const  fs = require('fs')
const users = require('./MOCK_DATA.json')

const PORT = 3000

// Middlewares

app.use(express.urlencoded({ extended : false })) // puts the form data into the body

app.use((req,res, next)=>{

    console.log("hello from middleware one");
    console.log(req);
    // req[0].first_name = "shreyansh";
    next();
})
app.use((req,res, next)=>{
    // console.log(req);
    // next();
    return res.json({status : "returned from middleware 2"})
})

// end of middlewares


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
.post( "/api/users", (req, res)=>{
    // const id = Number( req.params.id );
    const body = req.body ;
    console.log(body); 
    users.push({...body , id: users.length+1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err, data)=>{
        return res.json({ status : "data is pushed successfully"});
    });
})

// dynamic route for requests
app
.route("/api/users/:id")
.get((req, res)=>{
    const id = Number( req.params.id );
    console.log(id);
    return res.json(users[id-1]);
})
.patch((req, res)=>{

    const oldId = Number( req.params.id );
    const body = req.body;
    body.id= oldId;

     users.forEach( (user,index) => {
        if(user.id === oldId){
            users[index] = body;
            return;
        }
    } )

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err, data)=>{
        return res.json({ status : "data is updated successfully"});
    });
 
})
.delete((req, res)=>{
    const id = Number( req.params.id );
    return res.json({ status : "pending"});
})



app.listen(PORT, ()=>{
    console.log("listening to port 3000"); 
})




const express = require("express");
const app = express();
const port = 3000;

const projects = []
var counter = 0

app.use(express.urlencoded({extended: false}))
    app.use(express.json())

app.use((req, res, next) => {
    counter+=1
    console.log("Foram feitas " + counter + " requisições")
    next()
})

app.use("/projects/:id", (req, res, next) => {
    var id = req.params.id
    for (var i = 0; i < projects.length; i++){
        if (projects[i].id == id){
            return next()
        }
    }
    return res.send("Erro id não existe");
})


app.get("/projects", (req, res) => {
    res.send(projects);
})

app.post("/projects", (req, res) => {
    res.send("OK")
    projects.push({
        id: req.body.id,
        title: req.body.title,
        tasks: []
    })
})

app.post("/projects/:id/tasks", (req, res) => {
    res.send("OK")
    var findId = req.params.id
    var task = req.body.title
    for (var i = 0; i < projects.length; i++){
        if (projects[i].id == findId){
            (projects[i].tasks).push(task)
        }
    }
})

app.put("/projects/:id", (req, res) => {
    res.send("OK")
    console.log("error3")
    var findId = req.params.id
    var newTitle = req.body.newTitle
    for (var i = 0; i < projects.length; i++){
        if (projects[i].id == findId){
            projects[i].title = newTitle
        }
    }
})

app.delete("/projects/:id", (req, res) => {
    res.send("OK")
    var findId = req.params.id
    for (var i = 0; i < projects.length; i++){
        if (projects[i].id == findId){
            projects.splice(i, 1)
        }
    }
})

app.listen(port, () => console.log("Listening to port " + port))
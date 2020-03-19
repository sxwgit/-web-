// 2020-03-19 19:21:29
// 手动实现简单的网页增删改查

const express = require("express");
const app = express();
const port = 3000;


const {
    getAllTodo,
    createTodo,
    getTodo,
    deleteTodo
}=require("./function")



app.get('/', (req, res) => res.send('Hello World'))

// 返回所有Todo任务
app.get("/api/tasks/",getAllTodo)
// 创建一个新的Todo任务
app.post("/api/tasks/",createTodo)
// 返回一个指定ID的Todo任务
app.get("/api/tasks/:id",getTodo)
// 删除一个Todo任务
app.delete("/api/tasks/:id",deleteTodo)

app.listen(port,function(req,res){
    console.log("Example app listening on port: "+port)
})


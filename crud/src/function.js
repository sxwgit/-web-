const fs = require("fs")
const path = require("path")

// 注意文件路径，
const fatherPath = path.resolve(__dirname, '..')
const file_path = fatherPath + "/data/todo.json";
// const file_path = __dirname+"/data/todo.json";

async function getAllTodo(req, res) {
    fs.readFile(file_path, function (err, data) {
        if (err) {
            console.log(err)
        }
        var result = JSON.parse(data)
        res.send(result)
    })
}


async function createTodo(req, res) {
    var newtodo = JSON.stringify(req.body)
    console.log(newtodo, 'nihao')
    fs.readFile(file_path, function (err, data) {
        if (err) {
            console.log("读取文件出错")
            console.log(err)
        }
        var data = JSON.parse(data)
        data.push(newtodo)
        var stringdata = JSON.stringify(data)
        fs.writeFile(file_path, stringdata, function (err) {
            if (error) {
                console.log(err)
            }
            console.log("新增成功：", stringdata)
        })
        res.send(data)
    })
}

async function getTodo(req, res) {
    var todoId = req.params.id
    var result = null
    fs.readFile(file_path, function (err, data) {
        if (err) {
            console.log(err)
        }
        var data = JSON.parse(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].id.toString() === todoId) {
                result = data[i]
                break
            }
        }
        if (result === null) {
            res.status(400).send()
        }
        else {
            res.status(201).send(result)
        }

    })
}

async function deleteTodo(req, res) {
    var todoId = req.params.id
    console.log(todoId)
    var flag = 0
    fs.readFile(file_path, function (err, data) {
        if (err) {
            console.log(err)
        }
        var data = JSON.parse(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].id.toString() === todoId) {
                // delete data[i]
                console.log(data[i])
                flag = 1
            }
        }
        console.log(data, 'data')
        var stringdata = JSON.stringify(data)
        console.log(stringdata, 'stringdata')
        fs.writeFile(file_path, stringdata, function (err) {
            if (err) {
                console.log(err)
            }
            console.log("删除成功：", stringdata)
        })
        if (flag === 0) {
            res.sendStatus(400).send()
        }
        else {
            res.sendStatus(201).send(stringdata)
        }

    })
}


exports.createTodo = createTodo
exports.getAllTodo = getAllTodo
exports.getTodo = getTodo
exports.deleteTodo = deleteTodo


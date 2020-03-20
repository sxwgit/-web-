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
    // req.body 是object，先转换成string类型
    var newtodo = JSON.stringify(req.body)
    // 在将string类型的body，转换成json类型
    var newtodo = JSON.parse(newtodo)
    var flag = 0
    if (newtodo == undefined){
        console.log("body未定义错误")
        res.status(400).send()
    }
    else{
        fs.readFile(file_path, function (err, data) {
            if (err) {
                console.log("读取文件出错")
                console.log(err)
            }
            var data = JSON.parse(data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === newtodo.id) {
                    flag = 1
                }
            }
            if (flag === 0){
                data.push(newtodo)
                var stringdata = JSON.stringify(data)
                fs.writeFile(file_path, stringdata, function (err) {
                    if (err) {
                        console.log(err)
                    }
                    console.log("新增成功")
                })
                res.status(201).send(data)
            }
            else{
                console.log("相同id，无法创建")
                res.status(400).send("can't create same id")
            }
            
        })
    }
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
            res.status(200).send(result)
        }

    })
}

async function deleteTodo(req, res) {
    var todoId = req.params.id
    var flag = 0
    fs.readFile(file_path, function (err, data) {
        if (err) {
            console.log(err)
        }
        var data = JSON.parse(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].id.toString() === todoId) {
                // delete data[i]
                data.splice(i,1)
                // console.log(data[i])
                flag = 1
            }
        }
        var stringdata = JSON.stringify(data)
        fs.writeFile(file_path, stringdata, function (err) {
            if (err) {
                console.log(err)
            }
            console.log("删除成功")
        })
        if (flag === 0) {
            res.status(400).send()
        }
        else {
            res.status(200).send(data)
        }

    })
}


exports.createTodo = createTodo
exports.getAllTodo = getAllTodo
exports.getTodo = getTodo
exports.deleteTodo = deleteTodo


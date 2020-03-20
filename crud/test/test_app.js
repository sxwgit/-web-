const {
    app
} = require('../src/app');
const request = require('supertest');


describe("test index page",function(){
    it("should return index page==>'Hello World'",function(done){
        request(app)
        .get("/")
        .expect(200)
        .expect('Hello World')
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    }
)})


// todo 同时执行return alltodo list 和create todo 会报错
// 简单来说，在return alltodo list测试中，得到的结果包含了create创建的todo
// create返回的结果中，todo被创建了两次
// todo @songxw 2020-03-20 10:28:57
// 大概找到了问题，应该是test的问题，在test的时候，后台会多次运行，所以会多次创建
describe("return all todo list",function(){
    it("should return all todo list",function(done){
        request(app)
        .get("/api/tasks")
        .expect(200)
        .expect(
            [
                {
                    "id": 1,
                    "content": "Restful API homework",
                    "createdTime": "2019-05-15T00:00:00Z"
                },
                {
                    "id": 2,
                    "content": "test basic function",
                    "createdTime": "2020-03-19 21:05:36"
                },
                {
                    "abc": 123,
                    "id": 9527
                }
            ]
        )
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    })
})


describe("return sometodo by id",function(){
    it("should return sometodo by request id",function(done){
        request(app)
        .get("/api/tasks/1")
        .expect(200)
        .expect(
            {
                "id": 1,
                "content": "Restful API homework",
                "createdTime": "2019-05-15T00:00:00Z"
            }
        )
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    })
})

describe("create a todo and return alltodo list with new todo",function(){
    it("should return all todo list with new todo",function(done){
        request(app)
        .post("/api/tasks")
        .send(
            {
                "id":2017,
                "name":"sxw"
            }
        )
        .expect(201)
        .expect(
            [
                {
                    "id": 1,
                    "content": "Restful API homework",
                    "createdTime": "2019-05-15T00:00:00Z"
                },
                {
                    "id": 2,
                    "content": "test basic function",
                    "createdTime": "2020-03-19 21:05:36"
                },
                {
                    "abc": 123,
                    "id": 9527
                },
                {
                    "id":2017,
                    "name":"sxw"
                }
            ]
        )
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    })
})


describe("create a todo with same id",function(){
    it("should return all todo list with new todo",function(done){
        request(app)
        .post("/api/tasks")
        .send(
            {
                "id":2017,
                "name":"sxw"
            }
        )
        .expect(400)
        .expect(
            "can't create same id"
        )
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    })
})

describe("delete the last todo list",function(){
    it("should return the old alltodo list",function(done){
        request(app)
        .delete("/api/tasks/2017")
        .expect(200)
        .expect(
            [
                {
                    "id": 1,
                    "content": "Restful API homework",
                    "createdTime": "2019-05-15T00:00:00Z"
                },
                {
                    "id": 2,
                    "content": "test basic function",
                    "createdTime": "2020-03-19 21:05:36"
                },
                {
                    "abc": 123,
                    "id": 9527
                }
            ]
        )
        .end(function(err,res){
            if (err){
                throw err;
            }
            done()
        })
    })
})

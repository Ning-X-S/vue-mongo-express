const models = require('./db').Login
const express = require('express')
const router = express.Router()
//const util = require("util")//可以使用 util.inspect 代替 JSON.stringify

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password
  })
  //查询该账号是否已经被注册
  models.count({"account": newAccount.account },(err,docs) => {
    if(err) {
      console.log("Error:" + err)
      res.send(err)
    }else {
      //console.log("Docs:" + docs)
      if(docs>=1){
        //账号已经被注册，注册失败，返回code = 2
        console.log("注册失败")
        res.send({code:2,msg:'账号已经存在了，不能再次注册'})
      }else{
        // 账号未注册,保存数据newAccount数据进mongoDB，注册成功,返回code=1
        newAccount.save((err, data) => {
          //console.log('set')
          if (err) {
            res.send(err)
          } else {
            console.log("注册成功")
            res.send({code:1,msg:'恭喜您，账号创建成功了'})
          }
        })
      }
    }
  })
});
// 删除账号接口
router.post('/api/login/deleteAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  //console.log("delete:" + req.body.account)
  //查询该账号是否已经注册
  models.count({"account": req.body.account },(err,docs) => {
    if(err) {
      console.log("Error:" + err)
      res.send(err)
    }else {
      //console.log("Docs:" + docs)
      if(docs>=1){
        // 若注册，在mongoDB中删除该条数据，返回code = -1
        models.remove({"account": req.body.account },(err) => {
          //console.log('delete')
          if (err) return handleError(err);
        });
        console.log("删除成功")
        res.send({code:-1,msg:'账号已被删除'});
      }else{
         // 若还未注册，删除失败,返回code = -2，
        console.log("删除失败")
        res.send({code:-2,msg:'账号还未注册，不能删除'});
      }
    }
  })
});
// 登录接口
router.post('/api/login/loginAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password
  })
  console.log("login:" + req.body.account)
  console.log(newAccount)
 //查询该账号是否存在
  models.findOne({"account": req.body.account },(err,docs) => {
    if(err) {
      console.log("Error:" + err)
      res.send(err)
    }else {
      console.log("Docs:" + docs)
      if(!docs == ""){
        // 若存在，再验证账号密码是否正确
        //console.log('该验证账号和密码是否正确了')
        if(docs.account === newAccount.account && docs.password === newAccount.password ){
          // 登录成功，返回code = 1
          console.log('登录成功')
          //可以使用 util.inspect 代替 JSON.stringify
          //res.send(util.inspect(res,{depth:null}))
          res.send({code:1,msg:'恭喜你，登录成功了'})
        }else {
          // 登录失败，密码错误，返回code = -1
          console.log({status:'登录失败', msg :'密码错误'})
          res.send({code:-1,msg:'密码错误，请重新输入'})
        }
      }else{
        // 若不存在，登录失败，返回code = -2
        console.log({status:'登录失败', msg :'账号不存在'})
        res.send({code:-2,msg:'账号不存在，请先注册账号'})
      }
    }
  })
});
// 更新密码接口
router.post('/api/login/updatedAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password,
    newPassword: req.body.newPassword
  })
  console.log("login:" + req.body.account)
  console.log(newAccount)
 //查询该账号是否存在
  models.findOne({"account": req.body.account },(err,docs) => {
    if(err) {
      console.log("Error:" + err)
      res.send(err)
    }else {
      console.log("Docs:" + docs)
      let currId = docs._id
      if(!docs == ""){
        // 若存在，再验证账号密码是否正确
        //console.log('该验证账号和密码是否正确了')
        if(docs.account === newAccount.account && docs.password === newAccount.password ){
          // 登录成功
          console.log('登录成功')
          //判断新密码是否与旧密码一致
          if(docs.password === newAccount.newPassword) {
            //更新密码失败，新密码与旧密码一致，不能修改，返回code = -1
            res.send({code:-1,msg:'修改密码失败，新密码与旧密不能一致'})
          }else {
            models.update({_id:currId},{password:newAccount.newPassword},(err) => {
              if(err){
                console.log(err);
              }else{
                console.log("更新密码成功");
                res.send({code:1,msg:'恭喜你，密码更新成功了'})
              }
            })
          }
        }else {
          // 更新密码失败，密码错误，返回code = -2
          console.log({status:'更新密码失败', msg :'密码错误'})
          res.send({code:-2,msg:'登录密码错误，不能修改密码'})
        }
      }else{
        // 若不存在，登录失败，更新密码失败，返回code = -3
        console.log({status:'登录失败', msg :'账号不存在'})
        res.send({code:-3,msg:'账号不存在，请先注册账号'})
      }
    }
  })
});
// 更改密码接口
module.exports = router

const models = require('./db').Infor
const express = require('express')
const router = express.Router()

router.get('/infor/infor/searchInfor', (req, res) => {
    //查询该账号下的数据
  models.findOne({"account": req.query.account },(err,docs) => {
    console.log("Docs:" + docs.account)
    if(err) {
      console.log("Error:" + err)
      res.send(err)
    }else {
      res.send({
          code:1,
          msg:"成功",
          data:{
            account: docs.account,
            name: docs.name,
            description: docs.description,
            signature: docs.signature,
            friend:docs.friend
          }
      })
    }
  })
});

module.exports = router

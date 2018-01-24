<template>
  <div class="hello">
    <el-form :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="userName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input type="password" v-model="newPassword" auto-complete="off" placeholder="新密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="loginAccount">登录</el-button>
        <el-button type="primary" style="width:100%;" @click="createAccount">注册</el-button>
        <el-button type="primary" style="width:100%;" @click="deleteAccount">删除</el-button>
        <el-button type="primary" style="width:100%;" @click="updatedAccount">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      userName: '',
      password: '',
      newPassword: '',
      rules: {
        username: [
          {required: false, message: '请输入账号', trigger: 'blur'},
          //{ validator: validaePass }
        ],
        password: [
          {required: false, message: '请输入密码', trigger: 'blur'},
          //{ validator: validaePass2 }
        ],
        newPassword: [
          {required: false, message: '请输入新密码', trigger: 'blur'},
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    }
  },
  methods: {
    createAccount() {
      let params = {
        account : this.userName,
        password : this.password
      }
      if( params.account === "" || params.password === "") {
        alert("账号和密码不能为空!")
        return false
      }
      console.log(params)
      this.$http.post('http://localhost:8088/api/login/createAccount',params)
          .then((response) => {
            let res = response.data
            console.log(res)
            alert(res.msg)
          })
          .catch((reject) => {
            console.log(reject)
          })
    },
    deleteAccount() {
      let params = {
        account : this.userName,
        password : this.password
      }
      if( params.account === "" || params.password === "") {
        alert("账号和密码不能为空!")
        return false;
      }
      console.log(params)
      this.$http.post('http://localhost:8088/api/login/deleteAccount',params)
          .then((response) => {
            let res = response.data
            //console.log(params)
            console.log(res)
            alert(res.msg)
          })
          .catch((reject) => {
            console.log(reject)
          })
    },
    loginAccount() {
      let params = {
        account : this.userName,
        password : this.password
      }
      if( params.account === "" || params.password === "") {
        alert("账号和密码不能为空!")
        return false;
      }
      this.$http.post('http://localhost:8088/api/login/loginAccount',params)
          .then((response) => {
            let res = response.data
            console.log(res)
            alert(res.msg)
            console.log()
            if(res.code == 1){
               this.$router.push({ path: '/home' });
            }
          })
          .catch((reject) => {
            console.log(reject)
          })
    },
    updatedAccount() {
      let params = {
        account : this.userName,
        password : this.password,
        newPassword : this.newPassword
      }
      if( params.account === "" || params.password === "") {
        alert("账号和密码不能为空!")
        return false;
      }
      if( params.newPassword === "" ) {
        alert("新密码不能为空!")
        return false;
      }
      this.$http.post('http://localhost:8088/api/login/updatedAccount',params)
          .then((response) => {
            let res = response.data
            console.log(res)
            alert(res.msg)
          })
          .catch((reject) => {
            console.log(reject)
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/   
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  button {
    margin: 20px 0 0 0 ;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
</style>

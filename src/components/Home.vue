<template>
    <el-row class="container">
        <el-col :span="24" class="topbar-wrap">
            <div class="topbar-title topbar-btn">
                <h1>首页</h1>
                <span>{{infor.name}}</span>
                <span>{{infor.description}}</span>
                <span>{{infor.signature}}</span>
                <dl>
                    <dt>好友列表</dt>
                    <dd v-for="item in infor.friend" :key="item.id">{{item}}</dd>
                </dl>
            </div>
        </el-col>  
        </el-row>
</template>
<script>
export default {
  name:"container",
  data (){
      return {
          infor:""
      }
  },
  beforecreate: function(){
      alert("正在刷新中")
  },
  created: function(){
      this.$http.get("http://localhost:8088/infor/infor/searchInfor?account=liuxingwei")
        .then((response) => {
            let res = response.data
            console.log(res)
            this.infor = res.data
            //console.log(this.infor)
        })
        .catch((reject) => {
            console.log(reject)
        })
  }
}
</script>
<style scoped>
span{
    display: block;
}
dd {
    margin: 0;
}
</style>

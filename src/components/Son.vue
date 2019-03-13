<template>
  <el-row class="container">
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-title topbar-btn">
        {{num}}{{nums}}
      </div>
    </el-col>  
  </el-row>
</template>
<script>
export default {
  name: "container",
  data (){
    return {
      infor: ''
    }
  },
  beforecreate: function(){
    alert("正在刷新中")
  },
  computed: {
    num() {
      return this.$store.state.changableNum
    },
    nums() {
      return this.$store.state.cart.changableNum
    }
  },
  created: function(){
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

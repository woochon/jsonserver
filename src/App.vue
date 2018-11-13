<template>
  <div id="app">
    <button @click="get">发送请求获取数据</button>
    <button @click="add">发送请求添加数据</button>
    <button @click="update">发送请求修改数据</button>
    <button @click="remove">发送请求删除数据</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    get(){
      console.log('获取数据');
      this.$axios({
        method:'get',
        url:'api/list'
      }).then(
        res=>{
          console.log(res);
        }
      ).catch(
        err=>{
          console.log(err);
        }
      );
    },
    add(){
      console.log('添加数据');
      this.$axios({
        method:'post',
        url:'api/product',
        params:{
          id:4,
          price:5,
          productName:'乐虎',
          descript:'kangpilao'
        }
      }).then(
        res=>{
          console.log(res);
        }
      ).catch(
        err=>{
          console.log(err);
        }
      );

    },
    update(){
      console.log('修改数据');
      this.$axios({
        method:'put',
        url:'api/list/4',
        params:{
          name:'哈哈',
          link:'www.taobao.com'
        }
      }).then(
        res=>{
          console.log(res);
        }
      ).catch(
        err=>{
          console.log(err);
        }
      );
    },
    remove(){
      console.log('移除数据');
      this.$axios({
        method:'delete',
        url:'api/list/7',
      }).then(
        res=>{
          console.log(res);
        }
      ).catch(
        err=>{
          console.log(err);
        }
      );
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// elemnt-ui
import ElementUI from "element-ui"; //新添加
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import scroll from "@/directives/scroll";

Vue.use(ElementUI); //新添加

//跨组件通讯
let bus = new Vue();
Vue.prototype.bus = bus;

export default {
  name: "App",
};
</script>

<style>
* {
  box-sizing: border-box;
  padding:0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 5px; */

  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */

  height:100%;
}
</style>
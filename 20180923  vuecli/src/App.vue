<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import setting from "@/common";
console.log(setting);
export default {
  name: "App"
};

</script>

<style lang='scss'>
@import "@/sass/test2.scss";
</style>
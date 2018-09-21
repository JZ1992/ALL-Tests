<template>
    <div class="layout-main">
        <div class="lm-box">
            <router-view></router-view> 
        </div>
    </div>
</template>
<style>
.layout-main {
  width: 100%;
  height: 100%;
  background-color: #ebefef;
  position: relative;
}
.lm-box {
  position: absolute;
  top: 16px;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: #fff;
  border-radius: 4px;
}

/* .layout-main {
  box-shadow: 0 0 8px 0 rgba(40, 64, 80, 0.08);
  border-radius: 4px;
  margin: 16px;
  background: #fff;
  width: 100%;
} */
</style>
<script>
export default {};
</script>

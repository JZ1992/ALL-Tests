<template>
    <div class="layout-header"> 
        <slot></slot>
    </div>
</template>
<script>
export default {};
</script>
<style>
    .layout-header{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 64px;
         border-bottom: 1px solid #ebefef;
    }
</style>


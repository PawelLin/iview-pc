<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less">
.size{
    width: 100%;
    height: 100%;
}
html,body{
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#app {
    .size;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>

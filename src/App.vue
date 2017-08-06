<template>
    <div id="app">
        <top></top>
        <foot></foot>
    </div>
</template>

<script>

    import top from './components/top.vue'
    import foot from './components/foot.vue'

    export default {
        name: 'app',
        components: {
            top,
            foot
        }
    }
</script>

<style>
    @import './style/common.css';
    #app {
        float: left;
        width: 100%;
    }
</style>
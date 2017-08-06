<template>
    <div>
        <div class="m-top">
            <div class="wrap">
                <h1 class="logo">
                    <a href="/#">wangyi yun yinyue</a>
                </h1>
                <ul class="m-nav j-tflag">
                    <li class="fst">
                        <span v-on:click="isSubNav=false">
                            <a class="z-slt"><em>fa xian yinyue</em><sub class="cor"></sub> </a>
                        </span>
                    </li>
                    <li>
                        <span v-on:click="isSubNav=true">
                            <!--todo: get api result-->
                        </span>
                    </li>
                    <li>
                        <span>
                            <a href="#"><em>peng you</em><sub class="cor"></sub><i class="dot u-icn u-icn-68 f-alpha j-t" style=""></i> </a>
                        </span>
                    </li>
                    <li>
                        <span>
                            <a href="#" target="_blank"><em>shang cheng</em></a>
                        </span>
                    </li>
                </ul>
                <a class="m-msg f-pr j-tflag" href="#">
                    <i class="bub -u-bub"></i>
                </a>
                <div class="m-srch f-pr j-suggest" id="g_search">
                    <div class="srchbg">
                        <span class="parent">
                            <input type="text" class="txt j-flag" style="..." value="lijian">
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-subnav m-subnav-up f-pr j-tflag" v-if="isSubNav">
            <div class="shadow"></div>
        </div>
        <div class="m-subnav j-tflaf">
            <div class="wrap f-pr">
                <ul class="nav">
                    <li><a><em>tuijian</em></a></li>
                    <li><a><em>paihangban</em></a></li>
                    <li>
                        <!--todo: gei api result-->
                    </li>
                    <li><a><em>zhu bo dian tai</em></a></li>
                    <li>
                        <!--todo: get api result-->
                    </li>
                    <li><a><em>ge shou</em></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'top',
        data() {
            return {
                msg: 'this is the header of demo',
                isSubNav: false
            }
        }
    }
</script>

<style scoped>
    .m-top{
        height: 70px;
        background-position: 0 -80px;
        background-repeat: repeat-x;
    }
    .wrap{
        width:1100px;
        margin:0 auto;
    }
    .m-top .logo {
        float: left;
        width: 176px;
    }
    .m-top .logo a {
        float: left;
        width: 157px;
        height: 33px;
        padding: 22px 20px 0 0;
        background-position: 0 15px;
        text-indent: -9999px;
    }
    .m-nav {
        float: left;
    }
    .m-nav li {
        position: relative;
        background-position: right -300px;
    }
    .m-nav li, .m-nav li span, .m-nav a, .m-nav a em {
        float: left;
        height: 70px;
        font-size: 14px;
    }
    .m-nav a {
        position: relative;
        padding-left: 2px;
        text-align: center;
        line-height: 76px;
    }
    .m-nav a em {
        padding: 0 20px 0 18px;
        overflow: hidden;
        color: #ccc;
        text-shadow: 0 1px 0 #1b1b1b;
        cursor: pointer;
    }
    .m-nav a.z-slt {
        position: relative;
        margin: 0 -1px;
        background-position: left -155px;
    }
    .m-nav a.z-slt em {
        padding: 0 21px 0 19px;
        background-position: right -155px;
    }
    .m-nav .cor {
        display: none;
    }
    .m-nav a.z-slt .cor {
        display: block;
        position: absolute;
        left: 50%;
        top: 63px;
        width: 14px;
        height: 9px;
        margin-left: -7px;
        overflow: hidden;
        background-position: -226px 0;
    }
    .m-msg {
        position: relative;
        float: right;
        width: 34px;
        height: 28px;
        margin: 17px 0 0 20px;
        background-position: 0 -49px;
    }
    .m-msg .bub {
        position: absolute;
        top: 0;
        right: 0;
    }
    .u-bub {
        display: block;
        position: relative;
        zoom: 1;
        width: 22px;
        height: 22px;
        color: #fff;
        text-align: center;
        line-height: 23px;
        font-weight: bold;
    }
    .m-srch .srchbg {
        margin-top: 21px;
        background-position: 0 -550px;
    }
    .m-srch, .m-srch .srchbg {
        float: right;
        width: 210px;
        height: 31px;
    }
    .m-srch .parent {
        display: block;
        position: relative;
        margin: 8px 0 0 33px;
    }
    .m-srch .parent input {
        width: 90%;
        margin: 0;
        padding: 0;
        background: transparent;
        color: #fff;
        outline: none;
    }
    .m-srch .parent input {
        color: #333;
    }
    .m-subnav {
        z-index: 90;
        height: 35px;
        background-position: 0 -230px;
        background-repeat: repeat-x;
    }
    .m-subnav-up {
        height: 5px;
        overflow: hidden;
    }
    .m-subnav .wrap {
        width: 911px;
        padding-left: 168px;
        margin: 0 auto;
    }
    .f-pr {
        position: relative;
        zoom: 1;
    }
    .m-subnav .nav li {
        display: inline;
        margin: 0 17px;
    }
    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {
        float: left;
        height: 35px;
        overflow: hidden;
    }
    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {
        float: left;
        height: 35px;
        overflow: hidden;
    }
    .m-subnav .nav a {
        padding-left: 14px;
    }
    .m-subnav .nav a:hover, .m-subnav .nav a.z-slt {
        background-position: left -268px;
    }
    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {
        float: left;
        height: 35px;
        overflow: hidden;
    }
    .m-subnav .nav em {
        padding-right: 14px;
        line-height: 37px;
        color: #fff;
        text-shadow: 0 1px 0 #650303;
    }
    .m-subnav .nav a:hover em, .m-subnav .nav a.z-slt em {
        background-position: right -268px;
    }
</style>
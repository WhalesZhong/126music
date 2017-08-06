import Vue from 'vue'
import App from './App.vue'

function main() {
    var element = document.createElement("div");
    element.classList.add("app");
    return element;
}

document.body.appendChild(main());

/* eslint-disable no-new */
window.vm=new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
});
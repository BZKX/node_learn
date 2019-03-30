import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/display.css';
//日历插件
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'

//引入全局样式
import './assets/css/base.scss'

Vue.use(vueEventCalendar, {locale: 'zh'}) //可以设置语言，支持中文和英文

Vue.config.productionTip = false;
Vue.use(VueAxios,axios);
// axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

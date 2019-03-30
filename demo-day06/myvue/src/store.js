import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        options: [{
            value: "所有分类",
            label: '所有分类'
        }, {
            value: "日记",
            label: '日记'
        }, {
            value: "生活",
            label: '生活'
        }, {
            value: "科技",
            label: '科技'
        }],
        value: "所有分类",
        postList:[],
        postDetail:{},
        showMd: false,
        backbtn:false,
        aboutinfo:false
},
    mutations: {},
    actions: {
        // test(value) {
        //     // console.log(this);
        //     // console.log(value);
        //     this.postList = [];
        //     // console.log(this.value);
        //     setTimeout(() => {
        //         this.axios.get('/getPosts', {
        //             params: {
        //                 pageIndex: 1,
        //                 pageSize: 10,
        //                 category: "'" + value + "'",
        //                 status: "'所有状态'"
        //             }
        //         }).then(data => {
        //             console.log(data.data.data);
        //             data.data.data.forEach(function (item, index) {
        //                 // 创建时间截取,只显示日期
        //                 return item.created = item.created.slice(0, 10);
        //             });
        //             this.$store.state.value = value;
        //             this.postList = data.data.data
        //         })
        //     }, 1000)
        // },
    }
})

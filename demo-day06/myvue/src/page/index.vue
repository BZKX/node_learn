<template>
    <div id="app">
    <el-container >
        <el-aside class="pc-aside-left hidden-xs-only">
            <div class="tit">
                <a href="/">朱某人<br><span>的博客</span></a>
            </div>
            <el-input placeholder="请输入关键字" v-model="search" @keyup.enter="searchPost" class="input-with-select">
                <el-button slot="append" @click="searchPost" icon="el-icon-search"></el-button>
            </el-input>
            <ul class="pc-nav" type="flex">
                <li>
                    <a href="JavaScript: void (0)" @click="test('所有分类')" class="list">文章</a>
                </li>
                <li><a class="list" target="_blank" href="https://github.com/BZKX">GitHub</a></li>
                <li>
                    <a href="JavaScript: void (0)" @click="showAbout" class="list">About Me</a>
                </li>
            </ul>
            <el-select @change="test(value)" v-model="value">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    <!--<router-link to="'/postList/'" @click="test(item.value)">{{item.value}}</router-link>-->
                </el-option>
            </el-select>
            <div class="loginbtn">
                <el-button size="mini">管理员登录</el-button>
            </div>
        </el-aside>
        <el-container>
            <div class="nav-mob hidden-sm-and-up">
                <input v-model="search" @keyup.enter="searchPost" class="searchBar" placeholder="请输入内容">
                <el-button round type="info" size="small" href="#" class="list" @click="searchPost">搜索</el-button>
            </div>
            <el-header class="content-header" height="40px">
                <i class="Picon el-icon-location"></i>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                        <a @click="test(value)"
                           href="javascript:void (0)">{{value}}</a>
                </el-breadcrumb>
                <el-dropdown @command="test" class="list-mob hidden-sm-and-up" trigger="click">
                    <span class="el-dropdown-link">
                        筛选<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in options"
                                          :command='item.value'>
                            {{item.value}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--浮动反悔按钮(仅在文章页面是显示)-->
                <transition name="back-btn">
                    <el-button @click="test(value)" class="bcbtn" v-show="this.$store.state.backbtn" type="info" circle><i class="el-icon-back"></i></el-button>
                </transition>
            </el-header>
            <el-main id="box" style="padding-top: 0">
                <postlist></postlist>
            </el-main>
        </el-container>
        <el-aside class="pc-aside hidden-md-and-down">
            <p>朱某人的日历</p>
            <vue-event-calendar style="width: 100%" :events="demoEvents" @monthChanged="" @dayChanged=""></vue-event-calendar>
        </el-aside>
    </el-container>
    </div>
</template>

<script>
    import IndexHeader from '../components/index/header.vue'
    import postlist from './postList.vue'


    // import store from "../store";

    //初始化
    export default {
        name: 'index',
        // store,
        data() {
            return {
                //日历插件
                demoEvents: [{
                    date: '2019/3/27',
                    title: '浦发面试',
                    desc: '参加浦发银行面试,地点:成都.时间:下午3.30分',
                },{
                    date: '2019/4/15',
                    title: '返校',
                    desc:'返校做毕业设计'
                }],
                //选项(分类)列表
                options: this.$store.state.options,
                //选取的类别
                value: this.$store.state.value,
                //文章列表
                postList: this.$store.state.postList,
                //搜索内容
                search: '',
            }
        },
        components: {
            IndexHeader,
            postlist,
        },
        created: function () {
            this.axios.get('/getPosts', {
                params: {
                    pageIndex: 1,
                    pageSize: 10,
                    category: "'所有分类'",
                    status: "'所有状态'"
                }
            }).then(data => {
                data.data.data.forEach(function (item, index) {
                    // 创建时间截取,只显示日期
                    return item.created = item.created.slice(0, 10);
                });
                this.$store.state.postList = data.data.data;

            })
        },
        methods: {
            showAbout(){
                //about清空
                this.$store.state.aboutinfo = true;
                //清空列表
                this.$store.state.postList = [];
                //文章内容清除
                this.$store.state.showMd = false;
                //返回按钮出现
                this.$store.state.backbtn = true;
            },
            openInfoNoPosts(){
                this.$notify({
                    title: 'Sorry',
                    offset: 200,
                    message: '没有找到相关文章',
                    type: 'warning'
                });
            },
            searchPost() {
                //about清空
                this.$store.state.aboutinfo = true;
                //清空列表
                this.$store.state.postList = [];
                //文章内容清除
                this.$store.state.showMd = false;
                //返回按钮隐藏
                this.$store.state.backbtn = false;
                setTimeout(() => {
                    this.axios.get('/search', {
                        params: {
                            like: this.search
                        }
                    }).then(data => {
                        // console.log(data.data);
                        //未找到内容,提示
                        if (data.data.length===0){
                            this.openInfoNoPosts();
                            return
                        }
                        //成功获取到内容,清空搜索框
                        this.search = '';
                        data.data.forEach(function (item, index) {
                            // 创建时间截取,只显示日期
                            return item.created = item.created.slice(0, 10);
                        });
                        //将内容加到列表
                        this.$store.state.postList = data.data
                    })
                }, 600)
            },
            test(value) {
                // alert(1)
                // console.log(this);
                // console.log(value);
                // console.log(value);
                //about清空
                this.$store.state.aboutinfo = false;
                this.$store.state.postList = [];
                //文章内容清除
                this.$store.state.showMd = false;
                //返回按钮隐藏
                this.$store.state.backbtn = false;
                // console.log(this.value);
                setTimeout(() => {
                    this.axios.get('/getPosts', {
                        params: {
                            pageIndex: 1,
                            pageSize: 10,
                            category: "'" + value + "'",
                            status: "'所有状态'"
                        }
                    }).then(data => {
                        // console.log(data.data.data);
                        data.data.data.forEach(function (item, index) {
                            // 创建时间截取,只显示日期
                            return item.created = item.created.slice(0, 10);
                        });
                        this.$store.state.value = value;
                        this.value = this.$store.state.value;
                        this.$store.state.postList = data.data.data
                    })
                }, 600)
            },

            //动画钩子
            //动画结束后移出属性
            afterEnter(el) {
                el.style = '';
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/common.less';
    @import '../style/list.less';
    @import "../style/layoutAside";

    #app {
        font-family: '幼圆', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 90%;
        margin: 20px auto 0;
        color: #2c3e50;
        height: 100%;
    }

    @media screen and (max-width: 768px) {
        #app {
            width: 100%;
        }
    }

    .el-container{
        height: 100%;
        .el-aside{
            height: 90%;
        }
    }

    /*隐藏滚动条-*/
    #box::-webkit-scrollbar {
        display: none;
    }

    /*返回按钮*/
    .back-btn-enter-active,
    .back-btn-leave-active{
        transition: all 1s;
    }

    .back-btn-enter{
        opacity: 0;
        transform: translateX(20px);
    }

    .back-btn-leave-to{
        opacity: 0;
        transform: translateX(20px);
    }

    .bcbtn{
        float: right;
        width: 30px;
        height: 30px;
        margin-top: 5px;
        .el-icon-back{
            float: right;
            margin-right: -6px;
            margin-top: -4px;
        }
    }

</style>
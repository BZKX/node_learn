<template>
    <div class="header">
        <el-row class="nav-pc-title hidden-xs-only">
            <el-col class="title" :span="22">
                <a class="tit" href="/"><span>朱</span>某人的博客</a>
            </el-col>
            <el-col class="title" :span="2">
                <router-link class="login" to="/login">登录</router-link>
            </el-col>
        </el-row>
        <el-row class="nav-pc-list hidden-xs-only" type="flex" justify="center">
            <el-col class="pc-nav" :span="3">
                <router-link to="/post" class="list">文章</router-link>
            </el-col>
            <el-col class="pc-nav" :span="3"><a class="list" href="https://github.com/BZKX">GitHub</a></el-col>
            <el-col class="pc-nav" :span="3">
                <router-link to="/about" class="list">About Me</router-link>
            </el-col>
        </el-row>
        <el-row class="nav-mob hidden-sm-and-up">
            <el-col class="title" :span="20"><input v-model="search" @keyup.enter="searchPost" class="searchBar"
                                                    placeholder="请输入内容">
            </el-col>
            <el-col class="title" :span="4"><a href="#" class="list" @click="searchPost">搜索</a></el-col>
            <el-col :span="24"></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index-header",
        data() {
            return {
                search: ''
            }
        },

        methods: {
            searchPost(e) {
                e.preventDefault();
                // alert(1);
                if (this.search === '') {
                    this.$notify.error({
                        position: 'top-left',
                        title: '错误',
                        message: '请输入内容',
                        offset: 80
                    });
                    return false;
                }
                this.axios.get('/getPosts',{
                    params: {
                        pageIndex:1,
                        pageSize:10,
                        category:"'所有分类'",
                        status:"'所有状态'"
                    }
                }).then(function (data)  {
                    console.log(data);
                })
            }
        }

    }
</script>

<style lang="less" scoped>

    * {
        margin: 0;
        padding: 0;
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    body, html {
        background-color: #f1f1f1;
    }

    .header {

        .nav-pc-title {
            opacity: .9;
            background-color: #26272b;

            .title {
                .login {
                    padding: 4px 4px 0 0;
                    float: right;
                    text-decoration: none;
                    font-family: "幼圆", serif;
                    color: #dddddd;
                    font-size: 14px;
                }

                .tit {
                    display: block;
                    margin: 30px 0 0 20px;
                    text-decoration: none;
                    font-family: "幼圆", serif;
                    color: #dddddd;
                }

                display: block;
                height: 180px;
                font-size: 26px;

                span {
                    font-size: 36px;
                    padding: 4px;
                }
            }
        }

        .nav-pc-list {
            background-color: #26272b;
            opacity: .9;
            width: 100%;

            .pc-nav {
                margin: 0 80px;
            }

            .list {
                display: block;
                text-decoration: none;
                font-family: "幼圆", serif;
                color: #dddddd;
                font-size: 18px;
                line-height: 32px;
                text-align: center;
            }
        }

        .nav-mob {
            background-color: #26272b;

            .title {
                display: block;
                height: 40px;

                .searchBar {
                    width: 100%;
                    height: 100%;
                    outline-style: none;
                    box-sizing: border-box;
                    border: none;
                    font-size: 16px;
                    padding-left: 22px;
                    color: #f1f1f1;
                    background-color: #45474d;
                }
            }

            .list {
                padding: 0 4px;
                display: block;
                text-decoration: none;
                font-family: "幼圆", serif;
                color: #dddddd;
                font-size: 14px;
                line-height: 40px;
                text-align: center;
            }
        }

    }
</style>
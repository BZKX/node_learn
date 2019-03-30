<template>
    <transition-group
            name="list"
            tag="ul"
            style="height: 100%"
    >
        <li
                :key="item.id"
                class="list-box"
                v-for="(item,index) in this.$store.state.postList">
            <el-card shadow="hover"
                     :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                    <p><a href="JavaScript:void(0)" @click="getPostDetail(item.id)">{{item.title}}</a>
                    </p>
                    <div class="bottom clearfix">
                        <div class="category">
                            <span>分类:</span>
                            <el-button type="text" class="button">{{ item.name }}</el-button>
                        </div>
                        <time class="time">创建于: <span>{{ item.created }}</span></time>
                    </div>
                </div>
            </el-card>
        </li>
        <div key="post" v-show="this.$store.state.showMd" class="mavonEditor">

            <mavon-editor :toolbarsFlag='false'
                          :subfield="false"
                          :editable="false"
                          defaultOpen="preview"
                          v-model="handbook"/>
        </div>
        <about v-show="this.$store.state.aboutinfo" key="about"/>
    </transition-group>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import about from '../views/About.vue'

    export default {
        name: "postList",
        data() {
            return {
                handbook: ``,
                // postList:this.$store.state.postList,
            }
        },
        components: {
            mavonEditor,
            about
        },
        created() {
            // console.log(this.$store.state.postList);
        },
        methods: {
            getPostDetail(id) {
                this.$store.state.postList = [];
                this.handbook = '';
                this.$store.state.backbtn = true;
                setTimeout(() => {
                    this.axios.get('/getPostDetail', {
                        params: {
                            id: id
                        }
                    }).then(data => {
                        console.log(data.data);
                        this.$store.state.postDetail = data.data;
                        this.handbook += `# ${data.data.title}
    ${data.data.content}`;
                        this.$store.state.showMd = true;
                    })
                }, 400)
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/common.less';
    @import '../style/list.less';
    /*隐藏滚动条-*/
    #box::-webkit-scrollbar {
        display: none;
    }

    .editor {
        display: none;
    }

    /*加载动画*/
    .post-enter-active,
    .list-enter-active {
        transition: all 1s;
    }

    .post-leave-active,
    .list-leave-active {
        transition: all .4s;
    }

    .post-enter,
    .list-enter {
        opacity: 0;
        transform: translateX(100px);
    }

    .post-leave-to,
    .list-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }

    .mavonEditor {
        padding-top: 15px;
        width: 100%;
        height: 96%;
        border-bottom: #2c3e50 dashed 1px;
        overflow-x: hidden;

        .v-note-wrapper {
            height: 100%;
        }
    }


</style>
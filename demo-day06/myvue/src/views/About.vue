<template>
    <div class="mavonEditor">
      <mavon-editor :toolbarsFlag='false'
                    :subfield="false"
                    :editable="false"
                    defaultOpen="preview"
                    v-model="handbook"/>
    </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    data() {
      return {
        value:'',
        handbook:
                `# 我的简历 ...((/- -)/ 求职中...
### 姓名: 朱珂欣(男)
#### 学校: 洛阳理工学院(毕业时间:2019年6月)
> ### 求职意向
	Web前端开发,软件开发
> ### 教育背景
	2015-2019 洛阳理工学院 物联网工程(本科)
	主修课程： 高级语言程序设计、数据结构、Java语言与面向对象程序设计、
	JavaScript程序设计、Linux系统应用、无线通信技术、Zigbee技术。
> ### 校内实践
 #### 2017.10—2018.01	  “华为杯”物联网技术大赛     队长
	> 通过开发板设计智能机房控制系统，出色的完成“华为杯”物联网技术大赛竞
	赛。
#### 2017.10—2018.01    大学生创新创业软件设计大赛   队员
	> 与队员一起通过java开发设计多功能工具集，实现科学计算器、实时汇率、
	编码转换等常用功能。
#### 2018.5				河南省第十一届ACM大学生程序设计竞赛
	> 与小组一同代表我校参加河南省第十一届ACM大赛
> ### 实习经历
#### 2018.08-2018.08    中国国际智能产业博览会    腾讯展厅
	> 在博览会期间，本人主要负责腾讯展厅智能支付展台和大数据展台的讲解和维护工作。
> ### 项目实践
#### 2018.7-至今---个人博客网站搭建
	> 该项目主要完成个人博客系统的开发,早起阶段主要使用WordPress构建博客系统,目前,已移除WordPress,使用的技术栈
	包括php(已用node替换)、html、jQuery、bootstrap、JavaScript、node、mysql建站，基本实现博客网站功能，并可以
	在移动端访问。目前，正准备后期使用vue重构项目，优化代码效率和浏览体验。
#### 2019.3-至今---短息轰炸与归属地查询网站
	> 此项目是与朋友一起开发的一个基于大数据和账号绑定的短信轰炸和手机号码查询网站,本人在项目初期主要负责前端首页
	以及登录页面的制作....目前正在起步制作中。
> ### 荣誉证书
- 洛阳理工学院“华为杯”编程语言大赛 金奖；
- 洛阳理工学院“华为杯”大学生创新创业软件设计大赛 金奖；
- 洛阳理工学院“华为杯”物联网技术大赛 金奖；
> ### 自我评价
- 熟练掌握HTML、CSS、JavaScript；了解并掌握ES6、JQuery；了解BootStrap、node、Vue前沿技术
- 思想觉悟高，对工作高度负责，能够快速接受新知识、适应新环境
- 有良好的团队合作精神，能妥善处理好各种人际关系
>### 联系方式
	E-mail：347487522@qq.com`
      };
    },
    components: {
      mavonEditor
    },
  };
</script>

<style scoped>
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
</style>
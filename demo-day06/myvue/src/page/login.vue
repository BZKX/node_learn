<template>
    <div class="login">
        <!--登录盒子-->
        <div class="box">
            <h2>管理员登录</h2>
            <el-form label-position="top"
                     ref="loginFrom"
                     label-width="80px"
                     :rules="rules"
                     :model="loginFrom">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginFrom.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginFrom.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit('loginFrom')"
                               class="my-btn"
                               type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                //表单数据
                loginFrom:{
                    username:'',
                    password:'',
                },
                //表单验证规则
                rules:{
                    username:[
                        {required:true,message:'用户名不能为空',trigger:"blur"},
                        { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                    ],
                    password:[
                        {required:true,message:'密码不能为空',trigger:"blur"},
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        this.$message.error('数据格式错误');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            padding: 35px;
            box-sizing: border-box;
            border-radius: 4px;
            width: 550px;
            height: 420px;
            background-color: #fff;
            .my-btn{
                width: 100%;
                margin-top: 30px;
            }
        }
    }
</style>
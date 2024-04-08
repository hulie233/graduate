<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const isnew = ref(false)

const remember = ref(false)

const registerData = ref({
    username:'',
    password:'',
    rePassword:''
})
const loginData = ref({
    username:'',
    password:''
})


//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}

//定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}


//调用后台接口,完成注册、登录
import { userRegisterService,userLoginService} from '@/api/user.js'
// 注册
const register = async () => {
    //registerData是一个响应式对象,如果要获取值,需要.value
    if(registerData.value.password == registerData.value.rePassword){
        let result = await userRegisterService(registerData.value);
        // console.log(result);
        ElMessage.success('注册成功')
    }else{
        ElMessage.error('两次密码输入不一致！')
    }
    
}

// 登录
// 校验密码
// 成功后将生成的JWT令牌存入pinia中，然后通过路由跳转页面
import {useRouter} from 'vue-router'
import {useTokenStore} from '@/stores/token.js'
const router = useRouter()
const tokenStore = useTokenStore()
const login = async () =>{
    let result = await userLoginService(loginData.value)
    console.log(result);

    //记住账号密码
    if(remember.value){
        localStorage.setItem('loginInfo', JSON.stringify(loginData.value))
    } else {
        localStorage.setItem('loginInfo', JSON.stringify({}))
    }

    ElMessage.success('登录成功')
    
    tokenStore.setToken(result.data)
    router.push('/')
}

// 页面加载时监听是否有记住密码
onMounted(() => {
    if(localStorage.getItem('loginInfo') != null && Object.keys(localStorage.getItem('loginInfo')).length > 2){
        remember.value = true
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        loginData.value.username = loginInfo.username
        loginData.value.password = loginInfo.password
    } else {
        remember.value = false
    }
})

</script>

<template>
    <div class="bg">


        <div class="title"><h1>---欢迎使用xx医院医疗系统---</h1></div>
        
        <!-- 注册卡片栏 -->
        <el-card class="card" justify="center" align="middle" v-if="isnew">

            <!-- 头部提示框 -->
            <template #header>

                <div class="card-header">
                    <span>用户注册界面</span>
                    <el-button type="primary" text bg round @click="isnew = !isnew">← 返回</el-button>
                </div>
               
            </template>
            
            <!-- 用户功能操作部 -->
            <el-form  :model="registerData" label-width="100px" style="max-width: 580px;" label-position="right" :rules="rules">
                
                <el-form-item prop="username" label="账    号：" style="margin-top: 50px;">
                    <el-input :prefix-icon="User" placeholder="请设置想要注册的账号(长度在5~16位之间)" v-model="registerData.username"/>
                </el-form-item>
                <el-form-item prop="password" label="密    码：" style="margin-top: 40px;">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请设置您的密码(长度在5~16位之间)" v-model="registerData.password"/>
                </el-form-item>
                <el-form-item prop="rePassword" label="重复密码：" style="margin-top: 40px;">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"/>
                </el-form-item>

            </el-form>

            <!-- 按钮功能部 -->
            <div style="width: 60%;"><el-button class="button" size="large" color="blue" @click="register">注        册</el-button></div>

        </el-card>


        <!-- 登录卡片栏 -->
        <el-card class="card" justify="center" align="middle" v-else>

            <!-- 头部提示框 -->
            <template #header>
                <div class="card-header">
                    <span>医疗系统登录界面</span>
                    <el-button type="primary" text bg @click="isnew = !isnew">点击前往注册 →</el-button>
                </div>
            
            </template>

            <!-- 用户功能操作部 -->
            <el-form  :model="loginData" label-width="100px" style="max-width: 580px;" label-position="right" :rules="rules">
                
                <el-form-item prop="username" label="账    号：" style="margin-top: 50px;">
                    <el-input :prefix-icon="User" placeholder="请输入账号" v-model="loginData.username"/>
                </el-form-item>
                <el-form-item prop="password" label="密    码：" style="margin-top: 40px;">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginData.password"/>
                </el-form-item>

            </el-form>

            <!-- 记忆密码组件 -->
            <el-form-item class="flex" >
                <div class="flex">
                    <el-checkbox v-model="remember" size="large">记住我</el-checkbox>
                </div>
            </el-form-item>

            <!-- 按钮功能部 -->
            <div style="width: 60%;">
                <el-button class="button" size="large" color="blue" @click="login">登        录</el-button>
            </div>

        </el-card>

    </div>
    
</template>

<style lang="scss" scoped>
    .title{
        text-align: center;
        width: 40%;
        position: absolute;
        top: 10%;
        left: 30%;
        color:  #eebe77;
    }
    .bg{
        width: 100%;
        height: 956px;
        background: url('@/assets/bg0.webp') no-repeat;
        background-size: 100% 100%;
        
    }
    .card{
        width:40%;
        height: 500px;
        margin-left: 30%;
        margin-top: 290px;
        position: absolute;
        
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .button{
        width: 100%;
        margin-top: 60px;
    }
    .flex {
        width: 100%;
        display: flex;
        justify-content: right;
        margin-right: 10%;
    }
</style>
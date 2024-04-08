<script setup>
import { ref } from 'vue'


// const userInfo = ref({
//     username:'666',
//     nickname:'aaa',
//     gender:'男',
//     email:'sdasd',
//     birthday:'2024-8-4',
//     category:'妇科',
//     lever:'999'
// })
const option = [
    {
        value: 'Option1',
        label1: '临床',
        label2: '医士',
    },
    {
        value: 'Option2',
        label1: '外科',
        label2: '住院医师',
    },
    {
        value: 'Option3',
        label1: '内科',
        label2: '主治医师',
    },
    {
        value: 'Option4',
        label1: '儿科',
        label2: '副主任医师',
    },
    {
        value: 'Option5',
        label1: '其他',
        label2: '主任医师',
    },
]
const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    gender: [
        { required: true, message: '此为必选项', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    birthday: [
        { type:'date', required: true,message: '此为必填项',trigger: 'blur'}
    ],
    category: [
        { required: true,message: '此为必选项',trigger: 'blur'}
    ]
}


import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

const userInfo = ref({...userInfoStore.info})
console.log(userInfo);
//修改个人信息
import {userInfoUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
const updateUserInfo = async ()=>{
    //调用接口
    let result = await userInfoUpdateService(userInfo.value);
    ElMessage.success(result.msg? result.msg : '修改成功');
    // ElMessage.success( '修改成功');
    
    //修改pinia中的个人信息
    userInfoStore.setInfo(userInfo.value)
}

</script>
<template>
    <el-card class="card" shadow="hover">
        <template #header>
            <div class="header">
                <span style="font-weight: bold;">基本资料</span>
            </div>
        </template>
        <el-row style="text-align: -webkit-center;margin-top: 100px;">
            <el-col :span="24">
                <el-scrollbar height="652px">
                    <el-form :model="userInfo" :rules="rules" label-width="100px" size="large" style="width:max-content">
                        <el-form-item label="账号">
                            <el-input v-model="userInfo.username" style="width: 400px;" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="nickname">
                            <el-input v-model="userInfo.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="userInfo.gender">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="用户邮箱" prop="email">
                            <el-input v-model="userInfo.email"></el-input>
                        </el-form-item>
                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker
                                v-model="userInfo.birthday"
                                type="date"
                                placeholder="请选择您的生日"
                                size="default"
                                />
                        </el-form-item>
                        <el-form-item label="所属类别" prop="category">
                            <el-select
                                v-model="userInfo.job"
                                class="m-2"
                                placeholder="请选择类别"
                                size="large"
                                style="width: 400px"
                            >
                                <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label1"
                                    :value="item.value"
                                    />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="医师等级" prop="category">
                            <el-select
                                v-model="userInfo.lever"
                                placeholder="请选择职位"
                                size="large"
                                style="width: 400px"
                            >
                                <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label2"
                                    :value="item.value"
                                    />
                            </el-select>

                        </el-form-item>
                        <el-form-item label-width="200px">
                            <el-button type="primary" style="width: 100px;" @click="updateUserInfo">提交修改</el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
                
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
    .card{
    height: 100%;
    box-sizing: border-box;
    height: 796px;

    .header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .form{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
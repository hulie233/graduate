<script setup>
import { ref } from 'vue'
const password = ref({
    oldpassword:'',
    change:'',
    reconfirm:''
})
const rules = {
    oldpassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    change: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    reconfirm: [
        { required: true, message: '请再次确认新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ]
}

//修改
import {userPasswordUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter();
const update = async ()=>{
    if (password.value.oldpassword == password.value.change) {
        ElMessage.error('新旧密码不能一样！')
    }else{
        //调用接口
        let result = await userPasswordUpdateService(password.value);
        ElMessage.success(result.msg? result.msg : '修改成功');
        //2.跳转到登录页面
        router.push('/gate')
    }
    
}

</script>
<template>
    <el-card class="card" shadow="hover">
        <template #header>
            <div class="header">
                <span style="font-weight: bold;">修改密码</span>
            </div>
        </template>

        <el-row style="text-align: -webkit-center;margin-top: 100px;">
            <el-col :span="24">
                <el-scrollbar height="432px">
                    <el-form :model="password" :rules="rules" label-width="100px" size="large" style="width:max-content">

                        <el-form-item label="旧密码" prop="oldpassword">
                            <el-input v-model="password.oldpassword" style="width: 400px;" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="change">
                            <el-input v-model="password.change" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="再次确认" prop="reconfirm">
                            <el-input v-model="password.reconfirm" type="password" show-password></el-input>
                        </el-form-item>
                        

                        <el-form-item label-width="200px">
                            <el-button type="primary" style="width: 100px;" @click="update">确认修改</el-button>
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
<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import logo from '@/assets/alue.png'

const uploadRef = ref()

import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

//用户头像地址
const imgUrl= ref(userInfoStore.info.userPic)


//图片上传成功的回调函数
const uploadSuccess = (result)=>{
    imgUrl.value = result.data;
}



import {userAvatarUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
//头像修改
const updateAvatar = async ()=>{
    //调用接口
    let result = await userAvatarUpdateService(imgUrl.value);

    ElMessage.success(result.msg? result.msg:'修改成功')

    //修改pinia中的数据
    userInfoStore.info.userPic = imgUrl.value
}
</script>

<template>
    <el-card class="card" shadow="hover">
        <template #header>
            <div class="header">
                <span style="font-weight: bold;">更换头像</span>
            </div>
        </template>
        <el-row class="row">
            <el-col :span="6" style="width: 100%;">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                    <img :src="imgUrl ? imgUrl : logo" class="avatar" />
                    
                </el-upload>
                <br />
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                        选择图片
                    </el-button>
                    <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                        上传头像
                    </el-button>
                </div>
                
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
    .row{
        margin-top: 100px;
        justify-content: center;
    }
}
.avatar-uploader {
    :deep() {
        .avatar {
            width: 100%;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>
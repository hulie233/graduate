<script setup>
    import { ref } from 'vue'
    import logo from '@/assets/alue.png'
    import {
        User,
        Crop,
        EditPen,
        SwitchButton,
    } from '@element-plus/icons-vue'

    const welcome = ref('')

    import {userInfoService} from '@/api/user.js'
    import useUserInfoStore from '@/stores/userInfo.js'
    import {useTokenStore} from '@/stores/token.js'
    const tokenStore = useTokenStore();
    const userInfoStore = useUserInfoStore();
    //调用函数,获取用户详细信息
    const getUserInfo = async()=>{
        //调用接口
        let result = await userInfoService();
        
        console.log(result.data);
        //数据存储到pinia中
        userInfoStore.setInfo(result.data);

        if(result.data.nickname == null){
            welcome.value = '欢迎使用本医疗系统，请尽快完善个人资料哦！'
        }else{
            welcome.value = '欢迎用户' + result.data.nickname + ',祝您生活愉快！'
        }
    }

    getUserInfo();

    // 导航栏页面更换
    import {useRouter} from 'vue-router'
    const router = useRouter();
    import {ElMessage,ElMessageBox} from 'element-plus'
    // 头像下拉菜单点击事件
    const handleCommand = (command)=>{
        //判断指令
    if(command === 'logout'){
        //退出登录
        ElMessageBox.confirm(
            '您确认要退出吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                //退出登录
                //1.清空pinia中存储的token以及个人信息
                tokenStore.removeToken()
                userInfoStore.removeInfo()

                //2.跳转到登录页面
                router.push('/gate')
                ElMessage({
                    type: 'success',
                    message: '已退出',
                })
                
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '用户取消了退出登录',
                })
            })
        }else{
            //路由
            router.push('/user/'+command)
        }
    }
</script>

<template>
    <div class="bg">
        <el-container>
            <!-- 头部logo图标及用户头像 -->
            <el-header class="head">
                <div class="head-top">
                    <div class="logo"></div>
                    <div style="color:chocolate;">{{ welcome }}</div>
                    <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
                    <el-dropdown placement="bottom-end" @command="handleCommand" style="width: 300px;">
                        <!-- 头像缩略放置 -->
                        <span style="border-radius: 50%;outline: none;">
                            <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic:logo"/>
                        </span>
                        <!-- 下拉菜单内容 -->
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="person" :icon="User">基本资料</el-dropdown-item>
                                <el-dropdown-item command="avator" :icon="Crop">更换头像</el-dropdown-item>
                                <el-dropdown-item command="reset" :icon="EditPen">重置密码</el-dropdown-item>
                                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>

                <!-- 导航栏 -->
                <div>
                    <!-- 设置导航栏默认选中为当前路由地址 -->
                    <el-menu
                        :default-active="$route.path"
                        mode="horizontal"
                        style="width: 1500px;margin: auto;background: transparent;"
                        router
                        
                        active-text-color="#ffd04b"
                    >
                        <!-- 导航路由绑定及设定间距 -->
                        <el-row style="width:1400px;margin: auto;background: transparent;">
                            <el-col :span="4"><el-menu-item index="/room/home">首页</el-menu-item></el-col>
                            <el-col :span="4" :offset="1"><el-menu-item index="/room/medicine">药品信息</el-menu-item></el-col>
                            <el-col :span="4" :offset="1"><el-menu-item index="/room/article">所有文章</el-menu-item></el-col>
                            <el-col :span="4" :offset="1"><el-menu-item index="/room/edit">个人文章编辑</el-menu-item></el-col>
                            <el-col :span="4" :offset="1"><el-menu-item index="/job">招聘信息</el-menu-item></el-col>
                        </el-row>

                    </el-menu>
                </div>
                
            </el-header>


            <!-- 子路由内容展示区 -->
            <el-main class="main"><router-view></router-view></el-main>

        </el-container>
  </div>
  <el-backtop :right="100" :bottom="100" :visibility-height="10"/>
</template>

<style lang="scss" scoped>
    .bg{
        // width: 1920px;
        // height: 957px;//748
        background: url('@/assets/bg1.webp') no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
    }
    .head{
        height: 120px;
        width: 100%;
        
    }
    .head-top{
        display: flex;
        width: 1400px;
        height: 60px;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }
    
    .logo{
        width:300px;
        height: 100%;
        background: url('@/assets/alue.png') no-repeat;
        background-size: 100% 100%;

    }
    .el-menu-item{
        justify-content: center;
        text-align: center;
    }
    .main{
        margin-top: 0px;
        margin: auto;
        width: 1500px;
    }
    
</style>
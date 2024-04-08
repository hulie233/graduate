//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterService = (registerData)=>{
    //借助于UrlSearchParams完成传递
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    return request.post('/user/register',params);
}
//提供调用登录接口的函数
export const userLoginService = (loginData)=>{
    //借助于UrlSearchParams完成传递
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/user/login',params);
}

//获取用户详细信息
export const userInfoService = ()=>{
    return request.get('/user/userinfo')
}

//修改个人信息
export const userInfoUpdateService = (userInfoData)=>{
   return request.put('/user/update',userInfoData)
}

//修改头像
export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

//修改密码
export const userPasswordUpdateService = (passwordData)=>{
    const params = new URLSearchParams();
    for(let key in passwordData){
        params.append(key,passwordData[key]);
    }
    console.log(passwordData);
    return request.patch('/user/updatePWd',params)
}

//根据id获取文章发布者信息
export const createUserInfoService = (params)=>{
    return  request.get('/user/create',{params:params})
 }
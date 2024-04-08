//导入request.js请求工具
import request from '@/utils/request.js'

//用户文章列表查询
export const articleOwnListService = (params)=>{
    return request.get('/article/get',{params:params})
}

//所有文章分类列表查询
export const articleListService = (params)=>{
   return  request.get('/article/search',{params:params})
}

//添加文章
export const articleAddService = (articleData)=>{
    return request.post('/article/add',articleData);
}

//修改文章
export const articleUpdateService = (updateData)=>{
    return request.put('/article/update',updateData)
 }
 
 //修改文章
export const articleDeleteService = (id)=>{
    return request.delete('/article/delete?id='+id)
 }
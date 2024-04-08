//导入request.js请求工具
import request from '@/utils/request.js'

//获取药品全部详细信息
export const MedicineInfoService = ()=>{
    return request.get('/medicine/get')
}

//根据药品名查询相关信息
export const SearchInfoService = (params)=>{
    console.log(params);
    
    return request.get('/medicine/search',{params:params});
}
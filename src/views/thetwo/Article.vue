<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { column } from 'element-plus/es/components/table-v2/src/common';

import logo from '@/assets/alue.png'

import { ref } from 'vue'

//文章分类数据模型
const categorys = ref([
    {
        "id": 1,
        "category": "临床",
    },
    {
        "id": 2,
        "category": "外科",
    },
    {
        "id": 3,
        "category": "内科",
    },
    {
        "id": 4,
        "category": "儿科",
    },
    {
        "id": 5,
        "category": "其他",
    }
])

//图片适应样式
const fit = 'contain'


//用户搜索时选中的分类名
const category = ref('')

//文章列表数据模型
const articles = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "category": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "category": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...asdjn aiuh iauwdh nuiowdhj oawidjn aowdn aow",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        'category':"旅游",
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
])


//略写所展示的文章内容
const st = (row,column,cellValue)=>{

    if(cellValue.length > 8){
        //限制仅展示前八位

        return cellValue.slice(0,8).replace('<p>','') + "......"
    }

    return cellValue;
}
const st2 = (row,column,cellValue)=>{

    return cellValue.replace('T',' ')

}

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}

//点击行跳出相应文章内容
const dialogVisible = ref(false)
//文章内容模型
const rowmsg = ref([
    {
        title: '',
        create:'',
        img:'',
        content: ''
    }
])
const rowclick = (row,column,event)=>{
    
    // 传入文章标题、内容
    rowmsg.value.title = row.title
    rowmsg.value.create = row.create
    rowmsg.value.img = row.coverImg
    rowmsg.value.content = row.content
    

    dialogVisible.value = true
}


import { articleListService } from '@/api/article.js'
import { createUserInfoService } from '@/api/user.js'
//获取所有文章列表数据
const articleList = async () => {

    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        category: category.value ? category.value : null,
    }
    
    //调用分页接口
    let result = await articleListService(params);
    console.log(result);

    //渲染视图
    total.value = result.data.total;
    articles.value = result.data.items;

    //处理数据，扩展createuser属性
    for(let i=0;i<articles.value.length;i++){
        let article = {
            id: articles.value[i].createUser
        }

        //调用接口
        let result1 = await createUserInfoService(article);
        // console.log(result1);
        
        if(result1.data.nickname == null){
            articles.value[i].create = '匿名';
        }else{
            articles.value[i].create = result1.data.nickname;
        }

    }
}
//运行或更新
articleList()
</script>

<template>
    <el-card class="page-container" shadow="hover">
        <template #header>
            <div class="header">
                <span style="font-weight: bold;">所有文章</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline class="form">
            <el-form-item label="文章分类：" style="width: 20%;">
                <el-select placeholder="请选择" v-model="category">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.category" :value="c.category">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="category = '';">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%"  @row-click="rowclick">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="category"></el-table-column>
            <el-table-column label="内容" prop="content" :formatter="st"></el-table-column>
            <el-table-column label="作者" prop="create"></el-table-column>
            <el-table-column label="发布时间" prop="updateTime" :formatter="st2"></el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        
        <!-- 分页条 -->
        <div class="pagination">
            <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 7, 10, 12]"
                        layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        </div>
        
        
        <!-- 文章内容弹出框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="rowmsg.title"
            width="40%"
            center
            draggable
        >
            <div style="position: relative;left: 75%;">作者：{{ rowmsg.create }}</div>

            <div style="position: relative;left: 50%;margin-left: -75px;margin-top: 10px;">
                <el-image style="width: 150px; height: 150px" :src="rowmsg.img" :fit="fit"/>
            </div>

            <span v-html="rowmsg.content"></span>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                    确定
                    </el-button>
                </span>
            </template>

        </el-dialog>
    </el-card>
</template>
<style lang="scss" scoped>
.page-container{
    height: 100%;
    box-sizing: border-box;
    position: relative;
    height: 796px;

    .header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .form{
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .pagination{
        position: absolute;
        bottom: 30px;
        right: 20px;
    }
}
</style>
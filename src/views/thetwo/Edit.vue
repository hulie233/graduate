<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
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

//格式化日期
const st = (row,column,cellValue)=>{
    return cellValue.replace('T',' ')
}

//用户搜索时选中的发布状态
const state = ref('')

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
])
//抽屉标题
const title = ref('')

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const articleModel = ref({
    title: '',
    category: '',
    coverImg: '',
    content: '',
    state: ''
})

//导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result)=>{
    articleModel.value.coverImg = result.data;
    console.log(result.data);
}

import { articleOwnListService,articleAddService,articleUpdateService,articleDeleteService } from '@/api/article.js'
//获取文章列表数据
const articleList = async () => {
    let params = {
        state: state.value ? state.value : null
    }
    //调用获取文章接口
    let result = await articleOwnListService(params);
    console.log(result);

    //渲染视图
    articles.value = result.data;

}

articleList();

//添加文章
import {ElMessage} from 'element-plus'
const addArticle = async (clickState)=>{
    //把发布状态赋值给数据模型
    articleModel.value.state = clickState;

    //调用接口
    let result = await articleAddService(articleModel.value);

    ElMessage.success(result.msg? result.msg:'添加成功');

    //让抽屉消失
    visibleDrawer.value = false;

    //刷新当前列表
    articleList()
}

const showDialog = (row) => {
    visibleDrawer.value = true; 
    title.value = '编辑文章'
    console.log(row.id);
    //数据拷贝
    articleModel.value.title = row.title;
    articleModel.value.category = row.category;
    articleModel.value.content = row.content
    articleModel.value.coverImg = row.coverImg
    articleModel.value.state = row.state
    articleModel.value.id = row.id
    console.log(articleModel);
}

//更改文章
const updateArticle = async (clickState) => {
    //把发布状态赋值给数据模型
    articleModel.value.state = clickState;

    //调用接口
    let result = await articleUpdateService(articleModel.value);
    ElMessage.success(result.msg? result.msg:'编辑成功');

    //让抽屉消失
    visibleDrawer.value = false;

    //刷新当前列表
    articleList()
}


//删除文章
import {ElMessageBox} from 'element-plus'
const deleteCategory = (row) => {
    //提示用户  确认框
    ElMessageBox.confirm(
        '你确认要删除该条文章吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await articleDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            articleList()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消了删除',
            })
        })
}

//清空模型的数据
const clearData = () => {
    articleModel.value.title = '',
    articleModel.value.category = '',
    articleModel.value.coverImg = '',
    articleModel.value.content = ' ',
    articleModel.value.state = ''
    articleModel.value.id = ''
    // console.log(articleModel.value.content);
}
</script>

<template>
    <el-card class="card" shadow="hover">
        <template #header>
            <div class="header">
                <span style="font-weight: bold;">我的文章</span>
                <div>
                    <el-button type="primary" @click="visibleDrawer = true;title = '添加文章';clearData();">添加文章</el-button>
                </div>
            </div>
        </template>

        <!-- 搜索表单 -->
        <el-form inline class="form">
            <el-form-item label="发布状态："  style="width: 20%;">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="state = '';">重置</el-button>
            </el-form-item>
        </el-form>
        
        <el-scrollbar height="652px">
            <el-table :data="articles" style="width: 100%" :default-sort = "{prop: 'updateTime',order: 'descending'}">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="category"></el-table-column>
            <el-table-column label="发表时间" prop="updateTime" :formatter="st"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        </el-scrollbar>
        <!-- 文章列表 -->
        

        <!--文章抽屉 -->
        <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
            <!--文章表单 -->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="articleModel.category">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.category" :value="c.category">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">
                    <!-- 
                        auto-upload:设置是否自动上传
                        action:设置服务器接口路径
                        name:设置上传的文件字段名
                        headers:设置上传的请求头
                        on-success:设置上传成功的回调函数
                     -->
                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章内容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="articleModel.content" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title=='添加文章'? addArticle('已发布') : updateArticle('已发布')">发布</el-button>
                    <el-button type="info" @click="title=='添加文章'? addArticle('草稿') : updateArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

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
        justify-content: end;
    }
}

/* 抽屉样式 */
.avatar-uploader{
    :deep(){
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload{
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover{
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon{
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor{
    width: 100%;

    :deep(.ql-editor){
        min-height: 200px;
    }
}
</style>
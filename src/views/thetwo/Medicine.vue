<script setup>
    import {ref} from 'vue'

    const tablelayout = ref('fixed')

    const medicineData = ref([
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
     
    ])

    //获取所有药品信息
    import {MedicineInfoService} from '@/api/medicine.js'
    const get = async () => {
        //调用接口
        let result = await MedicineInfoService();
        console.log(result);
        medicineData.value = result.data;
        console.log(medicineData);
    }
    get();

    //根据药品名查询相关信息
    import {SearchInfoService} from '@/api/medicine.js'
    const name = ref('')
    const medicineList = async () => {
        console.log(name.value);
        if(name.value==''){
            console.log("用户空输入");
        }else{
            let params = {
                name:name.value ? name.value : null
            }
            //调用接口
            let result = await SearchInfoService(params);
            console.log(result);

            //渲染视图
            medicineData.value = result.data;
        }
    }
</script>

<template>
    <el-card class="card" shadow="hover">
        
        <template #header>

            <div class="header">
                <span style="font-weight: bold;">药品信息</span>

                <!-- 搜索表单 -->
                <el-form inline class="form">
                    <el-form-item style="width: 70%;">
                        <el-input placeholder="请输入药品名称" v-model="name"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="medicineList">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </template>
        
        <el-table :data="medicineData" style="width: 100%;" height="652" :table-layout="tablelayout">
            <el-table-column label="药品名" prop="name"/>
            <el-table-column label="主要用途" prop="use"/>
            <el-table-column label="管理人" prop="head"/>
            <el-table-column label="管理人联系方式" prop="phone"/>
            <el-table-column label="剩余数量" prop="number"/>
        </el-table>

  </el-card>
</template>

<style lang="scss" scoped>
.card{
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
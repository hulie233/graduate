<script setup>
import logo1 from '@/assets/logo1.jpg'
import logo2 from '@/assets/logo2.jpg'
import logo3 from '@/assets/logo3.jpg'
import logo4 from '@/assets/logo4.jpg'
import logo5 from '@/assets/logo5.jpg'
import bg from '@/assets/bg2.jpeg'
import f1 from '@/assets/friend1.jpg'
import f2 from '@/assets/friend2.jpg'
import f3 from '@/assets/friend3.jpg'
import f4 from '@/assets/friend4.jpg'


const fit = 'fill'
const logo = [logo1,logo2,logo3,logo4,logo5]
const text = ['家','和','万','事','兴']
</script>

<template>
    <el-card class="card" shadow="hover">
        <div>
            <el-carousel height="250px" type="card">
                <el-carousel-item v-for="item in 5" :key="item" :label="text[item-1]">
                    <el-image style="width: 100%; height: 100%;z-index: 1;" :src="logo[item-1]" :fit="fit" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <el-divider />

        <div class="center">
            <div class="left">
                <el-image style="width: 100%;height: 100%;" :src="bg" :fit="fit"/>
            </div>

            <div style="height: 100%;width: 1px;background-color: black;"></div>

            <div class="text1">
                <p>-----------时事新闻-----------</p>
                <ul>
                    <li><a href="https://mp.weixin.qq.com/s/WlToRHHqKUPVlI0Kiux2kw">《南安融媒》：【南安工匠】谢三都：深耕产学研 做新时代“教书匠”</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9782.htm">《新福建》：闽南科技学院：探寻世遗泉州，领略海丝文化</a></li>
                    <li><a href="https://mp.weixin.qq.com/s/8THyPPq9f-D8qbRg1-pqWw">《福建教育微言》：各地各校多措并举促就业 | 《福建教育工作简报》</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9748.htm">《人民日报》：闽南科技学院青年探寻世遗泉州 领略海丝文化</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9747.htm">《今日头条》：闽南科技学院青年探寻世遗泉州 领略海丝文化</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9743.htm">《未来网》：闽南科技学院青年探寻世遗泉州 领略海丝文化</a></li>
                    <li><a href="https://baijiahao.baidu.com/s?id=1788508357631804625&wfr=spider&for=pc">《福建日报》：开年超燃上分！福建微信影响力2024年第2周排行来了</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9712.htm">《东南网》：福建开放大学南安学院与闽南科技学院签署战略合作协议</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9710.htm">《海丝商报》：福建开放大学南安学院与闽科签署战略协作协议</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9709.htm">《福建省教育厅》：闽南科技学院举办“闽科春晚”</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9624.htm">《中国网》：团体一等奖！闽南科技学院再获殊荣</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9622.htm">《中国网》：校地共建上党课 结对聚力共提升——康美镇开展主题教育专题党课</a></li>
                    <li><a href="https://www.mku.edu.cn/info/1009/9623.htm">《福建教育微言》：明天，2024年研考开考！福建高校这样暖心护考</a></li>
                </ul>
            </div>
        </div>

        <div class="another">
            <p class="title">友谊单位</p>

            <div class="image">
                <el-row :gutter="20">
                    <el-col :span="6"><a href="https://www.mku.edu.cn/"><el-image style="width: 100%; height: 100%" :src="f1" :fit="fit"/><p>闽南科技学院</p></a></el-col>
                    <el-col :span="6"><a href="http://www.fjxiehe.com/"><el-image style="width: 100%; height: 100%" :src="f2" :fit="fit"/><p>福州协和附属医院</p></a></el-col>
                    <el-col :span="6"><a href="http://www.qzdyyy.com/"><el-image style="width: 100%; height: 100%" :src="f3" :fit="fit"/><p>福建医科大学附属泉州第一医院</p></a></el-col>
                    <el-col :span="6"><a href="https://www.xmfh.com.cn/index.htm"><el-image style="width: 100%; height: 100%" :src="f4" :fit="fit"/><p>厦门大学附属第一医院</p></a></el-col>
                </el-row>
            </div>
        </div>



        <el-divider />

        <!-- 底部信息展示 -->
        <el-footer class="foot">
            <div>版权所有：福建省泉州市xx医院</div>
            <div>咨询电话：0595-xxxxxxxx</div>
            <div>急诊电话：0595-xxxxxxxx</div>
            <div>@fffor</div>
        </el-footer>
    </el-card>
    
</template>

<style lang="scss" scoped>
.card{
    height: auto;
    box-sizing: border-box;

    .center{
        margin-top: 20px;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left{
            width: 48%;
            height: 100%;
        }
        .text1{
            height: 100%;
            width: 48%;
            border:1px solid black;
            border-radius: 5px;
            box-shadow: 3px 2px 5px 0 #666666;
        }
        .text1>p{
            color: black;
            font-size: 24px;
            padding: 5px;
            text-align: center;
        }
        .text1>ul>li{
            width: 650px;
            height: 20px;
            margin-top: 10px;
            float: left;
        }
        .text1>ul>li>a{
            color: black;
            text-decoration: none;
        }
        .text1>ul>li>a:hover{
            color: red;
        }
    }
    .form{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .another{
        margin-top: 30px;
        height: 400px;
        
        .title{
            font-size: 28px;
            font-weight: bold;
        }

        .image{
            width: 100%;
            height: 100%;

            a{
                text-decoration: none;
            }
            p{
                color: white;
                text-align: center;
                font-size: 20px;
                position: relative;
                bottom: 50px;
                background-color: rgba(0,0,0,0.5);
            }
        }
        
    }
    .foot{
        display: flex;
        width: 100%;
        height: 30px;
        color: gray;
        justify-content: center;
        align-items: center;
        bottom: 5px;

        div{
            text-indent: 2em;
        }
    }
}
</style>
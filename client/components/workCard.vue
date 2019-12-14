<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3><nuxt-link to="/pastWorks/_pastWork">作品名</nuxt-link></h3>
            </div>
            <div class="img_holder">
                <img :src="img"/>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item"> -->
            <div class="text item">
                {{ '日付 : ' + sample_data.date }}
                <br>
                {{ '概要 : ' + sample_data.overview }}
            </div>
        </el-card>
    </div>
</template>

<script>
import work_img from "~/assets/img/img4.jpg"

export default {

    //この辺全部progress.vueに移行
    data() {
        return {
            img: work_img,
            sample_data: {
                date: '2019-12-13',
                overview: 'この作品の概要です。',
            }
        }
    },
    async asyncData({ app }) {
        const data = await app.axios.$get('http://localhost:3000/api/')
        return { data: data }
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
}

.text {
// font-size: 14px;
}

.el-card {
    margin: 0 auto;
}

.item {
margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}

.box-card {
width: 100%;
background-color: #2c2c2c;
color: $mainchar;
}

.img_holder {
    width: 100%;
}

img {
    width: 80%;
}
</style>
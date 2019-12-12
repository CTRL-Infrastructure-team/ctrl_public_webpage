<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>作品名</span>
            </div>
            <div>
                <img :src="img"/>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'項目 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
import twitter_img from "~/assets/img/img5.jpg"

export default {

    //この辺全部progress.vueに移行
    data() {
        return {
            img: twitter_img
        }
    },
    async asyncData({ app }) {
        const data = await app.axios.$get('http://localhost:3000/api/')
        return { data: data }
    },
};
</script>

<style lang="scss" scoped>
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
width: 90%;
background-color: #2c2c2c;
color: $mainchar;
}

img {
    width: 35px;
}
</style>
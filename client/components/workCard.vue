<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3><nuxt-link :to="`/pastWorks/${work._id}`" :work="work">{{ work.title }}</nuxt-link></h3>
            </div>
            <div class="img_holder">
                <img :src="img" />
            </div>
            <div class="text item">
                {{ '日付 : ' + modifiedTime }} 
                <br>
                {{ '  制作者 : ' + work.contributor }}
                <br>
                {{ '概要 : ' + work.content }}
            </div>
        </el-card>
    </div>
</template>

<script>
import moment from 'moment'
import modify from '~/plugins/modifiedTime'

export default {
    props: ['work'],
    data() {
        return {
            img: this.work.top_img_url, 
            modifiedTime: modify(this.work.createdAt) 
        }
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
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

a {
    text-decoration: none;
    color: $mainchar;
}
</style>
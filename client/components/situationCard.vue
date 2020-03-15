<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3><nuxt-link :to="`/currentSituations/${situation.title}`" :situation="situation">{{ situation.title }}</nuxt-link></h3>
            </div>
            <div class="flex-box">
                <div class="img_holder">
                    <img :src="img" />
                </div>
                <div class="text item">
                    {{ '日付 : ' + situation.time }} 
                    <br>
                    {{ '  制作者 : ' + situation.contributor }}
                    <br>
                    {{ '概要 : ' + situation.content }}
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: ['situation'],
    data() {
        return {
            img: this.situation.img_url
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
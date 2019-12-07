<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>タイトル</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'項目 ' + o }}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
  
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
</style>
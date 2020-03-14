<template>
    <div>
        <form class="inputform">
            title<br><input type="text" placeholder="タイトルを入力"/><br>
            content<br><textarea rows="7" cols="100">内容を入力</textarea><br>
            image<br><input type="file" accept="image/*"/><br>
            file<br><input type="file"/><br>
            <input type="submit">
        </form>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.inputform{
    margin: 10px;
}
</style>
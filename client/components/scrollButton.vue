<template>
    <div>
        <div class="button">
            top
        </div>
    </div>
</template>
<script>
export default {
    name: "scrollButton"
}
</script>

<style lang="scss" scoped>
    .button{
        width: 100px;
        height: 100px;
        border: solid 2px;
        position: fixed;
        z-index: 99;
        background-color: pink;
        top: 0;
        right: 0;
    }
</style>
<template>
    <div>
        <div class="button" @click="gotop">
            
            
            <span>
                <div class="left">
                </div>
                <div class="right">
                </div>
            </span>
            
            
        </div>
    </div>
</template>
<script>
export default {
    name: "scrollButton",
    methods: {
        gotop: function() {
           window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .button{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: fixed;
        z-index: 99;
        background-color: #328d55;
        bottom: 5%;
        right: 5%;
    }

    span{
        z-index: 101;
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
    }

    .left{
        position: absolute;
        width: 50%;
        height: 5px;
        background-color: #c9c2c2;
        transform: translateX(20%) translateY(400%) rotate(-45deg);
    }

    .right{
        position: absolute;
        width: 50%;
        height: 5px;
        background-color: #c9c2c2;
        transform: translateX(80%) translateY(400%) rotate(45deg);
    }

</style>
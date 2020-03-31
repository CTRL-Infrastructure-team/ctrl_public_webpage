<template>
    <div>
        <div id="button" class="button" @click="gotop">
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
    mounted() {
        window.addEventListener('scroll', this.handlescroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handlescroll);
    },
    methods:  {
        gotop: () => {
           window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        handlescroll:() => {
            let scrollY = window.scrollY;
            if(scrollY > 50){
                let element = document.getElementById("button");
                element.classList.add("active");
            }
            if(scrollY <= 50){
                let element = document.getElementById("button");
                element.classList.remove("active");
            }
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
        background-color: #F4F4F5;
        bottom: 5%;
        right: 5%;
        cursor: pointer;
        opacity: 0.6;
    }
    .button.active{
        opacity: 1;
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
        background-color: #D4CDCF;
        transform: translateX(20%) translateY(400%) rotate(-45deg);
    }

    .right{
        position: absolute;
        width: 50%;
        height: 5px;
        background-color: #D4CDCF;
        transform: translateX(80%) translateY(400%) rotate(45deg);
    }

</style>
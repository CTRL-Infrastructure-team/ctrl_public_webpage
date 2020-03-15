<template>
    <div>
        <form class="inputform">
            title<br><input type="text" placeholder="タイトルを入力"/><br>
            content<br><textarea rows="7" cols="100">内容を入力</textarea><br>
            <div class="drop" v-bind:class="{'changed':changed}" @dragover.prevent="makeborder($event)" @drop.prevent="upload($event)">
            image1<br><input type="file" id="upload_image" accept="image/*"/><br>
            <p >ここに画像をドロップ</p>
            <img v-show="preview" v-bind:src="preview" style="width:300px;">
            </div>
            image2<br><input type="file" accept="image/*"/><br>
            file<br><input type="file"/><br>
            <input type="submit">
        </form>
    </div>
</template>
<script>
export default {
    data:{
        preview:'',
        changed:false,
    },
    methods:{
        upload: function(event){
            const files = event.target.files ? event.target.files : event.dataTransfer.files;
            const file = files[0];
            const reader = new FileReader();
            reader.onload = event => {
                this.preview = event.target.result;
            };
            reader.readAsDataURL(file);
            this.name = files[0].name;
            document.getElementById("upload_image").files = files;
        },
        makeborder: function(event){
            this.changed = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.inputform{
    margin: 10px;
}
.drop{
    border: 1px solid black;
}
.changed{
    border: 3px solid green;
}
</style>
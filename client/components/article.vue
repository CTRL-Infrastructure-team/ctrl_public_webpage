<template>
  <div>
    <div class="modal-flex-text">
      <div id="app">
      <!-- <li v-for="sample_data in results"> -->
      <!-- <h2 class="modal-flex-text_title">{{ sample_data.title }}</h2> -->
      <h2 class="modal-flex-text_title">{{ title }}</h2>
      <div class="modal-flex-text_content">
        {{ '日付 : ' + sample_data.date }}
            <br>
        {{ '概要 : ' + sample_data.overview }}
        <!-- {{info}} -->
      </div>
      <p>modalText.body　本文を入力</p>
      </div>
    </div>
  </div>
</template>
<script>
import sample_data from '../assets/data/data.json'
import axios from '@nuxtjs/axios'

export default {
  /*
  data: () => {
    users: users,
  },
  

  data:() =>{
    sample_data: sample_data
  }
 */

  data () {
    return {
      sample_data: {
        number: 1,
        title: 'タイトルです',
        date: '2019-12-28',
        overview: 'この作品の概要です。',
        content: '本文です。'
      }
    }
  },
  props: ['title'],
  
  async asyncData({ app }) {
    const data = await app.axios.$get('http://localhost:3000/api/')
    return { data: data }
  },
  /*
  el:'#app',
  data:{
    results:[]
  },
  mounted(){
    axios.get("../assets/data/data.json")
    .then(response => {
      this.results = response.data
      console.log(response.data)
    })
  },
  computed:{
    processedPosts(){
      let posts = this.results;
    }
  }
  */
}
</script>
<style lang="scss" scoped>
$modalBorder: #8193a9;
.modal {
  width: 90%;
  &-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-img {
      width: 35%;
    }
    &-text {
      width: 60%;

      &_title {
        font-family: monospace;
        width: 165%;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid $modalBorder;
        border-left: 4px solid $modalBorder;
      }

      &_content{
        padding: 0 0px;
      }
    }
  }
}
</style>
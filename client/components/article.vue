<template>
  <div>
    <div class="modal-flex-text">
      <h2 class="modal-flex-text_title">{{ post.title }}</h2>
      {{ '日付 : ' + post.date }}
              <br>
      {{ '概要 : ' + post.overview }}
              <br>
      {{'本文：' + post.content}}
    </div>
  </div>
</template>
<script>
import data from '~/assets/data/data.json'
import axios from '@nuxtjs/axios'

export default {
  /*
  data: () => {
    users: users,
  },
  
    */

  data:() =>({
    sample_contents:data
  }),
  /*
  methods:{
    fetch(){
      this.sample_contents = data
    }
  },
  /*
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
  */
  props: ['post'],
  /*
  props: ['time'],
  props: ['content'],
  props: ['img_url'],
  props: ['overview'],
  props: ['contributor'],
  props: ['twitter_id'],
  /*
  async asyncData({ app }) {
    const data = await app.axios.$get('http://localhost:3000/api/')
    return { data: data }
  },
  /*
  el:'#app',
  data:{
    sample_data:[]
  },
  */
  mounted(){
    this.$axios.get("~/assets/data/data.json")
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
  
}
</script>
<style lang="scss" scoped>
$modalBorder: #8193a9;
.modal {
  width: 100%;
  &-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-img {
      width: 35%;
    }
    &-text {
      width: 100%;

      &_title {
        font-family: monospace;
        width: 100%;
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
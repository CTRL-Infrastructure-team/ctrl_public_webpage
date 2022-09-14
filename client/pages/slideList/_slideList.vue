<template>
  <div class="container">
    <pageHeader :path_datas="path_datas" />
    <div class="topic-wrapper">
      <p class="topic-title">{{topic.topic}}</p>
      <p class="topic-explanation">{{topic.explanation}}</p>
      <p class="topic-attention">※スライドの読み込みに時間がかかることがあります。</p>
    </div>
    <presentation :presentations="slides" class="wrapper" /> 
  </div>
  <!-- /.container -->
</template>
<script>
import pageHeader from "~/components/publication/pageHeader";
import presentation from "~/components/publication/presentations";

export default {
  async asyncData({ params, app }) {
    let topic = await app.$axios.asyncGet(`/api/publication/topic/${params.slideList}`);
    let slides = await app.$axios.asyncGet(`/api/publication/slide/${params.slideList}`);
    slides = slides.filter(v => v.slide_url !== "");

    let path_datas = [
        { name: "Top", path: "/" },
        { name: "進捗発表", path: "/publication/recentTopics"},
        { name: "過去の進捗発表", path: "/publication/pastTopics"},
        { name: topic.topic, path: "/slideList/" + topic.id }
      ];
    
    if(topic.is_new){
      path_datas = path_datas.filter(p=> p.name !== "過去の進捗発表");
    }

    return { topic, slides, path_datas};
  },
  components: {
    pageHeader,
    presentation
  },
  head() {
    return {
      title: this.topic.topic + " | ",
      meta:[
        { hid: 'twitter:description',
          name: 'twitter:description',
          content: this.topic.topic
        }
      ]
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}
.topic {
  &-wrapper {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
  &-title {
    font-size: 2.0em;
    text-align: center;
    margin: 20px 0px 20px 0px;
  }
  &-explanation {
    font-size: 1.0 em;
    text-align: center;
    margin: 20px 20px 20px 20px;
  }
  &-attention {
    font-size: 1.0em;
    color: #909090;
    margin-bottom: 20px;
  }
  

}
</style>
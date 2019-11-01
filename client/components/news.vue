<template>
  <div>
    <h1>News</h1>
    <div>this is first news.</div>
    <div class="flexNews">
      <mainGuide name="first news" class="main guide" color="#4ff0f0" />
    </div>
    <div>this is second news.</div>
    <div class="flexNews">
    <mainGuide name="second news" class="main guide" color="#4f4fff" />
    </div>
    <!-- <div id="app1">{{ greeting }}</div> -->
  </div>
</template>
<script>
//import news1 from './news1'
import mainGuide from "~/components/news1";
export default {
  /*data () {
    return {
      // greeting: <mainGuide name="4" class="main guide" color="black" />
      greeting:'third'
    }
  }*/
  components: {
    mainGuide
  }
};
</script>
<style lang="scss" scoped>
div {
  border: solid black 0px;
}
.flexNews {
  width: 100%;
  //display: flex;
  border: solid black 1px;
  justify-content: space-around;
  flex-wrap: wrap;

  /* width: 100;*/
}
</style>
<template>
  <div>
   <div class="panel-default">
    <div class="panel-header">
      パネルの見出し
    </div>
    <div class="panel-body">
		パネルの内容
	　</div>
   </div>
  </div>
</template>


<script>
export default {};

</script>
<style lang="scss" scoped>

.panel-default{
  box-shadow: 2px 2px 4px 3px #000000;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}

.panel-header{
  display: flex;
  justify-content: space-between;
  background-color: #000000;
  height: 50px;

color: #FFFFFF;
border-bottom: 2px solid #FFFFFF;
}

.panel-body{
  display: flex;
  justify-content: space-between;
  background-color: #000000;
  height: 100px;

color: #FFFFFF;
margin-bottom: 5%;
border-bottom: 2px solid #000000;
}
</style>
<template>
  <div>
    <div class="modal-flex-text">
      <h2 class="modal-flex-text_title">{{ sample_data.title }}</h2>
      <div class="modal-flex-text_content">
        {{ '日付 : ' + sample_data.date }}
            <br>
        {{ '概要 : ' + sample_data.overview }}
      </div>
      <p>modalText.body　本文を入力</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sample_data: {
        title: 'タイトルです',
        date: '2019-12-28',
        overview: 'この作品の概要です。',
      }
      /*
      [
        {title: 'タイトルです',
          date: '2019-12-28',
          overview: 'この作品の概要です。',
        },
        {tit le: 'タイトルです',
          date: '2019-12-28',
          overview: 'この作品の概要です。',
        }
      ]*/
    }
  }
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
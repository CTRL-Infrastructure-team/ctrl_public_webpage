<template>
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="Please enter a keyword"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.title"
    >
    </el-option>
  </el-select>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      options: [],
      value: [],
      list: [],
      loading: false
    };
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        console.log(query);
        this.loading = true;
        axios
          .post(
            "/api/pastworksearch",
            { serch: query },
            {
              headers: { "Content-Type": "application/json" }
            }
          )
          .then(res => {
            this.loading = false;
            console.log(res.data);
            this.options = res.data;
          })
          .catch(err => {
            console.log(err, "this is err");
          });
      } else {
        this.options = [];
      }
    }
  }
};
</script>
<style scoped></style>

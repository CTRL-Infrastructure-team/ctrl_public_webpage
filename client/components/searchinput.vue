<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  ></el-autocomplete>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      links: [],
      state: "",
      timeout: null
    };
  },
  methods: {
    querySearchAsync(query, cb) {
      if (query !== "") {
        this.loading = true;
        axios
          .post(
            "/api/pastworksearch",
            { search: query },
            {
              headers: { "Content-Type": "application/json" }
            }
          )
          .then(res => {
            console.log(cb, res.data);
            let data = res.data.map(item => {
              return {
                value: item.title,
                link: `/pastWorks/${item.id}`
              };
            });
            cb(data);
          })
          .catch(err => {
            console.log(err, "this is err");
          });
      } else {
        this.options = [];
      }
    },
    handleSelect(item) {
      this.$router.push(item.link);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  position: absolute;
  height: 100%;
  clear: #f0f0f0;
  right: 0;
}
</style>

export default {
  data() {
    return {
      innerWidth: 0
    };
  },
  mounted() {
    window.addEventListener("resize", this._windowResize);
    this._windowResize();
  },
  beforeDestroy() {
    window.addEventListener("resize", this._windowResize);
  },
  methods: {
    _windowResize() {
      return (this.innerWidth = window.innerWidth);
    }
  }
};

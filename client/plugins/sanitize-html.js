import Vue from "vue"
import sanitizeHtml from "sanitize-html"

export default () => {
    Vue.prototype.$sanitize = sanitizeHtml;
}
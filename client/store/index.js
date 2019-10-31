import Vuex from 'vuex';

export const state = () => ({
  isguideFlug: false,
  created: true
})

export const mutations = {
  //フッターアニメーション制御 nuxt.config.jsで発火
  doFooter: function (state) {
    state.created = !state.created;
  }
}

import Vuex from 'vuex';

export const state = () => ({
  isguideFlug: false,
  created: false
})

export const mutations = {
  doGuideflugOn: function (state) {
    console.log(state.isguideFlug)
    state.isguideFlug = !state.isguideFlug;
  },
  doFooter: function (state) {
    state.created = !state.created;
  }
}
export const getters = {
  guideFlug: state => state.isguideFlug
}

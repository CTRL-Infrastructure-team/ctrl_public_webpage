import Vuex from 'vuex';

export const state = () => ({
  isguideFlug: false
})

export const mutations = {
  doGuideflugOn: function (state) {
    console.log(state.isguideFlug)
    state.isguideFlug = !state.isguideFlug;
  }
}
export const getters = {
  guideFlug: state => state.isguideFlug
}

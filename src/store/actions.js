// https://vuex.vuejs.org/en/actions.html

export default {
  setGroupName({ commit }, groupName) {
    commit('setGroupName', groupName);
  },
  setChatContent({ commit }, chatContent) {
    commit('setChatContent', chatContent);
  },
};

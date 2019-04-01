// https://vuex.vuejs.org/en/mutations.html
import Vue from 'vue';

export default {
  setGroupName(state, groupName) {
    Vue.set(state, 'groupName', groupName);
  },
  setChatContent(state, chatContent) {
    Vue.set(state, 'chatContent', chatContent);
  },
  setChatSize(state, chatSize) {
    Vue.set(state, 'chatSize', chatSize);
  },
};

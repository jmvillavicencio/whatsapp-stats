// https://vuex.vuejs.org/en/actions.html
import { loadScript } from '../api/generateStats';

export default {
  setGroupName({ commit }, groupName) {
    commit('setGroupName', groupName);
  },
  setChat({ commit }, { text, size }) {
    loadScript(text);
    commit('setChatContent', text);
    commit('setChatSize', size);
  },
};

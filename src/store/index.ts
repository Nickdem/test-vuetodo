import { createTodoLC, getTodosLC } from "@/utils/requests";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    loading: true,
    error: false,
    filter: "",
  },
  getters: {
    items: (s) => s.items,
    loading: (s) => s.loading,
    error: (s) => s.error,
    filter: (s) => s.filter,
  },
  mutations: {
    setItems: (s, values) => {
      s.items = values;
    },
    setLoading: (s, value) => {
      s.loading = value;
    },
    setError: (s, value) => {
      s.error = value;
    },
    setFilter: (s, value) => {
      s.filter = value;
    },
  },
  actions: {
    async fetchItems({ commit, dispatch }, columnName) {
      try {
        const items = await getTodosLC(columnName);
        // commit("setItems", items);

        return items;
      } catch (e) {
        console.log(e);
      }
    },
    async createItem({ commit, dispatch }, item) {
      const todo = await createTodoLC(item);
      return todo;
    },
    changeFilter({ commit }, value) {
      commit("setFilter", value);
    },
  },
  modules: {},
});

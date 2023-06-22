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
    selectedTodo: {},
  },
  getters: {
    items: (s) => s.items,
    loading: (s) => s.loading,
    error: (s) => s.error,
    filter: (s) => s.filter,
    selectedTodo: (s) => s.selectedTodo,
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
    setSelectedTodo: (s, value) => {
      s.selectedTodo = value;
    },
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const items = await getTodosLC();
        commit("setItems", items);
      } catch (e) {
        console.log(e);
      }
    },
    async createItem({ commit, state }, item) {
      try {
        const todo = await createTodoLC(item);
        commit("setItems", [todo, ...state.items]);
      } catch (e) {
        console.log(e);
      }
    },
    changeFilter({ commit }, value) {
      commit("setFilter", value);
    },
    async selectItem({ commit }, item) {
      commit("setSelectedTodo", item);
    },
  },
  modules: {},
});

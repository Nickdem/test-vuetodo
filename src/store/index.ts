import { IStringObj, ITodoObj } from "@/utils/interfaces";
import {
  changeTodoLC,
  createTodoLC,
  deleteTodoLC,
  getTodosLC,
  getUserLC,
  loginUserLC,
  logoutUserLC,
  regUserLC,
} from "@/utils/requests";
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
    user: "",
  },
  getters: {
    items: (s) => s.items,
    loading: (s) => s.loading,
    error: (s) => s.error,
    filter: (s) => s.filter,
    selectedTodo: (s) => s.selectedTodo,
    user: (s) => s.user,
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
    setUser: (s, value) => {
      s.user = value;
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
    async changeItem({ commit, state }, item) {
      const idx = await changeTodoLC(item);

      commit("setItems", [
        ...state.items.slice(0, idx),
        item,
        ...state.items.slice(idx + 1),
      ]);
      commit("setSelectedTodo", item);
    },
    async deleteItem({ commit, state }, itemId) {
      try {
        const id = await deleteTodoLC(itemId);
        commit(
          "setItems",
          state.items.filter((item: ITodoObj) => item.id !== itemId)
        );
        commit("setSelectedTodo", {});
      } catch (e) {
        console.log(e);
      }
    },
    async regUser({ commit }, name) {
      try {
        const res = await regUserLC(name);
        commit("setUser", res);
      } catch (e) {
        console.log(e);
      }
    },
    async loginUser({ commit }, name) {
      try {
        const res = await loginUserLC(name);
        commit("setUser", res);
      } catch (e) {
        console.log(e);
      }
    },
    async logoutUser({ commit }) {
      try {
        await logoutUserLC();
        commit("setUser", "");
      } catch (e) {
        console.log(e);
      }
    },
    async getUser({ commit }) {
      try {
        const name = await getUserLC();
        commit("setUser", name);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});

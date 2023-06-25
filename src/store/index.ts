import { IStringObj, ITodoObj } from "@/utils/interfaces";
import {
  changeTodoLC,
  createTodoLC,
  deleteTodoLC,
  getTodosLC,
  getUserLC,
  getUsersLC,
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
    message: "",
    filter: "",
    selectedTodo: {},
    user: "",
    users: [],
  },
  getters: {
    items: (s) => s.items,
    loading: (s) => s.loading,
    message: (s) => s.message,
    filter: (s) => s.filter,
    selectedTodo: (s) => s.selectedTodo,
    user: (s) => s.user,
    users: (s) => s.users,
  },
  mutations: {
    setItems: (s, values) => {
      s.items = values;
    },
    setLoading: (s, value) => {
      s.loading = value;
    },
    setMessage: (s, value) => {
      s.message = value;
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
    setUsers: (s, value) => {
      s.users = value;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit("setMessage", "");
    },
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
        commit("setMessage", "Вы успешно создали задачу");
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
      commit("setMessage", "Вы успешно изменили задачу");
    },
    async deleteItem({ commit, state }, itemId) {
      try {
        const id = await deleteTodoLC(itemId);
        commit(
          "setItems",
          state.items.filter((item: ITodoObj) => item.id !== itemId)
        );
        commit("setSelectedTodo", {});
        commit("setMessage", "Вы удалили задачу");
      } catch (e) {
        console.log(e);
      }
    },
    async regUser({ commit }, name) {
      try {
        const res = await regUserLC(name);
        if (res == "") {
          commit("setMessage", "Такой пользователь уже есть");
          return;
        }
        commit("setUser", res);
        commit("setMessage", "Вы успешно зарегестрировались");
      } catch (e) {
        console.log(e);
      }
    },
    async loginUser({ commit }, name) {
      try {
        const res = await loginUserLC(name);
        if (res == "") {
          commit("setMessage", "Такого пользователя не существует");
          return;
        }
        commit("setUser", res);
        commit("setMessage", "Вы успешно вошли в систему");
      } catch (e) {
        console.log(e);
      }
    },
    async logoutUser({ commit }) {
      try {
        await logoutUserLC();
        commit("setUser", "");
        commit("setMessage", "Вы вышли из системы");
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
    async getUsers({ commit }) {
      try {
        const names = await getUsersLC();
        commit("setUsers", names);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});

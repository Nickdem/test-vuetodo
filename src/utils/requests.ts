import { delay, requestToTheLS } from "./helpers";
import { IStringObj, ITodoObj } from "./interfaces";

export const getTodosLC = async () => {
  const res = await delay(() => requestToTheLS("get", "todos"));
  const json = (await typeof res) === "string" ? JSON.parse(res) : [];
  return json.length ? json : [];
};

export const createTodoLC = async (item: ITodoObj) => {
  const todosJson = requestToTheLS("get", "todos");
  const todos = typeof todosJson === "string" ? JSON.parse(todosJson) : [];
  todos.unshift(item);
  await delay(() => requestToTheLS("post", "todos", todos));
  return item;
};

export const changeTodoLC = async (todoItem: ITodoObj) => {
  const todosJson = requestToTheLS("get", "todos");
  const todos = typeof todosJson === "string" ? JSON.parse(todosJson) : [];
  const idx = todos.findIndex((item: ITodoObj) => item.id === todoItem.id);
  todos[idx] = todoItem;
  await delay(() => requestToTheLS("post", "todos", todos));
  return idx;
};

export const deleteTodoLC = async (id: string) => {
  let todos = await getTodosLC();
  todos = todos.filter((item: ITodoObj) => item.id !== id);
  requestToTheLS("post", "todos", todos);
  return id;
};

export const getUsersLC = async () => {
  const res = await delay(() => requestToTheLS("get", "users"));
  const json = (await typeof res) === "string" ? JSON.parse(res) : [];
  return json.length ? json : [];
};

const checkUserReg = async (name: string) => {
  const users = await getUsersLC();

  if (users.indexOf(name) !== -1) {
    return true;
  }
  return false;
};

export const regUserLC = async (name: string) => {
  const check = await checkUserReg(name);

  if (check) {
    return "";
  } else {
    const users = await getUsersLC();
    users.push(name);
    await delay(() => requestToTheLS("post", "users", users));
    requestToTheLS("post", "activeUser", name);
    return name;
  }
};

export const loginUserLC = async (name: string) => {
  const check = await checkUserReg(name);

  if (!check) {
    return "";
  } else {
    requestToTheLS("post", "activeUser", name);
    return name;
  }
};

export const logoutUserLC = async () => {
  await delay(() => requestToTheLS("remove", "activeUser"));
  return;
};

export const getUserLC = async () => {
  const user = await delay(() => requestToTheLS("get", "activeUser"));
  const json = (await typeof user) === "string" ? JSON.parse(user) : "";
  return json;
};

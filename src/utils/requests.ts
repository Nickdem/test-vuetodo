import { delay, requestToTheLS } from "./helpers";
import { ITodoObj } from "./interfaces";

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
  const todosJson = requestToTheLS("get", "todos");
  let todos = typeof todosJson === "string" ? JSON.parse(todosJson) : [];

  todos = todos.filter((item: ITodoObj) => item.id !== id);

  await delay(() => requestToTheLS("post", "todos", todos));
  return todos;
};

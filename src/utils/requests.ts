import { delay, requestToTheLS } from "./helpers";
import { ITodoObj } from "./interfaces";

export const getTodosLC = async (name: string) => {
  const res = await delay(() => requestToTheLS("get", "todos"));
  const json = (await typeof res) === "string" ? JSON.parse(res) : [];
  return json.length
    ? json.filter((item: ITodoObj) => item.status === name)
    : [];
};

export const createTodoLC = async (item: ITodoObj) => {
  const todosJson = requestToTheLS("get", "todos");
  const todos = typeof todosJson === "string" ? JSON.parse(todosJson) : [];
  todos.push(item);
  await delay(() => requestToTheLS("post", "todos", todos));
  return item;
};

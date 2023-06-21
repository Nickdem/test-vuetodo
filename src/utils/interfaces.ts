interface IStringObj {
  [key: string]: string;
}

interface ITodoObj {
  title: string;
  description: string;
  id: string;
  status: string;
  comments: Array<string>;
}

export { ITodoObj, IStringObj };

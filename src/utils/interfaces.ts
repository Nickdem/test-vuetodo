export interface IStringObj {
  [key: string]: string;
}

export interface ITodoObj {
  title: string;
  description: string;
  id: string;
  status: string;
  comments: Array<string>;
}

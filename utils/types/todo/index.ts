export enum TodoType {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface Todo {
  todo?: string;
  _id: string;
  todoType: TodoType;
}

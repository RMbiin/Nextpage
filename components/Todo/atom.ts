import { atom } from "recoil";

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

export const todoTypeAtom = atom<TodoType>({
  key: "todoTypeAtom",
  default: TodoType.TODO,
});

export const todoListAtom = atom<Todo[]>({
  key: "todoListAtom",
  default: [],
});

import { atom } from "recoil";
import { TodoType } from "@/utils";

export const todoTypeAtom = atom<TodoType>({
  key: "todoTypeAtom",
  default: TodoType.TODO,
});

import { useRecoilValue } from "recoil";
import { todoTypeAtom } from "./atom";
import TodoItem from "./TodoItem";
import { useTodo } from "@/utils";

const ToDoList = () => {
  const todoType = useRecoilValue(todoTypeAtom);
  const { data } = useTodo(todoType);

  return (
    <>
      {data?.map((item) => (
        <TodoItem key={item._id} {...item} />
      ))}
    </>
  );
};

export default ToDoList;

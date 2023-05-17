import { useRecoilValue } from "recoil";
import { TodoType, todoTypeAtom } from "./atom";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";

const fetchTodo = async (todoType = TodoType.TODO) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_API}/api/todo?todoType=${todoType}`
  );
  const json = await response.json();
  return json;
};

const useTodo = (todoType: TodoType) => {
  return useQuery({
    queryKey: ["todo", todoType],
    queryFn: () => fetchTodo(todoType),
    staleTime: 3 * 60 * 1000,
  });
};

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

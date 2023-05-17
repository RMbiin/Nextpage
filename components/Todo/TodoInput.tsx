import { useForm } from "react-hook-form";
import { Todo, todoTypeAtom } from "./atom";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTodo = async (data: Todo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ todo: data.todo, todoType: data.todoType }),
  });
  const json = await response.json();
  return json;
};

const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

const TodoInput = () => {
  const { register, reset, handleSubmit } = useForm();
  const todoType = useRecoilValue(todoTypeAtom);
  const { mutate: createTodo } = useCreateTodo();

  const handleCreateTodo = async (data: Todo) => {
    const todo = { ...data, todoType };
    createTodo(todo);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodo)}>
        <input {...register("todo")} />
        <button>+</button>
      </form>
    </>
  );
};

export default TodoInput;

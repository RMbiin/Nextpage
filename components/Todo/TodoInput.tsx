import { useForm } from "react-hook-form";
import { todoTypeAtom } from "./atom";
import { useRecoilValue } from "recoil";
import { useCreateTodo, Todo } from "@/utils";

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

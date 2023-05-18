import { useForm } from "react-hook-form";
import { todoTypeAtom } from "./atom";
import { useRecoilValue } from "recoil";
import { useCreateTodo, Todo } from "@/utils";

interface TodoInputValue {
  todo?: string;
}

const TodoInput = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TodoInputValue>();
  const todoType = useRecoilValue(todoTypeAtom);
  const { mutate: createTodo } = useCreateTodo();

  const handleCreateTodo = async (data: Todo) => {
    const todo = { ...data, todoType };
    createTodo(todo);
    reset();
  };

  const handleError = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (value === "") {
      setError("todo", { type: "required", message: "할 일을 입력하세요" });
    } else {
      clearErrors();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodo)}>
        <input
          {...register("todo", {
            required: true,
            onChange: handleError,
          })}
          placeholder="Write a to do"
        />
        <button>+</button>
        <div style={{ color: "red" }}>{errors?.todo?.message}</div>
      </form>
    </>
  );
};

export default TodoInput;

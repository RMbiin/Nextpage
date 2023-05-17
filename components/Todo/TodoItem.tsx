import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, TodoType } from "./atom";

const mutateTodo = async (todo: Todo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(todo),
  });
  const json = await response.json();
  return json;
};

const deleteTodo = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  const json = response.json();
  return json;
};

const useChangeType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

const TodoItem = (props: Todo) => {
  const { _id, todo, todoType } = props;
  const { mutate: mutateType } = useChangeType();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleTypeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name as TodoType;
    mutateType({ _id, todo, todoType: type });
  };

  const handleDeleteClick = () => deleteTodo(_id);

  return (
    <>
      <div>
        <span>{todo}</span>
        <span
          onClick={handleDeleteClick}
          style={{ color: "red", margin: "0px 10px" }}
        >
          X
        </span>

        {todoType !== TodoType.DOING && (
          <button name={TodoType.DOING} onClick={handleTypeClick}>
            Doing
          </button>
        )}

        {todoType !== TodoType.TODO && (
          <button name={TodoType.TODO} onClick={handleTypeClick}>
            Todo
          </button>
        )}

        {todoType !== TodoType.DONE && (
          <button name={TodoType.DONE} onClick={handleTypeClick}>
            Done
          </button>
        )}
      </div>
    </>
  );
};

export default TodoItem;

import { Todo, TodoType } from "./atom";
import { useChangeType, useDeleteTodo } from "@/utils";

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

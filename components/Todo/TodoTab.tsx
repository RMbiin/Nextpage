import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoTypeAtom } from "./atom";
import { TodoType } from "@/utils";

const Wrapper = styled.div`
  .selected {
    color: red;
  }
`;

const TodoTab = () => {
  const [todoType, setTodoType] = useRecoilState(todoTypeAtom);

  const handleTodoType = (event: React.MouseEvent) => {
    const selectedType = event.currentTarget.id as TodoType;
    setTodoType(() => selectedType);
  };

  return (
    <>
      <Wrapper>
        <span
          id={TodoType.TODO}
          onClick={handleTodoType}
          className={todoType === TodoType.TODO ? "selected" : ""}
        >
          할 일
        </span>
        <span
          id={TodoType.DOING}
          onClick={handleTodoType}
          className={todoType === TodoType.DOING ? "selected" : ""}
        >
          작업중
        </span>
        <span
          id={TodoType.DONE}
          onClick={handleTodoType}
          className={todoType === TodoType.DONE ? "selected" : ""}
        >
          완 료
        </span>
      </Wrapper>
    </>
  );
};

export default TodoTab;

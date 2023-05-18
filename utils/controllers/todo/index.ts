import { Todo, TodoType } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// POST 투두 리스트
const createTodo = async (data: Todo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ todo: data.todo, todoType: data.todoType }),
  });
  const json = await response.json();
  return json;
};

// POST 투두 리스트 Hook
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

// PUT 투두 리스트
const mutateTodo = async (todo: Todo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(todo),
  });
  const json = await response.json();
  return json;
};

// PUT 투두 리스트 Hook
export const useChangeType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

// DELETE 투두 리스트
const deleteTodo = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/api/todo`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  const json = response.json();
  return json;
};

// DELETE 투두 리스트 Hook
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todo"]),
  });
};

// GET 투두 리스트
const fetchTodo = async (todoType = TodoType.TODO) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_API}/api/todo?todoType=${todoType}`
  );
  const json = await response.json();
  return json;
};

// GET 투두 리스트 Hook
export const useTodo = (todoType: TodoType) => {
  return useQuery({
    queryKey: ["todo", todoType],
    queryFn: () => fetchTodo(todoType),
    staleTime: 3 * 60 * 1000,
  });
};

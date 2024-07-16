import axiosApi from '../../axiosApi';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoResponse {
    [key: string]: Omit<Todo, 'id'>;
}

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axiosApi.get<TodoResponse>('/todos.json');
    const todos = response.data
        ? Object.entries(response.data).map(([id, todo]) => ({ id, ...todo }))
        : [];
    return todos;
};

export const addTodo = async (title: string): Promise<Todo> => {
    const response = await axiosApi.post<{ name: string }>('/todos.json', { title, completed: false });
    return { id: response.data.name, title, completed: false };
};

export const toggleTodo = async (id: string, completed: boolean): Promise<{ id: string; completed: boolean }> => {
    await axiosApi.patch(`/todos/${id}.json`, { completed });
    return { id, completed };
};

export const deleteTodo = async (id: string): Promise<string> => {
    await axiosApi.delete(`/todos/${id}.json`);
    return id;
};

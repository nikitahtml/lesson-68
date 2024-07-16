import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, toggleTodo, deleteTodo, Todo } from './todosAPI';

interface TodosState {
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    status: 'idle',
    error: null,
};

export const fetchTodosThunk = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
    return await fetchTodos();
});

export const addTodoThunk = createAsyncThunk<Todo, string>('todos/addTodo', async (title) => {
    return await addTodo(title);
});

export const toggleTodoThunk = createAsyncThunk<{ id: string; completed: boolean }, { id: string; completed: boolean }>(
    'todos/toggleTodo',
    async ({ id, completed }) => {
        return await toggleTodo(id, completed);
    }
);

export const deleteTodoThunk = createAsyncThunk<string, string>('todos/deleteTodo', async (id) => {
    await deleteTodo(id);
    return id;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodosThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleTodoThunk.fulfilled, (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index].completed = action.payload.completed;
                }
            })
            .addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todosSlice.reducer;

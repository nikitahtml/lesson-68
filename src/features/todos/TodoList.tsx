import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchTodosThunk } from './todosSlice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const status = useSelector((state: RootState) => state.todos.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodosThunk());
        }
    }, [status, dispatch]);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
};

export default TodoList;
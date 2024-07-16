import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoThunk, deleteTodoThunk, Todo } from './todosSlice';

const TodoItem: React.FC<Todo> = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodoThunk({ id, completed: !completed }));
    };

    const handleDelete = () => {
        dispatch(deleteTodoThunk(id));
    };

    return (
        <li>
            <input type="checkbox" checked={completed} onChange={handleToggle} />
            {title}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TodoItem;
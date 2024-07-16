import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoThunk } from './todosSlice';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(addTodoThunk(title));
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
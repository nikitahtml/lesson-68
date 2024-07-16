import React from 'react';
import TodoList from './features/todos/TodoList';
import TodoForm from './features/todos/TodoForm';

const App: React.FC = () => {
    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default App;

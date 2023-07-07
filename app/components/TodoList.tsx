"use client";
import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import TodoItem  from './TodoItem';

export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
}

enum TaskFilter {
  All = 'All Tasks',
  Completed = 'Completed Tasks',
  Pending = 'Pending Tasks',
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.All);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() !== '' && inputDescription.trim() !== '') {
      if (editTodo) {
        const updatedTodo: Todo = {
          id: editTodo.id,
          text: inputText.trim(),
          description: inputDescription.trim(),
          completed: editTodo.completed,
        };

        const updatedTodos = todos.map(todo =>
          todo.id === editTodo.id ? updatedTodo : todo
        );

        setTodos(updatedTodos);
        setEditTodo(null);
      } else {
        const newTodo: Todo = {
          id: new Date().getTime(),
          text: inputText.trim(),
          description: inputDescription.trim(),
          completed: false,
        };

        setTodos([...todos, newTodo]);
      }

      setInputText('');
      setInputDescription('');
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodoItem = (todo: Todo) => {
    setEditTodo(todo);
    setInputText(todo.text);
    setInputDescription(todo.description);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    switch (taskFilter) {
      case TaskFilter.Completed:
        return todos.filter(todo => todo.completed);
      case TaskFilter.Pending:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div>
      <div className='
      bg-primary-dark 
      flex flex-col 
      items-center p-10 relative'>
        <input
          className='
          text-boxs p-3 text-xl 
          border-b-2 border-white
           text-white focus:outline-0 
           bg-transparent my-2'
          placeholder='Title'
          type='text'
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <textarea
          className='text-boxs p-3 
          text-xl border-b-2 
          border-white text-white
           focus:outline-0 bg-transparent my-2'
          placeholder='Description'
          rows={5}
          value={inputDescription}
          onChange={e => setInputDescription(e.target.value)}
        ></textarea>

        <div className='drop-btn'>
          <select
            className='
            border-2 
            border-rose-600 
            outline-none p-2 text-m'
            value={taskFilter}
            onChange={e => setTaskFilter(e.target.value as TaskFilter)}
          >
            {Object.values(TaskFilter).map(filter => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>

          <button
            className='
            bg-rose-600 text-3xl 
            text-white p-3 rounded-full'
            onClick={addTodo}
          >
            {editTodo ? <FaSave /> : <IoMdAdd />}
          </button>
        </div>
      </div>

      <div
        className='
        flex flex-col 
        items-center my-10'
        style={{ maxHeight: '50vh', overflow: 'auto', padding: '10px' }}
      >
        {filterTodos().length === 0 ? (
          <h1 className='text-3xl font-semibold'>No task found</h1>
        ) : (
          filterTodos().map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              editTodoItem={editTodoItem}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;

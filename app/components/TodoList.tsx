"use client";
import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'

interface Todo {
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
      <div className='bg-primary-dark 
      flex flex-col 
      items-center 
      p-10 relative'>

        <input
          className=' text-boxs
           p-3 text-xl border-b-2
           border-white text-white 
           focus:outline-0 
           bg-transparent my-2'

          placeholder='Title'
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <textarea
          className='text-boxs
           p-3 text-xl border-b-2
           border-white
            text-white 
            focus:outline-0 
            bg-transparent my-2'

          placeholder='Description'
          rows={5}
          value={inputDescription}
          onChange={e => setInputDescription(e.target.value)}
        ></textarea>

        <button
          className='add-btn bg-rose-600 text-3xl text-white p-3 rounded-full'
          onClick={addTodo}>{editTodo ? 'Save' : <IoMdAdd />}
        </button>

      </div>


      <div 
      className='flex flex-col items-center my-10' 
      style={{ maxHeight: "50vh", overflow: "auto", padding: "10px" }}>

        {filterTodos().map(todo => (
          <div key={todo.id} 
          className=' text-boxs p-2 m-2 shadow-2xl' >

            <div className='flex justify-between items-center'>
              <input
                className='w-6 h-6'
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              <h3 style={{ 
                fontSize: "25px", fontWeight: "600",
                color: todo.completed ? 'gray' : 'black',
                textDecoration: todo.completed ? 'line-through' : 'none'
                }}>
                {todo.text}
              </h3>
              <div>
              <button className='text-3xl'
              style={{color: todo.completed ? 'gray' : 'black',}}
                onClick={() => deleteTodo(todo.id)}
              >
                <MdDelete />
              </button>
              <button
              style={{color: todo.completed ? 'gray' : 'black',}}
                className='text-3xl'
                onClick={() => editTodoItem(todo)}
              >
                <FaEdit />
              </button>
              </div>
            </div>
            <div>

              <p style={{ 
                color: todo.completed ? 'gray' : 'black',
                textDecoration: todo.completed ? 'line-through' : 'none' 
                }}>{todo.description}</p>

            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default TodoList;

"use client";
import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

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
      <div>
        <div className='my-2'>
          <input
            className='p-3 text-xl border-2 border-yellow-500 focus:outline-green-500 rounded'
            style={{ width: "350px" }}
            placeholder='Please Enter Your Text'
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className='p-3 text-xl border-2 border-yellow-500 focus:outline-green-500 rounded'
            placeholder='Please Enter Description'
            style={{ width: "350px" }}
            rows={5}
            value={inputDescription}
            onChange={e => setInputDescription(e.target.value)}
          ></textarea>
        </div>

        <div>

          <select
            className='p-3 text-xl border-2 border-yellow-500 focus:outline-green-500 rounded'
            value={taskFilter}
            onChange={e => setTaskFilter(e.target.value as TaskFilter)}
          >
            {Object.values(TaskFilter).map(filter => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>
          <button className='bg-yellow-500 mx-2 p-3 rounded-sm' onClick={addTodo}>{editTodo ? 'Save' : 'Add Todo'}</button>
        </div>
      </div>



<div style={{display:"flex", flexDirection:"column", alignItems:"center", margin:"10px 0"}}>
<div style={{ maxHeight: "50vh", overflow: "auto", padding:"10px" }}>
        {filterTodos().map(todo => (
          <div key={todo.id} className='bg-yellow-500 p-2 m-2 flex items-center gap-2 justify-between' style={{width:"350px"}}>
            <input
            className='w-8 h-8'
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <div>
              <h3 style={{ fontSize: "25px", fontWeight: "600", textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </h3>
              <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.description}</p>
            </div>
            <div>
              <button className='text-4xl'
                onClick={() => deleteTodo(todo.id)}
              >
                <MdDelete />
              </button>
              <button
                className='text-4xl'
                onClick={() => editTodoItem(todo)}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
</div>
    </div>
  );
};

export default TodoList;

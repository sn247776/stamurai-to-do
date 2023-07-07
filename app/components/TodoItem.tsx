"use client";

import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Todo } from './TodoList';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  editTodoItem: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  editTodoItem,
  deleteTodo,
}) => {
  return (
    <div key={todo.id} 
    className='text-boxs 
    p-5 m-2 shadow-md border-2'>

      <div className='
      flex justify-between 
      items-center'>
        
        <input
          className='w-6 h-6'
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />

        <h3
          style={{
            fontSize: '25px',
            fontWeight: '600',
            color: todo.completed ? 'gray' : 'black',
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </h3>
        <div>
          <button
            className={`text-3xl ${
              todo.completed ? 'text-rose-400' : 'text-rose-600'
            }`}
            onClick={() => editTodoItem(todo)}
          >
            <FaEdit />
          </button>
          <button
            className={`text-3xl ${
              todo.completed ? 'text-rose-400' : 'text-rose-600'
            }`}
            onClick={() => deleteTodo(todo.id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <div>
        <p
          className='p-2 text-center'
          style={{
            color: todo.completed ? 'gray' : 'black',
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.description}
        </p>
      </div>
    </div>
  );
};

export default TodoItem;

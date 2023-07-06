import TodoList from './components/TodoList';

const TodoPage = () => {
  return (
    <div className='text-center'>
      <div>
      <h1 className='text-5xl font-semibold my-5'>Todo App</h1>
      <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;

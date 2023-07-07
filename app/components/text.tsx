<div>
<div>


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
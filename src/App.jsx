import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import { v4 as uuidv4 } from 'uuid';
function App() {

  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
      }

  }, [])

  
  const savetols = () => {
     localStorage.setItem("todos",JSON.stringify(Todos))
  }



  const HandleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, IsComplete: false }]);
    setTodo("");
   savetols();
  };
  const HandleInputChange = (e) => {
    setTodo(e.target.value);
  };
  const HandleTick = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].IsComplete = !newTodos[index].IsComplete;
    setTodos(newTodos)
     savetols();
 


  };
  const HandleEdit = (id) => {
let t = Todos.filter(i=>i.id === id)
setTodo(t[0].Todo);
let newTodos = Todos.filter((items)=>{
  return items.id !== id;
})
setTodos(newTodos);
 savetols();

  };
  const HandleDelete = (id) => {
let newTodos = Todos.filter((items)=>{
  return items.id !== id;
})
setTodos(newTodos);

 savetols();
  };

  return (
    <>
      <Header />
      <div className='w-1/2 mx-auto my-5 rounded-2xl bg-violet-300  min-h-96 p-5 ' >
        <div className='flex justify-between items-center gap-2.5'>
          <input onChange={HandleInputChange} value={Todo} type="text" placeholder='Add your task' className='flex-1 w-full py-1.5 px-1 font-medium focus:outline-none border rounded-2xl' />
          <button onClick={HandleAdd} className='bg-violet-800  py-1.5 rounded-2xl cursor-pointer font-bold text-white w-14'>Save</button>
        </div>
        {/* <div className='font-bold pt-2.5 text-2xl'>Your-Todos</div> */}
        {Todos.length === 0 && <div className='text-2xl pt-2.5'>No Todos Yet</div>}
        <div className='pt-5'>
          {Todos.map(item => {

            return <div key={item.id} className='flex justify-between items-center pb-2.5'>
              
              <div className='flex items-center gap-2.5'>

                <input
                  type="checkbox"
                  checked={item.IsComplete}
                  name={item.id}
                  onChange={HandleTick}
                  className='cursor-pointer accent-violet-800 w-4 h-4'
                />
                <div className={`font-medium ${item.IsComplete ? "line-through text-gray-600" : ""}`}>{item.Todo}</div>
              </div>
              <div className='flex gap-2.5'>
                <button onClick={()=>{HandleEdit(item.id)}} className='bg-violet-800  py-1.5 rounded-2xl cursor-pointer font-bold text-white w-14'>Edit</button>
                <button onClick={()=>{HandleDelete(item.id)}} className='bg-violet-800  py-1.5 rounded-2xl cursor-pointer font-bold text-white w-14'>Dele</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
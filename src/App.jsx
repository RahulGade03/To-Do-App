import React from 'react'
import { useState, useRef } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [toggle, setToggle] = useState(false)
  const inputRef = useRef(null)

  useEffect (() => {
    setTimeout(() => {
      console.log(JSON.parse(localStorage.getItem('tasks')))
        localStorage.setItem("tasks", JSON.stringify(tasks))
        console.log(JSON.parse(localStorage.getItem('tasks')))
      }, 1000)
  }, [tasks])

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('tasks')))
    if (localStorage.getItem('tasks')) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    }
  },[])

  function handleChange(e) {
    setTask(e.target.value)
  }

  function handleAdd() {
    setTasks([...tasks, { id: uuidv4(), task: task, isCompleted: false }])
    setTask('')
  }

  function handleEdit(id) {
    let tempTask = tasks.findIndex((task) => {
      return task.id === id
    })

    setTask(tasks[tempTask].task)
    let newTasks = tasks.filter((task) => {
      return task.id !== id
    })
    setTasks(newTasks)
  }

  function handleDelete(id) {
    let newTasks = tasks.filter((task) => {
      return task.id !== id
    })
    console.log(newTasks)
    setTasks(newTasks);
  }

  function handleCheckBox(e) {
    let id = e.target.name;
    let index = tasks.findIndex((task) => {
      return task.id === id
    })
    let tempTasks = [...tasks]
    tempTasks[index].isCompleted = !tempTasks[index].isCompleted
    setTasks(tempTasks)
  }

  const Todo = ({ props }) => {
    return ((toggle || !props.isCompleted) && (
      <div key={props.id} className="flex justify-between items-center my-3 w-[90%]">
        <div className='flex gap-5'>
        <input type="checkbox" name={props.id} onChange={handleCheckBox} className='cursor-pointer scale-150' />
        <div className={props.isCompleted ? 'line-through' : ''}>{props.task}</div>
        </div>
        <div className='flex gap-5'>
          <button className="bg-indigo-900 px-5 rounded-2xl text-white py-1 cursor-pointer" onClick={() => { handleEdit(props.id) }}>Edit</button>
          <button className="bg-indigo-900 px-5 rounded-2xl text-white py-1 cursor-pointer" onClick={() => { handleDelete(props.id) }}>Delete</button>
        </div>
      </div>
    ))
  }


  return (
    <div className="flex justify-center items-start min-h-screen bg-indigo-300">
      <div className="bg-indigo-400 max-w-[95vw] md:min-w-[500px] min-h-[500px] rounded-2xl my-4">
        <h1 className="text-3xl font-bold text-center py-5 max-w-[98%] text-2xl">
          GoatTask - Your Task Planner
        </h1>

        <div className="container my-5 w-[100%]">
          <div className="insert w-[100%] flex justify-center gap-5 border-t-2 border-b-2 py-2">
            <input type="text" placeholder='Enter your task...' className='bg-white text-black rounded-2xl p-2 md:p-4 ' value={task} onChange={handleChange} />
            <button className='bg-indigo-900 md:px-10 px-6 rounded-2xl text-white disabled:bg-indigo-400 disabled:text-indigo-400 cursor-pointer' disabled={task.length<3} onClick={handleAdd}>Add</button>
          </div>

          <div className="tasks flex flex-col items-center">
            <label className='flex items-center justify-center gap-5 w-[70%]'>
              <input type="checkbox" checked={toggle} onClick={() => {setToggle(!toggle)}} ref={inputRef} className='scale-150'/>
              <span className='text-xl'>Show Finished</span>
            </label>
            <div className='border-1 w-[100%]'></div>
            {tasks.map((item) => {
              return (
                <Todo props={item} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
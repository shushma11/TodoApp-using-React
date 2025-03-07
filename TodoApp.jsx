import { useEffect, useState } from "react";
import './TodoApp.css';
export default function TodoApp(){
    const [tasks,setTasks]=useState(()=>{
        const savedTasks=localStorage.getItem("tasks");
        return savedTasks?JSON.parse(savedTasks):[];
    })
    const [taskInput,setTaskInput]=useState("");
    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks])
    function handleAddTask(){
        if(taskInput.trim()==="") return;
        setTasks(t=>[...t,{text:taskInput,completed:false}]);
        setTaskInput("");
    }
    function handleCompleted(index){
        setTasks(tasks.map((task,i)=> 
            (i===index)?{...task,completed:true}:task
        ));
    }
    function handleDelete(index){
        setTasks(tasks.filter((_,i)=>(i!==index)));
    }
    return(
        <>
            <h1>TODO APP</h1>
            <input 
                type="text"
                className="inpbox"   
                placeholder="Enter a task"
                value={taskInput}
                onChange={(e)=>setTaskInput(e.target.value)}/>
            <button onClick={handleAddTask}>Add Task</button>
            <ol>
                {tasks.map((task,index)=> (
                    <li 
                        key={index}
                        style={{
                            textDecoration: (task.completed === true) ?"line-through":"none",
                            opacity: (task.completed === true)? "0.6":"1"
                        }}
                    >
                    {task.text} 
                    <div>
                        <button onClick={()=>handleCompleted(index)} className="li_btn">
                            Completed
                        </button>
                        <button onClick={()=>handleDelete(index)}>
                            Delete
                        </button>
                    </div>
                    
                    </li>
                ))}
            </ol>
        </>
    );
}
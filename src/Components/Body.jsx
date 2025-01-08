import { useState, useEffect, useRef } from "react"
import Todo from "./Todo";

export default function Body() {
    const titleRef = useRef(null);
    const updateRefs = useRef([]);
    const [todos, setTodos] = useState([]);

    const setLS = (arr) => {
        localStorage.setItem("todos", JSON.stringify(arr));
    }

    const handleCheckbox = (index) => {
        let newArr = [...todos]
        newArr[index].isChecked = !newArr[index].isChecked
        setTodos(newArr)
        setLS(newArr)
    }

    const handleDelete = (index) => {
        const newArr = todos.filter((_todo, i) => i !== index)
        setTodos(newArr)
        setLS(newArr)
    }

    const handleEdit = (index) => {
        const newArr = [...todos]
        newArr[index].editing = true
        setTodos(newArr)
        setLS(newArr)
    }

    const handleSubmit = (index) => {
        if(updateRefs.current[index].value.trim()){
            const updatedTitle = updateRefs.current[index].value
            const updatedArr = [...todos]
            updatedArr[index] = {
                title: updatedTitle,
                editing: false,
                isChecked: false
            }
            setTodos(updatedArr)
            setLS(updatedArr)
        }
    }

    const addTodo = () => {
        const title = titleRef.current.value
        if (title.trim()) {
            const newArr = [
                ...todos,
                {
                    isChecked: false,
                    editing: false,
                    title: title
                }
            ]
            setTodos(newArr)
            setLS(newArr)
        }
        titleRef.current.value = ""
        titleRef.current.focus()
    }

    const removeTodo = () => {
        setTodos([])
        localStorage.removeItem("todos")
        titleRef.current.value = ""
    }

    useEffect(() => {
        const todosString = localStorage.getItem("todos");
        if (todosString)
            setTodos(JSON.parse(todosString))
    }, [])

    return (
        <main>
            <div className="handle-todo-container">
                <input
                    className="add-todo"
                    placeholder="Add todo"
                    type="text"
                    ref={titleRef}
                    onKeyDown={(e) => { if (e.key == "Enter") addTodo() }}
                />
                <button onClick={addTodo}>ADD</button>
                <button className="danger" onClick={removeTodo}>CLEAR</button>
            </div>

            {todos.length === 0 ? <div className="not-found">
                <img src="searching.png" /><br /><br />
                <p style={{ fontSize: "20px" }}>Empty...</p>
            </div> :
            <div className="todo-container">
                {todos.map((todo, index) => {
                    return <>
                        <Todo
                            key={index}
                            index={index}
                            isChecked={todo.isChecked}
                            name={todo.title}
                            editing={todo.editing}
                            handleCheckbox={handleCheckbox}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleSubmit={handleSubmit}
                            updateRefs={updateRefs}
                        />
                        <hr />
                    </>
                })}
            </div>}
        </main>
    )
}
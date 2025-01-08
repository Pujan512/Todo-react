
export default function Todo({ index,
    isChecked,
    name,
    handleCheckbox,
    handleEdit,
    handleDelete,
    handleSubmit,
    editing,
    updateRefs }) {


    return <div className="todo">
        {editing || <input type="checkbox" checked={isChecked} onChange={() => handleCheckbox(index)} />}
        {
            editing ?
                <input className="input" type="text" ref={el=>updateRefs.current[index] = el} onKeyDown={e=>{if(e.key === "Enter") handleSubmit(index)}} /> :
                <span style={{ textDecoration: isChecked ? "line-through" : "none",flexGrow:1 }}>{name}</span>
        }

        {
            isChecked ?
                <img src="delete.png" className="icon" onClick={() => handleDelete(index)} />:
                (editing ?
                    <button className="green" onClick={() => handleSubmit(index)}>Submit</button> :
                    <img src="edit.png" className="icon" onClick={() => handleEdit(index)} />)
        }
    </div>
}
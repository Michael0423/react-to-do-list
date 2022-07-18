import './ToDoItem.style.css'

import { useSelector } from 'react-redux'

const ToDoItem = ({ todo, deleteToDo }) => {
    const isLogin = useSelector((state) => state.isLogin.value)

    const { id, note, date, time } = todo

    const deleteItem = () => {
        deleteToDo((pre) => {
            return pre.filter(e => e.id !== id)
        })
    }

    return (<div className="to-do-item">
        <div>
            <div className="note">{ note }</div>
            <div className="time">Time: { date } { time }</div>
        </div>
        {
            isLogin &&
            <button className="delete-btn" onClick={deleteItem}>DELETE</button>
        }
    </div>)
}

export default ToDoItem
import { useState } from 'react'
import ToDoItem from './ToDoItem'
import './ToDo.style.css'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../reducer/LoginReducer'

import * as firebaseAPI from "../firebaseAPI"

const ToDo = ({ list = [], setList }) => {
    const isLogin = useSelector((state) => state.isLogin.value)
    const dispatch = useDispatch()

    const [addStatus, setStatus] = useState(false);
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const addToDo = () => {
        setStatus(true);
    }

    const changeNote = (e) => {
        setNote(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const changeTime = (e) => {
        setTime(e.target.value)
    }

    const closeAddDialog = () => {
        setStatus(false)
    }

    const addItem = () => {
        const newTodo = {
            id: Date.now(),
            note,
            date,
            time
        };
        Promise.resolve(firebaseAPI.addToDo(newTodo)).then(()=> {
            setList((pre) => {
                console.log(pre);
                return [
                    newTodo,
                    ...pre
                ]
            })
            closeAddDialog()
        });
        
    }
    return (<>
        <div className="to-do-list">
            <header>
                {/* <div className='log-btn'>
                    {
                        !isLogin
                            ? <input type="button" value="Login" onClick={() => dispatch(login())} />
                            : <input type="button" value="Logout" onClick={() => dispatch(logout())} />
                    }
                </div> */}
                <div className="header">
                    <h1>To Do List</h1>
                    {
                        isLogin &&
                        <div className="add-btn" onClick={addToDo}>
                            <i className='fa fa-plus' />
                        </div>
                    }
                </div>
            </header>

            <hr />

            {
                list.length > 0 ? (
                    <div className="list">
                        {
                            list.map(e => <ToDoItem key={`todo-${e.id}`} todo={e} deleteToDo={setList} />)
                        }
                    </div>
                ) : (
                    <div className='nothing'>You Have NOTHING To Do.</div>
                )
            }

        </div>


        {
            addStatus &&
            <div className='add-to-do-dialog'>
                <div className='content'>
                    <header>
                        <div onClick={closeAddDialog} className="close-btn"><i className='fa fa-times' /></div>
                    </header>
                    <div>
                        <div>Note：<input type="text" value={note} onChange={changeNote}></input></div>
                        <div>Date：<input type="date" value={date} onChange={changeDate}></input></div>
                        <div>Time：<input type="time" value={time} onChange={changeTime}></input></div>
                    </div>
                    <footer>
                        <button className='btn cancel-btn' onClick={closeAddDialog}>Cancel</button>
                        <button className='btn save-btn' onClick={addItem}>Save</button>
                    </footer>
                </div>
            </div>
        }
    </>)
}

export default ToDo
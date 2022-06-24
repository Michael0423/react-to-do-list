import { useState } from 'react'
import './App.css';
import ToDo from './components/ToDo';

function App() {
  const [list, setList] = useState([
    {
      id: 1,
      note: "AC",
      time: '2022-06-01'
    }
  ]);
  
  return (
    <div className="App">
      <ToDo list={list} setList={setList}></ToDo>
    </div>
  );
}

export default App;

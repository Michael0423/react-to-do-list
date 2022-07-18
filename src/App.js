import { useState } from 'react'

import store from './store'
import { Provider } from 'react-redux'

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
    <Provider store={store}>
      <div className="App">
        <ToDo list={list} setList={setList}></ToDo>
      </div>
    </Provider>
  );
}

export default App;

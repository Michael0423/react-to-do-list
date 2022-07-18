import { useState, useEffect } from 'react'

import store from './store'
import { Provider } from 'react-redux'

import './App.css';
import ToDo from './components/ToDo';

import * as fireaseAPI from './firebaseAPI'

function App() {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    Promise.resolve(fireaseAPI.getToDoList()).then(list => setList(list));
  });

  return (
    <Provider store={store}>
      <div className="App">
        <ToDo list={list} setList={setList}></ToDo>
      </div>
    </Provider>
  );
}

export default App;

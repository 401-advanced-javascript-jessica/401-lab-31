import React, {useState, useReducer } from 'react';

import Auth from '../auth/auth.js';

import styles from './todo.module.scss';

const initialState = {
  toDoItems: [],
};

function reducer(state, action){
  console.log(action);
  switch (action.type){
    case "submit":
      let tempItems = Object.assign([], state.toDoItems);
      tempItems.push(action.data);
      return { toDoItems: tempItems };
    case "toggle":
      return {toDoItems: action.data};
    default:
      throw new Error();
  }
}

export default function Todo(props) {

  const [item, setItem] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e) {
    e.preventDefault();
    e.target.reset();
    let newItem = { title: item, status:false };
    dispatch({ type: "submit", data: newItem });
  }

  function handleChange(e) {
    setItem( e.target.value );
  }

  function toggle(e,id){
    e.preventDefault();
    let toDoItems = state.toDoItems.map( (item,idx) =>
      idx === id ? {title:item.title, status:!item.status} : item
    );
    dispatch({ type: "toggle", data: toDoItems});
  }

    return (
      <section className={styles.todo}>

        <Auth capability="read">
          {state.toDoItems.map((item, idx) =>
            <div key={idx} onClick={(e) => toggle(e, idx)}>
              <span className={styles[`complete-${item.status}`]}> {item.title} </span>
            </div>
          )}
        </Auth>

        <Auth capability="create">
          <form onSubmit={handleForm}>
            <input
              onChange={handleChange}
              name="item"
              placeholder="Add To Do List Item Here"
            />
          </form>
        </Auth>

      </section>
    );
};


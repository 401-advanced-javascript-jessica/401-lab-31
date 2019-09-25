import React, { useState, useReducer } from 'react';

import Auth from '../auth/auth';

import styles from './todo.module.scss';

const initialState = {
  toDoItems: [],
};

function reducer(state, action) {
  console.log(action);
  let tempItems;
  switch (action.type) {
    case 'submit':
      tempItems = Object.assign([], state.toDoItems);
      tempItems.push(action.data);
      return { toDoItems: tempItems };
    case 'toggle':
      return { toDoItems: action.data };
    default:
      throw new Error();
  }
}

export default function Todo() {
  const [item, setItem] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e) {
    e.preventDefault();
    e.target.reset();
    const newItem = { title: item, status: false };
    dispatch({ type: 'submit', data: newItem });
  }

  function handleChange(e) {
    setItem(e.target.value);
  }

  function toggle(e, id) {
    e.preventDefault();
    const toDoItems = state.toDoItems.map(
      (toDo, idx) => (idx === id ? { title: toDo.title, status: !toDo.status } : toDo),
    );
    dispatch({ type: 'toggle', data: toDoItems });
  }

  return (
      <section className={styles.todo}>

        <Auth capability="read">
          {state.toDoItems.map((eachItem, idx) => <div key={idx} onClick={ (e) => toggle(e, idx)}>
              <span className={styles[`complete-${eachItem.status}`]}> {eachItem.title} </span>
            </div>)}
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
}

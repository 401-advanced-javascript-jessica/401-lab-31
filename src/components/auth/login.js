import superagent from 'superagent';
import React, { useState } from 'react';
// eslint-disable-next-line import/extensions
import { LoginContext } from './context';

const API = process.env.REACT_APP_API;

const If = (props) => {
  return props.condition ? props.children : null;
};

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'username') {
      setUserName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e, loginMethodFromContext) {
    console.log(username, password);
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then((response) => {
        const token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  }

  return (
      <LoginContext.Consumer>
        {(context) => {
          return (
            <>
              <If condition={context.loggedIn}>
                <button onClick={context.logout}>
                  Log Out
                </button>
              </If>
              <If condition={!context.loggedIn}>
                <div>
                  <form onSubmit={ (e) => handleSubmit(e, context.login)}>
                    <input
                      placeholder="username"
                      name="username"
                      onChange={handleChange}
                    />
                    <input
                      placeholder="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                    />
                    <input type="submit" value="login" />
                  </form>
                </div>
              </If>
            </>
          );
        }}
      </LoginContext.Consumer>
  );
}

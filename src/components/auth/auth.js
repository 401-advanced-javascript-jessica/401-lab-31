import React from 'react';
import PropTypes from 'prop-types';

import { LoginContext } from './context';

const If = (props) => {
  return props.condition ? props.children : null;
};

console.log('auth loaded');

export default function Auth(props) {
  console.log('AUTH RENDER');
  return (
      <LoginContext.Consumer>
        {(context) => {
          console.log(context);
          const okToRender = context.loggedIn
            && (props.capability
              ? context.user.capabilities && context.user.capabilities.includes(props.capability)
              : true);

          return <If condition={okToRender}>{props.children}</If>;
        }}
      </LoginContext.Consumer>
  );
}

Auth.propTypes = {
  capability: PropTypes.string.isRequired,
  children: PropTypes.object,
};

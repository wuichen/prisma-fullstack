import React, { useReducer } from 'react';
import { PlatformContext } from './platform.context';
type ActionType = { type: 'SET'; payload: any };

function reducer(state: any, action: ActionType): any {
  switch (action.type) {
    case 'SET':
      return { platform: action.payload.platform };
    default:
      return state;
  }
}

export const PlatformProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <PlatformContext.Provider value={{ state, dispatch }}>
      {children}
    </PlatformContext.Provider>
  );
};

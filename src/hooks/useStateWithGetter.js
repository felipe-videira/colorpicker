import { useState } from "react";

export default function useStateWithGetter (initialState) {
  const [state, setState] = useState(initialState);

  const getState = cb => {
    setState(state => {
      cb && typeof cb === 'function' && cb(state);
      return state;
    })
  }

  return [state, setState, getState];
}

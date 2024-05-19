import { useReducer } from "react";

//create your forceUpdate hook
export function useForceUpdate() {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  return forceUpdate; // update state to force render
}

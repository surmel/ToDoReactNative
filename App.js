import React from 'react';
import { TodoScreen } from "./src/features/todo/screens/todo.screen";
import { TodoContextProvider } from "./src/services/todo/todo.context";

export const App = () => {
  return (
    <TodoContextProvider>
      <TodoScreen/>
    </TodoContextProvider>

  );
};

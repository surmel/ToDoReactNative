import React, { createContext, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TodoContext = createContext(null);

export const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const add = async (todoTitle) => {
    Keyboard.dismiss();
    try {
      if (!todoTitle) {
        Alert.alert("mi ban gri asi");
        return false;
      }
      const newTodo = {
        id: uuid.v4(),
        name: todoTitle,
        isChecked: false,
      };
      const existingTodoList = await getList();

      const isTodoExist = (existingTodoList.length) ? existingTodoList.some(todo => todo.name === newTodo.name) : false;
      if (isTodoExist) {
        Alert.alert("Todo already exist");
      } else {
        await AsyncStorage.setItem("userTodo", JSON.stringify([...todoList, newTodo]));
        setTodoList([...todoList, newTodo]);
        setNewTodoName('');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userTodo");
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e.message);
    }
  };

  const setTodoName = (title) => {
    setNewTodoName(title);
  }

  const toggle = async (id, key, value) => {
    const updateTodoCheckbox = todoList.map((todo) => {
      return todo.id === id ? {...todo, [key]: value} : todo;
    });
    await AsyncStorage.setItem("userTodo", JSON.stringify(updateTodoCheckbox));
    setTodoList(updateTodoCheckbox);
  }

  const remove = async (id) => {
    const removeTodo = todoList.filter((todo) => {
      return todo.id !== id;
    })
    await AsyncStorage.setItem("userTodo", JSON.stringify(removeTodo));
    setTodoList(removeTodo);
  };

  useEffect(() => {
    getList().then((currentTodo) => {
      setTodoList(currentTodo);
    });
  }, [todoList.length]);

  return (
    <TodoContext.Provider value={{todoList, newTodoName, setTodoName, addTodo: add, removeTodo: remove, toggleCheckbox: toggle}}>
      {children}
    </TodoContext.Provider>
  )
};

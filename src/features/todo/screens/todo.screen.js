import React, { useContext } from "react";
import { ImageBackground, ScrollView, Text, StatusBar, TouchableOpacity } from "react-native";
import { Checkbox, List, TextInput } from "react-native-paper";
import { TodoContext } from "../../../services/todo/todo.context";
import { InputPart, TextPart, TodoListText, TodoListSection,  TodoListItem } from "../components/todo.styles";

export const TodoScreen = () => {
  let { todoList, newTodoName, setTodoName, addTodo, toggleCheckbox, removeTodo } = useContext(TodoContext);

  return (<>
      <StatusBar backgroundColor="#6d63ff" />
      <ImageBackground source={require("../../../../assets/bgImage.png")} style={{ height: 500, flex: 1 }}>
        <TextPart>
          <Text style={{ fontSize: 24, color: "white" }}>Hello!</Text>
          <Text style={{ fontSize: 16, color: "white" }}>What are you going to do?</Text>
        </TextPart>
        <InputPart>
          <TextInput placeholder="Mi ban gri" value={newTodoName} onChangeText={(val) => setTodoName(val)}
                     right={<TextInput.Icon icon="briefcase-plus-outline" color="black"
                                            onPress={() => addTodo(newTodoName)} />} />
        </InputPart>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {todoList.length ? (
            <TodoListSection>
              <TodoListText>Es el qo todo list</TodoListText>
              {todoList.map((todoItem) => {
                return (
                  <TodoListItem
                    key={todoItem.id}
                    titleStyle={{ textDecorationLine: todoItem.isChecked ? "line-through" : "none" }}
                    title={todoItem.name}
                    left={(props) => <Checkbox  {...props} status={todoItem.isChecked ? "checked" : "unchecked"}
                                                onPress={() => toggleCheckbox(todoItem.id, "isChecked", !todoItem.isChecked)} />}
                    right={(props) => <TouchableOpacity onPress={() => removeTodo(todoItem.id)}><List.Icon
                      icon="trash-can" /></TouchableOpacity>} />);
              })}
            </TodoListSection>
          ) : (
            <TodoListText>You have no todo list</TodoListText>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

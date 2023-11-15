import styled from "styled-components";
import { List } from "react-native-paper";

export const TextPart = styled.View`
  padding: 20px;
`;

export const InputPart = styled.View`
  padding: 25px;
`;


export const TodoListText = styled.Text`
  color: white;
`;

export const TodoListSection = styled(List.Section)`
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TodoListItem = styled(List.Item)`
  border-radius: 5px;
  background-color: white;
  border-width: 1px;
  border-color: #ddd;
  margin-top: 10px;
`;

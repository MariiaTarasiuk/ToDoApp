import { gql } from "@apollo/client";

export const READ_TODOS = gql`
  query todos {
    todos {
      id
      text
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!) {
    updateTodo(id: $id)
  }
`;

export const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

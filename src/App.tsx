import React, { Fragment, useState } from 'react';
import './App.css';
import { Provider, inject, observer } from 'mobx-react';
import { todoStore, ItodoType } from './stores/todo';
import uuidv4 from 'uuid/v4';

const TodoList = inject("todoStore")(
  observer(({ todoStore }) => {

    return (
      <ul>
        <h3>Todos Count: {todoStore.todoCount as string}</h3>
        {todoStore.todos.map((todo: ItodoType) => {
          return (<li key={todo.id}>
            <span onClick={() => { todoStore.deleteTodo(todo.id) }}>{todo.title as string}</span> - <input type="checkbox" defaultChecked={todo.completed} onChange={() => { todoStore.toggleCompleted(todo.id) }} />
          </li>)
        })}
      </ul>
    )
  })
)

const AddToDo = inject("todoStore")(
  observer(({ todoStore }) => {

    const [title, setTitle] = useState('');

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    }

    const addTodo = () => {

      let newTodo = {
        id: uuidv4(),
        title,
        completed: false
      }

      todoStore.addTodo(newTodo);

      setTitle('');

    }

    return (
      <Fragment>
        <input type="text" onChange={onChange} value={title} placeholder="Enter Todo: " />
        <button onClick={addTodo}>Add Todo</button>
      </Fragment>
    )
  })
)

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider todoStore={todoStore}>
        <TodoList />
        <AddToDo />
      </Provider>
    </div>
  );
}

export default App;

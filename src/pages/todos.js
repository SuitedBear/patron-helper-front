import React from 'react';

import { DataView } from '../components/tables/dataView';
import { DropDownField, TextField } from '../components/tables/formFieldTypes';
import { flattener } from '../utils/flattener';

function Todos (props) {
  const [todoList, setTodoList] = React.useState(null);
  // eslint-disable-next-line
  const [todoData, setTodoData] = React.useState(null);
  const todoMap = new Map([
    ['status', DropDownField],
    ['notes', TextField],
    ['reward', TextField]
  ]);

  React.useEffect(() => {
    async function getTodoList () {
      const recievedData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/complex`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (recievedData.ok) {
        const todoDataParsed = await recievedData.json();
        setTodoData(todoDataParsed);
        const newTodoList = todoDataParsed.map(pos => flattener(pos));
        console.log(newTodoList);
        setTodoList(newTodoList);
      }
    }
    getTodoList();
  }, [props]);

  return (
    <div>
      {
        (todoList)
          ? (
            <DataView
              data={todoList}
              types={todoMap}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Todos };

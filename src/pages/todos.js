import React from 'react';

import { DataView } from '../components/tables/dataView';
import { DropDownField, TextField } from '../components/tables/formFieldTypes';

function Todos (props) {
  const [todoList, setTodoList] = React.useState(null);
  const todoColumns = new Map([
    ['id', 'id'],
    ['updatedAt', 'ostatnia zmiana'],
    ['patronInService.patron.name', 'patron'],
    ['patronInService.patron.email', 'email'],
    ['reward.name', 'nagroda'],
    ['patronInService.notes', 'notatki'],
    ['status', 'status']
  ]);
  const todoMap = new Map([
    ['status', DropDownField],
    ['patronInService.notes', TextField],
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
        setTodoList(todoDataParsed);
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
              columns={todoColumns}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Todos };

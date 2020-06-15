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

  function handleSaveChanges (data) {
    console.log(data);
    console.log(todoList);
    const newTodoList = [];
    for (const pos of todoList) {
      const posCopy = { ...pos };
      const newPos = data.get(posCopy.id);
      if (newPos) {
        for (const [newKey, val] of Object.entries(newPos)) {
          let reference = posCopy;
          const keyArr = newKey.split('.');
          while (keyArr.length > 1) {
            reference = reference[keyArr.shift()];
          }
          reference[keyArr[0]] = val;
        }
      }
      newTodoList.push(posCopy);
    }
    console.log(newTodoList);
  }

  return (
    <div>
      {
        (todoList)
          ? (
            <DataView
              data={todoList}
              types={todoMap}
              columns={todoColumns}
              onSaveChanges={handleSaveChanges}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Todos };

import React from 'react';

import { DataView } from '../components/tables/dataView';
import { DropDownField, TextField } from '../components/tables/formFieldTypes';
import { duplicator } from '../utils/flattener';

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

  async function sendChanges (data) {
    const msgBody = {
      data,
      fields: [
        'notes'
      ]
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/${props.serviceId}/bulkedittodo`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
      }
    );
    if (result.ok) {
      const newList = await result.json();
      return newList;
    } else return null;
  }

  async function handleSaveChanges (data, editedIds) {
    const newTodoList = [];
    for (const pos of todoList) {
      const posCopy = duplicator(pos);
      const changedData = data.get(posCopy.id);
      if (changedData && editedIds.has(posCopy.id)) {
        for (const [newKey, val] of Object.entries(changedData)) {
          let reference = posCopy;
          const keyArr = newKey.split('.');
          while (keyArr.length > 1) {
            reference = reference[keyArr.shift()];
          }
          reference[keyArr[0]] = val;
        }
        newTodoList.push(posCopy);
      }
    }
    if (newTodoList.length > 0) {
      const newList = await sendChanges(newTodoList);
      if (newList) {
        setTodoList(newList);
        props.onChanges(false);
        console.log('save successfull');
        window.alert('Data saved.');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
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
              onChanges={props.onChanges}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Todos };

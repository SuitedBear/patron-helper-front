import React from 'react';

import { DataView } from '../components/tables/dataView';
import { DropDownField, TextField } from '../components/tables/formFieldTypes';
import { duplicator } from '../utils/flattener';

function Todos (props) {
  const [todoList, setTodoList] = React.useState(null);
  const [rewardList, setRewardList] = React.useState(null);
  const [optionLists, setOptionLists] = React.useState({});
  const todoColumns = new Map([
    ['id', 'id'],
    ['status.name', 'status'],
    ['name', 'nazwa'],
    ['updatedAt', 'ostatnia zmiana'],
    ['patronInService.patron.name', 'patron'],
    ['patronInService.patron.email', 'email'],
    ['reward.name', 'nagroda'],
    ['patronInService.patron.firstName', 'imię'],
    ['patronInService.patron.lastName', 'nazwisko'],
    ['patronInService.patron.address', 'adres'],
    ['patronInService.notes', 'notatki']
  ]);
  const todoMap = new Map([
    ['status.name', DropDownField],
    ['patronInService.notes', TextField],
    ['patronInService.patron.address', TextField],
    ['reward.name', TextField]
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
    async function getStatusList () {
      const recievedData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/levels/status`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (recievedData.ok) {
        const statusListParsed = await recievedData.json();
        console.log(statusListParsed);
        setOptionLists({
          'status.name': statusListParsed
        });
      }
    }
    async function getRewardList () {
      const recievedData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/rewards`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (recievedData.ok) {
        const rewardListParsed = await recievedData.json();
        setRewardList(rewardListParsed);
      }
    }
    getTodoList();
    getStatusList();
    getRewardList();
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
              options={optionLists}
              onSaveChanges={handleSaveChanges}
              onChanges={props.onChanges}
            />
          )
          : (<div>Loading Todo List...</div>)
      }
    </div>
  );
}

export { Todos };

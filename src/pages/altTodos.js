import React from 'react';

import { DataView } from '../components/tables/altDataViev';
import { TodoEdit } from '../components/editRows/todoEdit';
import { fetchData } from '../utils/customFetch';

const columns = new Map([
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

function Todos (props) {
  const [data, setData] = React.useState(null);
  const [editFocus, setEditFocus] = React.useState(-1);
  const [editedFields, setEditedFields] = React.useState(new Set());

  React.useEffect(() => {
    async function getTodos () {
      const connectionData = {
        serverAddress: props.serverAddress,
        serviceId: props.serviceId,
        token: props.token
      };
      const todoList = await fetchData(
        connectionData, 'todo/complex');
      const statusList = await fetchData(
        connectionData, 'levels/status');
      const rewardList = await fetchData(
        connectionData, 'rewards');
      setData({
        todoList,
        statusList,
        rewardList
      });
    }

    getTodos();
  }, [props.serverAddress, props.serviceId, props.token]);

  function changeFocus (_e, rowData) {
    console.log(rowData);
    setEditFocus(rowData.id);
  }

  function handleEdit (focus, newFieldState) {
    props.onChanges(true);

    const newTodoList = [...data.todoList];
    const editedField = newTodoList.find(pos => pos.id === focus);

    for (const [key, value] of Object.entries(newFieldState)) {
      switch (key) {
        case 'status.name':
          const newStatus = data.statusList.find(pos => pos.name === value);
          editedField.statusId = newStatus.id;
          // adding excesive created/updated fields
          editedField.status = newStatus;
          break;
        case 'reward.name':
          const newReward = data.rewardList.find(pos => pos.name === value);
          editedField.rewardId = newReward.id;
          editedField.reward = newReward;
          break;
        default:
          let reference = editedField;
          const keyArr = key.split('.');
          while (keyArr.length > 1) {
            reference = reference[keyArr.shift()];
          }
          reference[keyArr[0]] = value;
      }
    }

    const { statusList, rewardList } = data;
    setData({
      todoList: newTodoList,
      statusList,
      rewardList
    });
    const newEditedFields = new Set(editedFields);
    newEditedFields.add(focus);
    setEditedFields(newEditedFields);
    console.log(`saved ${focus}`);
    setEditFocus(-1);
  }

  async function sendChanges (data) {
    const msgBody = {
      data,
      fields: [
        'notes'
      ]
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/${props.serviceId}/todo/bulkedittodo`, {
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

  async function handleSave () {
    // editedFields
    const changedTodos = data.todoList.filter(
      pos => editedFields.has(pos.id)
    );
    if (changedTodos) {
      const newList = await sendChanges(changedTodos);
      const { statusList, rewardList } = data;
      if (newList) {
        setData({
          todoList: newList,
          statusList,
          rewardList
        });
        setEditedFields(new Set());
        props.onChanges(false);
        window.alert('Data saved.');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
  }

  const createEditRow = (dataKey, dataEntry, keys) => {
    const todoEntry = data.todoList.find(e => e.id === dataKey);
    const filteredTodos = data.todoList.filter(e => {
      return (
        e.patronInService.id === todoEntry.patronInService.id &&
        e.statusId === 0 &&
        e.reward.level.id === todoEntry.reward.level.id
      );
    });
    // filter options here
    const filteredRewards = data.rewardList.filter(e => {
      return (
        e.levelId === todoEntry.reward.level.id &&
        !filteredTodos.includes(todo => e.id === todo.rewardId)
      );
    });
    return (
      <TodoEdit
        key={dataKey}
        entry={dataEntry}
        entryKey={dataKey}
        keys={keys}
        statusList={data.statusList}
        rewardList={filteredRewards}
        clickHandler={handleEdit}
      />
    );
  };

  return (
    <div>
      {
        (data)
          ? (
            <DataView
              data={data.todoList}
              columns={columns}
              editFocus={editFocus}
              handleFocus={changeFocus}
              handleSave={handleSave}
              editRow={createEditRow}
            />
            )
          : (<div>Loading...</div>)
      }
    </div>
  );
}

export { Todos };

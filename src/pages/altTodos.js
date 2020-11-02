/*
  props:
    serviceId
    serverAddress
    token

    onChanges(bool)

  state:
    todoList
    options

    ?editRow
*/

import React from 'react';

import { DataView } from '../components/tables/altDataViev';
import { fetchData } from '../utils/customFetch';

function Todos (props) {
  const [data, setData] = React.useState(null);
  const [optionLists, setOptionLists] = React.useState(null);

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

  React.useEffect(() => {
    async function getTodos () {
      const todoList = await fetchData(props, 'complex');
      console.log(todoList);
      setData({
        todoList
      });
    }

    getTodos();
  }, [props]);

  return (
    <div>
      {
        (data)
          ? (
            <DataView
              data={data.todoList}
              columns={columns}
            />
          )
          : (<div>Loading...</div>)
      }
    </div>
  );
}

export { Todos };

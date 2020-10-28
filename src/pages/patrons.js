import React from 'react';

import { DataView } from '../components/tables/dataView';
import { TextField } from '../components/tables/formFieldTypes';
import { fetchData } from '../utils/customFetch';
import { duplicator } from '../utils/flattener';

function Patrons (props) {
  const [patronList, setPatronList] = React.useState(null);
  // const [countableTodoList, setCountableTodoList] = React.useState(null);
  // const [levelList, setLevelList] = React.useState(null);
  const [patronColumns, setPatronColumns] = React.useState(null);

  const patronMap = new Map([
    ['patron.address', TextField],
    ['notes', TextField],
    ['patron.name', TextField]
  ]);

  // pobraĆ Levels i dodać jako kolumny
  // dla każdego level podać ilość todo != done

  React.useEffect(() => {
    async function getPatronList () {
      const patronDataRaw = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/patrons/complex`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (patronDataRaw.ok) {
        const patronDataParsed = await patronDataRaw.json();
        // setPatronList(patronDataParsed);
        return patronDataParsed;
      }
    }
    async function getCountableTodos () {
      const rawCountableTodos = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/countable`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (rawCountableTodos.ok) {
        const countableParsed = await rawCountableTodos.json();
        // setCountableTodoList(countableParsed);
        return countableParsed;
      }
    }
    async function getLevels (patrons, countable) {
      const columns = new Map([
        ['id', 'id'],
        ['patron.name', 'nazwa'],
        ['patron.firstName', 'imię'],
        ['patron.lastName', 'nazwisko'],
        ['patron.email', 'email'],
        ['active', 'aktywny'],
        ['supportAmount', 'kwota wsparcia'],
        ['patron.address', 'adres'],
        ['notes', 'uwagi'],
        ['updatedAt', 'ostatnia zmiana']
      ]);
      const newLevelList = await fetchData(props, 'levels');
      if (newLevelList) {
        for (const level of newLevelList) {
          columns.set(`${level.name}`, `${level.name}`);
        }
        setPatronColumns(columns);
        const newPatronList = patrons.map(patron => {
          const newPatron = { ...patron };
          const patronTodos = countable.filter(todo => {
            return todo.patronId === newPatron.id;
          });
          for (const level of newLevelList) {
            const rewardCount = patronTodos.reduce((count, todo) => {
              return (todo.reward.levelId === level.id) ? ++count : count;
            }, 0);
            newPatron[`${level.name}`] = rewardCount;
          }
          return newPatron;
        });
        console.log(newPatronList);
        setPatronList(newPatronList);
      }
    }
    getPatronList().then(patrons => {
      getCountableTodos().then(todos => {
        getLevels(patrons, todos);
      });
    });
  }, [props]);

  async function sendChanges (data) {
    const msgBody = {
      data,
      fields: [
        'notes'
      ]
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/${props.serviceId}/patrons/bulkedit`, {
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
    const newPatronList = [];
    for (const pos of patronList) {
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
        newPatronList.push(posCopy);
      }
    }
    if (newPatronList.length > 0) {
      const newList = await sendChanges(newPatronList);
      if (newList) {
        setPatronList(newList);
        props.onChanges(false);
        window.alert('Data saved.');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
  }

  return (
    <div>
      {
        (patronList)
          ? (
            <DataView
              data={patronList}
              types={patronMap}
              columns={patronColumns}
              onSaveChanges={handleSaveChanges}
              onChanges={props.onChanges}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Patrons };

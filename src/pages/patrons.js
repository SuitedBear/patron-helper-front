import React from 'react';
import { PatronEdit } from '../components/editRows/patronEdit';

import { DataView } from '../components/tables/altDataViev';
import { fetchData } from '../utils/customFetch';

function Patrons (props) {
  const [patronList, setPatronList] = React.useState(null);
  const [editFocus, setEditFocus] = React.useState(-1);
  const [editedFields, setEditedFields] = React.useState(new Set());
  const [patronColumns, setPatronColumns] = React.useState(null)
;
  React.useEffect(() => {
    const connectionData = {
      serverAddress: props.serverAddress,
      serviceId: props.serviceId,
      token: props.token
    };

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
        `${props.serverAddress}/services/${props.serviceId}/todo/countable`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (rawCountableTodos.ok) {
        const countableParsed = await rawCountableTodos.json();
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
        ['updatedAt', 'ostatnia zmiana'],
        ['wszystkie', 'wszystkie']
      ]);
      const newLevelList = await fetchData(connectionData, 'levels');
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
          let allRewardCount = 0;
          for (const level of newLevelList) {
            const rewardsForLevel = patronTodos.filter(todo => {
              return todo.reward.levelId === level.id;
            });
            const rewardCount = rewardsForLevel.reduce((count, todo) => {
              return (todo.statusId !== 2) ? ++count : count;
            }, 0);
            newPatron[`${level.name}`] =
              `${rewardCount}/${rewardsForLevel.length}`;
            allRewardCount += rewardCount;
          }
          newPatron['wszystkie'] =
            `${allRewardCount}/${patronTodos.length}`;
          return newPatron;
        });
        setPatronList(newPatronList);
      }
    }

    getPatronList().then(patrons => {
      getCountableTodos().then(todos => {
        getLevels(patrons, todos);
      });
    });
  }, [props.serverAddress, props.serviceId, props.token]);

  function changeFocus (_e, rowData) {
    setEditFocus(rowData.id);
  }

  function handleEdit (focus, newFieldState) {
    props.onChanges(true);

    const newPatronList = [...patronList];
    const editedField = newPatronList.find(pos => pos.id === focus);

    // crude, should iterate
    editedField.notes = newFieldState['notes'];
    editedField.patron.address = newFieldState['patron.address'];
    editedField.patron.name = newFieldState['patron.name'];

    setPatronList(newPatronList);
    const newEditedFields = new Set(editedFields);
    newEditedFields.add(focus);
    setEditedFields(newEditedFields);
    console.log(`handleEdit saved ${focus}`);
    setEditFocus(-1);
  }

  async function sendChanges (data) {
    const msgBody = {
      data,
      fields: [
        'notes'
      ]
    };
    console.log(msgBody.data);
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

  async function handleSave (data, editedIds) {
    const newPatronList = patronList.filter(
      pos => editedFields.has(pos.id)
    );
    if (newPatronList) {
      const newList = await sendChanges(newPatronList);
      if (newList) {
        setPatronList(newList);
        setEditedFields(new Set());
        props.onChanges(false);
        window.alert('Data saved.');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
  }

  const createEditRow = (dataKey, dataEntry, keys) => {
    // const patronEntry = patronList.find(e => e.id === dataKey);
    console.log('createEditRow');

    return (
      <PatronEdit
        key={dataKey}
        entry={dataEntry}
        entryKey={dataKey}
        keys={keys}
        clickHandler={handleEdit}
      />
    )
  }

  return (
    <>
      {
        (patronList)
          ? (
            <DataView
              data={patronList}
              columns={patronColumns}
              editFocus={editFocus}
              handleFocus={changeFocus}
              handleSave={handleSave}
              editRow={createEditRow}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </>
  );
}

export { Patrons };

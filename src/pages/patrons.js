import React from 'react';

import { DataView } from '../components/tables/dataView';
import { BoolField, TextField } from '../components/tables/formFieldTypes';
import { duplicator } from '../utils/flattener';

function Patrons (props) {
  const [patronList, setPatronList] = React.useState(null);
  const patronColumns = new Map([
    ['id', 'id'],
    ['patron.name', 'nazwa'],
    ['patron.email', 'email'],
    ['active', 'aktywny'],
    ['supportAmount', 'kwota wsparcia'],
    ['notes', 'uwagi'],
    ['updatedAt', 'ostatnia zmiana']
  ]);
  const patronMap = new Map([
    ['active', BoolField],
    ['notes', TextField],
    ['patron.name', TextField]
  ]);

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
        setPatronList(patronDataParsed);
      }
    }
    getPatronList();
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
        (patronList)
          ? (
            <DataView
              data={patronList}
              types={patronMap}
              columns={patronColumns}
              onSaveChanges={handleSaveChanges}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Patrons };

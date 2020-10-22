import React from 'react';

import { DataView } from '../components/tables/dataView';
import { TextField } from '../components/tables/formFieldTypes';
import { duplicator } from '../utils/flattener';

function Rewards (props) {
  const [rewardList, setRewardList] = React.useState(null);
  const rewardColumns = new Map([
    ['id', 'id'],
    ['name', 'nazwa'],
    ['levelId', 'próg'],
    ['updatedAt', 'ostatnia zmiana']
  ]);
  const rewardMap = new Map([
    ['name', TextField]
  ]);

  // NEEDS ENDPOINTS !!!

  React.useEffect(() => {
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
        const rewardDataParsed = await recievedData.json();
        setRewardList(rewardDataParsed);
      }
    }
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
      `${props.serverAddress}/services/${props.serviceId}`, {
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
    const newRewardList = [];
    for (const pos of rewardList) {
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
        newRewardList.push(posCopy);
      }
    }
    if (newRewardList.length > 0) {
      const newList = await sendChanges(newRewardList);
      if (newList) {
        setRewardList(newList);
        props.onChanges(false);
        window.alert('Data seved');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
  }

  return (
    <div>
      {
        (rewardList)
          ? (
            <DataView
              data={rewardList}
              types={rewardMap}
              columns={rewardColumns}
              onSaveChanges={handleSaveChanges}
              onChanges={props.onChanges}
            />
          )
          : (<div>Loading reward list...</div>)
      }
    </div>
  );
}

export { Rewards };

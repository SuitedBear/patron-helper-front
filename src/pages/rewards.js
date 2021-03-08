import React from 'react';
import { RewardForm } from '../components/editRows/rewardAdd';
import { RewardEdit } from '../components/editRows/rewardEdit';

import { DataView } from '../components/tables/altDataViev';
import { fetchData } from '../utils/customFetch';

// reward edit:
// -name
// reward add:
// -name
// -month/year (dateFor)
// -level (levelId)

function Rewards (props) {
  const [rewardList, setRewardList] = React.useState(null);
  const [levelList, setLevelList] = React.useState(null);
  const [editFocus, setEditFocus] = React.useState(-1);
  const [editedFields, setEditedFields] = React.useState(new Set());
  const rewardColumns = new Map([
    ['id', 'id'],
    ['name', 'nazwa'],
    ['level.name', 'próg'],
    ['dateFor', 'data']
    // ['updatedAt', 'ostatnia zmiana']
  ]);
  // const rewardMap = new Map([
  //   ['name', TextField]
  // ]);

  // NEEDS ENDPOINTS !!!

  React.useEffect(() => {
    const connectionData = {
      serverAddress: props.serverAddress,
      serviceId: props.serviceId,
      token: props.token
    };
    async function getRewardList () {
      const recievedData = await fetchData(
        connectionData, 'rewards'
      );
      setRewardList(recievedData);
    }
    async function getLevelList () {
      const recievedData = await fetchData(
        connectionData, 'levels'
      );
      setLevelList(recievedData);
    }
    getRewardList();
    getLevelList();
  }, [props.serverAddress, props.serviceId, props.token]);

  function changeFocus (_e, rowData) {
    setEditFocus(rowData.id);
  }

  function handleEdit (focus, newFieldState) {
    props.onChanges(true);

    const newRewardList = [...rewardList];
    const editedField = newRewardList.find(pos => pos.id === focus);

    // edit name
    editedField.name = newFieldState['name'];

    setRewardList(newRewardList);
    const newEditedFields = new Set(editedFields);
    newEditedFields.add(focus);
    setEditedFields(newEditedFields);
    setEditFocus(-1);
  }

  async function sendChanges (data) {
    const msgBody = {
      data
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/${props.serviceId}/rewards/bulkedit`, {
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
    const newRewardList = rewardList.filter(
      pos => editedFields.has(pos.id)
    )
    if (newRewardList) {
      const newList = await sendChanges(newRewardList);
      if (newList) {
        setRewardList(newList);
        setEditedFields(new Set());
        props.onChanges(false);
        window.alert('Data saved');
      } else {
        window.alert('There was an error while saving data :<');
      }
    }
  }

  async function handleNew (formData) {
    // data.level
    const level = levelList.find(lvl => lvl.name === formData.level)
    console.log(level);
    const msgBody = {
      data: {
        name: formData.name,
        dateFor: formData.dateFor,
        levelId: level.id
      }
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/${props.serviceId}/rewards/add`, {
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
      const newRewardList = await result.json();
      setRewardList(newRewardList);
      setEditFocus(-1);
    } else return null;    
  }

  const createEditRow = (dataKey, dataEntry, keys) => {
    return (
      <RewardEdit
        key={dataKey}
        entry={dataEntry}
        entryKey={dataKey}
        keys={keys}
        clickHandler={handleEdit}
      />
    )
  }

  const buildView = (focus) => {
    if (focus === -2) {
      return (
        <RewardForm
          handleNew={handleNew}
          levelList={levelList}
        />
      )
    }
    return (
      <div>
        <button
          className='filter-check'
          onClick={() => setEditFocus(-2)}
        >
          New Reward
        </button>
        <DataView
          data={rewardList}
          columns={rewardColumns}
          editFocus={editFocus}
          handleFocus={changeFocus}
          handleSave={handleSave}
          editRow={createEditRow}              
        />              
      </div>      
    )
  }

  return (
    <>
      {
        (rewardList)
          ? (buildView(editFocus))
          : (<div>Loading reward list...</div>)
      }
    </>
  );
}

export { Rewards };

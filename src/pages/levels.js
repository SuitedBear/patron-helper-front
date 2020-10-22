import React from 'react';

import { DataView } from '../components/tables/dataView';
import { LevelEdit } from '../components/levelEdit';

/** @props: serviceId, token, serverAddress */

function Levels (props) {
  const [levelList, setLevelList] = React.useState(null);
  const levelColumns = new Map([
    ['id', 'id'],
    ['name', 'nazwa'],
    ['value', 'kwota'],
    ['cyclic', 'co ile'],
    ['multi', 'dla wielu'],
    ['individual', 'indywidualna'],
    ['once', 'jednorazowa'],
    ['limit', 'limit'],
    ['updatedAt', 'ostatnia zmiana']
  ]);

  React.useEffect(() => {
    async function getLevelList () {
      const levelData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/levels`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (levelData.ok) {
        const levelDataParsed = await levelData.json();
        setLevelList(levelDataParsed);
      }
    }
    console.log('reloading levels');
    getLevelList();
  }, [props]);

  const sendChanges = async (level, create = false) => {
    const postLink =
    `${props.serverAddress}/services/${props.serviceId}/levels/` +
      ((create === true) ? 'new' : `${level.id}`);

    const result = await window.fetch(
      postLink, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(level)
      }
    );
    if (result.ok) {
      const editedLevel = await result.json();
      if (create) {
        setLevelList([...levelList, editedLevel]);
      } else {
        const newList = levelList.map(pos => {
          return (pos.id === editedLevel.id)
            ? editedLevel
            : pos;
        });
        setLevelList([...newList]);
      }
    }
  };

  return (
    <div>
      {
        (levelList)
          ? (
            <DataView
              data={levelList}
              types={new Map()}
              columns={levelColumns}
              // onSaveChanges={handleSaveChanges}
              onChanges={props.onChanges}
              newButton
              separateEdit={(levelToEdit, backHandler, create) => {
                return (
                  <LevelEdit
                    level={levelToEdit}
                    handleBack={backHandler}
                    handleSendChanges={sendChanges}
                    create={create}
                  />
                );
              }}
            />
          )
          : (<div>Loading Level List...</div>)
      }
    </div>
  );
}

export { Levels };

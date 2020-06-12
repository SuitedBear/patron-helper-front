import React from 'react';

import { DataView } from '../components/tables/dataView';

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
    getLevelList();
  }, [props]);

  return (
    <div>
      {
        (levelList)
          ? <DataView
            data={levelList}
            columns={levelColumns}
          />
          : (<div>Loading Level List...</div>)
      }
    </div>
  );
}

export { Levels };

import React from 'react';

import DataView from 'components/tables/DataView';

/** @props: serviceId, token, serverAddress */

function Levels (props) {
  const [levelList, setLevelList] = React.useState(null);

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
          ? <DataView data={levelList} />
          : (<div>Loading Level List...</div>)
      }
    </div>
  );
}

export { Levels };

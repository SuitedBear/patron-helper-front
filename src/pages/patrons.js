import React from 'react';

import DataView from '../components/tables/DataView';

function Patrons (props) {
  const [patronList, setPatronList] = React.useState(null);

  React.useEffect(() => {
    async function getPatronList () {
      const patronData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/patrons`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (patronData.ok) {
        const patronDataParsed = await patronData.json();
        setPatronList(patronDataParsed);
      }
    }
    getPatronList();
  }, [props]);

  return (
    <div>
      {
        (patronList)
          ? <DataView data={patronList} />
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Patrons };

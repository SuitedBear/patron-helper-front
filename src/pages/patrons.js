import React from 'react';

import { DataView } from '../components/tables/dataView';
import { flattener } from '../utils/flattener';
import { BoolField, TextField } from '../components/tables/formFieldTypes';

function Patrons (props) {
  const [patronList, setPatronList] = React.useState(null);
  // eslint-disable-next-line
  const [patronData, setPatronData] = React.useState(null);
  const patronMap = new Map([
    ['active', BoolField],
    ['notes', TextField],
    ['name', TextField]
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
        setPatronData(patronDataParsed);
        const patronDataFlatten = patronDataParsed.map(pos => flattener(pos));
        setPatronList(patronDataFlatten);
      }
    }
    getPatronList();
  }, [props]);

  return (
    <div>
      {
        (patronList)
          ? (
            <DataView
              data={patronList}
              types={patronMap}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Patrons };

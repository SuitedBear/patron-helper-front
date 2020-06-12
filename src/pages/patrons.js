import React from 'react';

import { DataView } from '../components/tables/dataView';
import { BoolField, TextField } from '../components/tables/formFieldTypes';

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

  return (
    <div>
      {
        (patronList)
          ? (
            <DataView
              data={patronList}
              types={patronMap}
              columns={patronColumns}
            />
          )
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Patrons };

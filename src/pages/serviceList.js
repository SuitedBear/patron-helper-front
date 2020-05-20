import React from 'react';

function ServiceList (props) {
  const [serviceList, updateServiceList] = React.useState([]);

  React.useEffect(() => {
    async function fetchServiceList (props) {
      let serviceList = [];
      const serviceData = await window.fetch(`${props.serverAddress}/services`, {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      });

      if (serviceData.ok) {
        const serviceDataParsed = await serviceData.json();
        serviceList = serviceDataParsed.map(service => {
          return (
            <li
              key={service.id}
              onClick={() => props.setServiceId(service.id)}
            >
              {service.name}
            </li>
          );
        });
      }
      updateServiceList(serviceList);
    }
    console.log('serviceList render');
    fetchServiceList(props);
  }, [props]);

  return (
    <div>
      <p>Service List</p>
      <ul style={{ listStyle: 'none' }}>
        {serviceList}
      </ul>
    </div>
  );
}

export { ServiceList };

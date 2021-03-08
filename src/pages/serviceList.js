import React from 'react';

function ServiceList (props) {
  const [serviceList, setServiceList] = React.useState([]);
  const [newServiceName, setNewServiceName] = React.useState('');
  const [newApiLink, setNewApiLink] = React.useState('');
  const [newApiKey, setNewApiKey] = React.useState('');

  async function fetchServiceList (props) {
    let newServiceList = [];
    const serviceData = await window.fetch(`${props.serverAddress}/services`, {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    });

    if (serviceData.ok) {
      const serviceDataParsed = await serviceData.json();
      newServiceList = serviceDataParsed.map(service => {
        return (
          <li
            key={service.id}
            onClick={() => props.setServiceId({
              id: service.id,
              name: service.name
            })}
          >
            {service.name}
          </li>
        );
      });
    }
    return newServiceList;
  }

  React.useEffect(() => {
    console.log('serviceList render');
    fetchServiceList(props).then(list => { setServiceList(list); });
  }, [props]);

  async function handleSubmit (e) {
    e.preventDefault();
    console.log('new service');
    const formData = {
      name: newServiceName,
      apiLink: newApiLink,
      apiKey: newApiKey
    };
    const result = await window.fetch(
      `${props.serverAddress}/services/new`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );
    if (result.ok) {
      setNewServiceName('');
      setNewApiLink('');
      setNewApiKey('');
      fetchServiceList(props).then(list => {
        setServiceList(list);
      });
    } else {
      console.log('fail!');
    }
  }

  return (
    <div className='content'>
      <p>Service List</p>
      <ul style={{ listStyle: 'none' }}>
        {serviceList}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='name'>
          service name:
          <input
            name='name'
            id='name'
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
        </label>
        <label htmlFor='apiLink'>
          API link:
          <input
            name='apiLink'
            id='apiLink'
            value={newApiLink}
            onChange={(e) => setNewApiLink(e.target.value)}
          />
        </label>
        <label htmlFor='apiKey'>
          API key:
          <input
            name='apiKey'
            id='apiKey'
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
          />
        </label>
        <input type='submit' value='Create' />
      </form>
    </div>
  );
}

export { ServiceList };

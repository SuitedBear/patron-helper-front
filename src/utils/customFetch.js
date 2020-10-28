const fetchData = async (props, datapoint) => {
  const rawData = await window.fetch(
    `${props.serverAddress}/services/${props.serviceId}/${datapoint}`, {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }
  );
  if (rawData.ok) {
    const parsedData = await rawData.json();
    return parsedData;
  }
  return null;
};

export {
  fetchData
};

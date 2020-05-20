import React from 'react';

import DataView from '../components/tables/DataView';

function Todos (props) {
  const [todoList, setTodoList] = React.useState(null);

  React.useEffect(() => {
    async function getTodoList () {
      const todoData = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/patrons`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (todoData.ok) {
        const todoDataParsed = await todoData.json();
        setTodoList(todoDataParsed);
      }
    }
    getTodoList();
  }, [props]);

  return (
    <div>
      {
        (todoList)
          ? <DataView data={todoList} />
          : (<div>Loading Patron List...</div>)
      }
    </div>
  );
}

export { Todos };

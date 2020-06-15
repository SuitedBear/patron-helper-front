const flattener = (item) => {
  const flattenedItem = {};
  for (const pos of Object.entries(item)) {
    if (pos[1] && typeof pos[1] === 'object') {
      const nestedItem = flattener(pos[1]);
      // Object.assign(flattenedItem, nestedItem);
      for (const nestedPos of Object.entries(nestedItem)) {
        flattenedItem[`${pos[0]}.${nestedPos[0]}`] = nestedPos[1];
      }
    } else {
      flattenedItem[pos[0]] = pos[1];
    }
  }
  return flattenedItem;
};

export { flattener };

const flattener = (item) => {
  const flattenedItem = {};
  for (const pos of Object.entries(item)) {
    if (pos[1] && typeof pos[1] === 'object') {
      const nestedItem = flattener(pos[1]);
      Object.assign(flattenedItem, nestedItem);
    } else {
      flattenedItem[pos[0]] = pos[1];
    }
  }
  return flattenedItem;
};

export { flattener };

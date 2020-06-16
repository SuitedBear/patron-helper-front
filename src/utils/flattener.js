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

const duplicator = (item, depth = 0) => {
  // return reference instead to avoid stack overflowing
  if (depth > 3) return item;
  const newItem = {};
  for (const [key, val] of Object.entries(item)) {
    newItem[key] = (val && (typeof val === 'object'))
      ? duplicator(val, ++depth)
      : val;
  }
  return newItem;
};

export { flattener, duplicator };

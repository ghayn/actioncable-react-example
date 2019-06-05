function objectOmitKeys(object, keys = []) {
  const result = {};

  Object.keys(object)
    .filter(objKey => !keys.includes(objKey))
    .forEach(objKey => {
      result[objKey] = object[objKey];
    })

  return result;
}

export default objectOmitKeys;

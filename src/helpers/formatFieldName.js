function formatFieldName(fieldName) {
  let name = fieldName;

  if (fieldName.includes('_')) {
    name = fieldName.replace('_', ' ');
  }

  return `${name[0].toUpperCase()}${name.slice(1)}`;
}

export default formatFieldName;

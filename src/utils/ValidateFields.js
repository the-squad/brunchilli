const validateFields = fields => {
  let isAllValid = true;

  fields.forEach(field => {
    if (field.isValid) {
      const { isValid } = field.isValid();
      isAllValid = isValid;
    }
  });
  return isAllValid;
};

export default validateFields;

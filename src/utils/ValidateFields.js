const validateFields = fields => {
  let isAllValid = true;

  fields.map(field => {
    if (field.isValid) {
      const { isValid, errorMessage } = field.isValid();

      if (!isValid) {
        isAllValid = false;
        field.showErrorMessage(errorMessage);
      }
    }
  });

  return isAllValid;
};

export default validateFields;

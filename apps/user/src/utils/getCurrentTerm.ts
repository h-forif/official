const getCurrentTerm = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const semester = month >= 2 && month <= 7 ? 1 : 2;

  return {
    year: year.toString(),
    semester: semester.toString(),
  };
};

export { getCurrentTerm };

export const formatIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  // const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const day = date.getDate();
  const day = date.getDate().toString().padStart(2, '0'); // Ensures day is two digits
  // const month = monthNames[date.getMonth()];
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures month is two digits
  const year = date.getFullYear();
  // return `${day} ${month}, ${year}`;
  return `${day}-${month}-${year}`;
};

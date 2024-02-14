function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  const hoursSpent = document.getElementById('hoursSpent').value;

  // For now, just log the input values to the console
  console.log('Category Name:', categoryName, 'Hours Spent:', hoursSpent);

  // Clear the input fields
  document.getElementById('categoryName').value = '';
  document.getElementById('hoursSpent').value = '';
}


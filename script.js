function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  const hoursSpent = document.getElementById('hoursSpent').value;

  // For now, just log the input values to the console
  console.log('Category Name:', categoryName, 'Hours Spent:', hoursSpent);

  // Clear the input fields
  document.getElementById('categoryName').value = '';
  document.getElementById('hoursSpent').value = '';
}

function updateYearInfo() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59); // December 31st
  const msPerDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
  
  const daysLeft = Math.ceil((endOfYear - now) / msPerDay);
  const hoursLeft = daysLeft * 24;

  document.getElementById('yearInfo').innerHTML = `
    <div>${daysLeft} Days left in ${currentYear}</div>
    <div>${hoursLeft} Hours left in ${currentYear}</div>
  `;
}

// Call this function when the script loads
updateYearInfo();

function createPieChart(data) {
  var ctx = document.getElementById('pieChart').getContext('2d');
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      // ... options here
    }
  });
}

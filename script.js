// Data structure for the pie chart
var data = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverOffset: 4
  }]
};

// Function to create or update the pie chart
function createPieChart() {
  var ctx = document.getElementById('chartArea').getContext('2d');
  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Function to calculate total hours based on frequency
function calculateTotalHours(hours, frequency) {
  const daysInYear = 365; // Or 366 for a leap year
  const weeksInYear = 52;
  const monthsInYear = 12;

  let totalHours;
  switch (frequency) {
    case 'daily': totalHours = hours * daysInYear; break;
    case 'weekly': totalHours = hours * weeksInYear; break;
    case 'monthly': totalHours = hours * monthsInYear; break;
    default: totalHours = 0;
  }
  return totalHours;
}

// Function to add a new category
function addCategory() {
  var categoryName = document.getElementById('categoryName').value.trim();
  var hoursSpent = parseFloat(document.getElementById('hoursSpent').value.trim());
  var frequency = document.getElementById('frequency').value;

  // Validate hours to not exceed 24 and to be positive
  if (!categoryName || isNaN(hoursSpent) || hoursSpent <= 0 || hoursSpent > 24) {
    alert("Please enter a category name and a valid number of hours (1-24).");
    return;
  }

  // Calculate total hours based on the selected frequency
  var totalHours = calculateTotalHours(hoursSpent, frequency);

  // Check if the new hours exceed the total hours in the year
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary
  const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);

  if (totalAllocatedHours + totalHours > totalHoursInYear) {
    alert('The total hours allocated exceed the total hours in the year!');
    return; // Prevent adding the category
  }

  // Add the new category to the chart data
  data.labels.push(categoryName);
  data.datasets[0].data.push(totalHours);
  data.datasets[0].backgroundColor.push(getRandomColor()); // Assign a random color

  // Update the chart and category list display
  createPieChart();
  displayCategories();
  // Clear the input fields
  document.getElementById('categoryName').value = '';
  document.getElementById('hoursSpent').value = '';
  // Save the updated data to local storage
  saveData();
}

// Function to generate a random color for the pie chart segments
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to display categories below the chart
function displayCategories() {
  // ... existing displayCategories function ...
}

// Functions to save and load data from localStorage
function saveData() {
  // ... existing saveData function ...
}

function loadData() {
  // ... existing loadData function ...
}

function updateYearInfo() {
  // ... existing updateYearInfo function ...
}

// Initialize the pie chart with any saved data and update the year info
loadData();
updateYearInfo();
createPieChart();


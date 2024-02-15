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
  // If there's already a chart instance, destroy it to ensure we're creating a fresh one
  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      // Additional options can be set here
    }
  });
}

// Function to add a new category
function addCategory() {
  var categoryName = document.getElementById('categoryName').value.trim();
  var hoursSpent = parseFloat(document.getElementById('hoursSpent').value.trim());
  // Basic validation for empty values
  if (!categoryName || isNaN(hoursSpent) || hoursSpent <= 0) {
    alert("Please enter a category name and a valid number of hours.");
    return;
  }
  // Check if the new hours exceed the total hours in the year
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary
  const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
  if (totalAllocatedHours + hoursSpent > totalHoursInYear) {
    alert('The total hours allocated exceed the total hours in the year!');
    return; // Prevent adding the category
  }
  // Add the new category to the chart data
  data.labels.push(categoryName);
  data.datasets[0].data.push(hoursSpent);
  data.datasets[0].backgroundColor.push(getRandomColor()); // Assign a random color or choose one from a predefined set
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
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = ''; // Clear the list

  // Calculate the total hours for percentage calculation
  const totalHours = data.datasets[0].data.reduce((sum, val) => sum + val, 0);
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary

  // Check if totalHours is zero (no data), set it to total hours in a year to avoid division by zero
  const effectiveTotalHours = totalHours === 0 ? totalHoursInYear : totalHours;

  // Create list items for each category
  data.labels.forEach((label, index) => {
    const hours = data.datasets[0].data[index


// Functions to save and load data from localStorage
function saveData() {
  // ... existing saveData function ...
}

function loadData() {
  // ... existing loadData function ...
}

// Initialize the pie chart with any saved data and update the year info
loadData();
updateYearInfo();
createPieChart();


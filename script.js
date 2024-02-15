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
      maintainAspectRatio: false, // Add this line
      // ... other options
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
    const hours = data.datasets[0].data[index];
    const percentage = ((hours / effectiveTotalHours) * 100).toFixed(2); // Calculate the percentage

    // Create a list item for the category and its calculated percentage
    const listItem = document.createElement('div');
    listItem.innerText = `${label}: ${hours} hours (${percentage}%)`;

    // Add a delete button to each list item (code for delete button remains the same as before)
    // ...

    categoryList.appendChild(listItem);
  });

  // If there are no categories, display 'Unallocated' at 100%
  if (data.labels.length === 0) {
    const listItem = document.createElement('div');
    listItem.innerText = `Unallocated: ${totalHoursInYear} hours (100%)`;
    categoryList.appendChild(listItem);
  }
}



// Functions to save and load data from localStorage
function saveData() {
  // ... existing saveData function ...
}

function loadData() {
  // ... existing loadData function ...
}

function updateYearInfo() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59); // December 31st
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  
  const daysLeft = Math.ceil((endOfYear - now) / msPerDay);
  const hoursLeft = daysLeft * 24;

  document.getElementById('yearInfo').innerHTML = `
    <div>${daysLeft} Days left in ${currentYear}</div>
    <div>${hoursLeft} Hours left in ${currentYear}</div>
  `;
}


// Initialize the pie chart with any saved data and update the year info
loadData();
updateYearInfo();
createPieChart();


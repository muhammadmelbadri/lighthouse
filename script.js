function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  const hoursSpent = document.getElementById('hoursSpent').value;

  // Add the new category to the pie chart data
  data.labels.push(categoryName);
  data.datasets[0].data.push(hoursSpent);
  data.datasets[0].backgroundColor.push(getRandomColor()); // A function to generate a random color

  // Update the chart
  createPieChart();

  // Clear the input fields
  document.getElementById('categoryName').value = '';
  document.getElementById('hoursSpent').value = '';
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  const ctx = document.getElementById('chartArea').getContext('2d');
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      // ... options here
    }
  });
}

var data = {
  labels: [
    // Category labels go here
  ],
  datasets: [{
    data: [
      // Corresponding values go here
    ],
    backgroundColor: [
      // Colors for each slice go here
    ],
    hoverOffset: 4
  }]
};

function createPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    }
  });
}

function displayCategories() {
  // Get the container that will hold the list of categories
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';  // Clear existing categories

  // Loop through each category and create list items
  data.labels.forEach(function(label, index) {
    const listItem = document.createElement('div');
    listItem.innerText = `${label}: ${data.datasets[0].data[index]} hours`;
    
    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
      // Remove the category and update the chart
      data.labels.splice(index, 1);
      data.datasets[0].data.splice(index, 1);
      data.datasets[0].backgroundColor.splice(index, 1);
      createPieChart();
      displayCategories();
    };

    listItem.appendChild(deleteButton);
    categoryList.appendChild(listItem);
  });
}

// Update addCategory to call displayCategories
function addCategory() {
  // ... existing addCategory code ...
  
  // Now also update the category display
  displayCategories();
}


function saveData() {
  localStorage.setItem('pieChartData', JSON.stringify(data));
}

function loadData() {
  const storedData = localStorage.getItem('pieChartData');
  if (storedData) {
    data = JSON.parse(storedData);
    createPieChart();
    displayCategories();
  }
}

// Call loadData when the script loads
loadData();

function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  const hoursSpent = parseInt(document.getElementById('hoursSpent').value, 10);

  // Calculate total hours already allocated
  const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary

  // Check if the new hours exceed the total hours in the year
  if (totalAllocatedHours + hoursSpent > totalHoursInYear) {
    alert('The total hours allocated exceed the total hours in the year!');
    return; // Prevent adding the category
  }

  // ... rest of the addCategory function ...
}

// Assuming data is already defined in your script
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
  // Get the context of the canvas element we want to select
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

  // Add the new category to the chart data
  data.labels.push(categoryName);
  data.datasets[0].data.push(hoursSpent);
  data.datasets[0].backgroundColor.push(getRandomColor()); // Assign a random color or choose one from a predefined set

  // Update the chart
  createPieChart();

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

// Call these functions to initialize the pie chart with any saved data
loadData();
createPieChart();

// Make sure to include functions for saveData and loadData here as well

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
  // If no categories are present, set up 'Unallocated'
  if (data.labels.length === 0) {
    data.labels.push('Unallocated');
    data.datasets[0].data.push(24 * 365); // Total hours in a non-leap year
    data.datasets[0].backgroundColor.push('#cccccc'); // A neutral color for 'Unallocated'
  }

  var ctx = document.getElementById('chartArea').getContext('2d');
  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // Additional options here...
    }
  });
}

function addCategory() {
  // ...existing code to retrieve and validate categoryName and hoursSpent...

  // Calculate total hours already allocated, including the "Unallocated" slice if present
  const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary

  // Check if the new hours exceed the total hours in the year
  if (totalAllocatedHours + hoursSpent > totalHoursInYear) {
    alert('The total hours allocated exceed the total hours in the year!');
    return; // Prevent adding the category
  }

  // If there is an "Unallocated" slice, update it; otherwise, add a new category
  const unallocatedIndex = data.labels.indexOf('Unallocated');
  if (unallocatedIndex !== -1) {
    data.datasets[0].data[unallocatedIndex] -= hoursSpent;
    if (data.datasets[0].data[unallocatedIndex] <= 0) {
      // If the "Unallocated" time becomes zero, remove it from the dataset
      data.labels.splice(unallocatedIndex, 1);
      data.datasets[0].data.splice(unallocatedIndex, 1);
      data.datasets[0].backgroundColor.splice(unallocatedIndex, 1);
    }
  } else {
    data.labels.push(categoryName);
    data.datasets[0].data.push(hoursSpent);
    data.datasets[0].backgroundColor.push(getRandomColor()); // A function to generate a random color
  }

  // ...existing code to update the chart, clear input fields, and save data...
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

  // Create list items for each category
  data.labels.forEach((label, index) => {
    const listItem = document.createElement('div');
    listItem.innerText = `${label}: ${data.datasets[0].data[index]} hours`;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
      // Remove the category data from the arrays
      data.labels.splice(index, 1);
      data.datasets[0].data.splice(index, 1);
      data.datasets[0].backgroundColor.splice(index, 1);

      // Recalculate the "Unallocated" time
      const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
      const unallocatedTime = totalHoursInYear - totalAllocatedHours;

      // Update or add the "Unallocated" slice
      const unallocatedIndex = data.labels.indexOf('Unallocated');
      if (unallocatedTime > 0) {
        if (unallocatedIndex !== -1) {
          data.datasets[0].data[unallocatedIndex] = unallocatedTime;
        } else {
          data.labels.push('Unallocated');
          data.datasets[0].data.push(unallocatedTime);
          data.datasets[0].backgroundColor.push('#cccccc'); // A neutral color for 'Unallocated'
        }
      } else if (unallocatedIndex !== -1) {
        data.labels.splice(unallocatedIndex, 1);
        data.datasets[0].data.splice(unallocatedIndex, 1);
        data.datasets[0].backgroundColor.splice(unallocatedIndex, 1);
      }

      // Update the chart and the category list display
      createPieChart();
      displayCategories();
      saveData(); // Save the updated data
    };

    listItem.appendChild(deleteButton);
    categoryList.appendChild(listItem);
  });
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

function calculateTotalHours(hours, frequency) {
  const daysInYear = 365; // Or 366 for a leap year
  const weeksInYear = 52;
  const monthsInYear = 12;

  let totalHours;
  switch (frequency) {
    case 'daily':
      totalHours = hours * daysInYear;
      break;
    case 'weekly':
      totalHours = hours * weeksInYear;
      break;
    case 'monthly':
      totalHours = hours * monthsInYear;
      break;
    default:
      totalHours = 0;
  }
  return totalHours;
}

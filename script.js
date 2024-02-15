// Data structure for the pie chart
var data = {
  labels: ['Unallocated'], // Start with 'Unallocated' as the default category
  datasets: [{
    data: [24 * 365], // Start with the total number of hours in a year
    backgroundColor: ['#cccccc'], // A neutral color for 'Unallocated'
    hoverOffset: 4
  }]
};

// Function to create or update the pie chart
function createPieChart() {
  var ctx = document.getElementById('chartArea').getContext('2d');
  if (window.myPieChart) {
    window.myPieChart.destroy(); // Destroy the existing chart before creating a new one
  }
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false // Ensure the chart fits in its container
    }
  });
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
// Function to calculate total hours based on frequency
function calculateTotalHours(hours, frequency) {
  const daysInYear = 365; // Adjust for leap years if necessary
  const weeksInYear = 52;
  const monthsInYear = 12;
  switch (frequency) {
    case 'daily': return hours * daysInYear;
    case 'weekly': return hours * weeksInYear;
    case 'monthly': return hours * monthsInYear;
    default: return 0;
  }
}

// Function to add a new category
function addCategory() {
  // ...other code remains unchanged...

  // Calculate the total hours for the category
  const totalHours = calculateTotalHours(hoursSpent, frequency);

  // Calculate the current allocated hours excluding any existing 'Unallocated' category
  let allocatedHours = 0;
  for (let i = 0; i < data.labels.length; i++) {
    if (data.labels[i] !== 'Unallocated') {
      allocatedHours += data.datasets[0].data[i];
    }
  }

  // Determine the hours currently allocated to 'Unallocated', if it exists
  const unallocatedIndex = data.labels.indexOf('Unallocated');
  const unallocatedHours = unallocatedIndex !== -1 ? data.datasets[0].data[unallocatedIndex] : 24 * 365;

  // Check if adding this category would exceed the total hours in the year
  if (allocatedHours + totalHours > 24 * 365) {
    alert('Adding this category would exceed the total hours in the year!');
    return;
  }

  // Add or update the category
  const categoryIndex = data.labels.indexOf(categoryName);
  if (categoryIndex === -1) {
    // New category
    data.labels.push(categoryName);
    data.datasets[0].data.push(totalHours);
    data.datasets[0].backgroundColor.push(getRandomColor());
  } else {
    // Update existing category
    data.datasets[0].data[categoryIndex] += totalHours;
  }

  // Adjust 'Unallocated' hours
  if (unallocatedIndex !== -1) {
    data.datasets[0].data[unallocatedIndex] = unallocatedHours - totalHours;
  }

  // ...remaining code for createPieChart, displayCategories, and saveData...
}

// Function to update the information about the year
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

// Functions to save and load data from localStorage
function saveData() {
  localStorage.setItem('pieChartData', JSON.stringify(data));
}

function loadData() {
  const storedData = localStorage.getItem('pieChartData');
  if (storedData) {
    data = JSON.parse(storedData);
    createPieChart();
  }
}

// Function to display categories below the chart
function displayCategories() {
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = ''; // Clear the list

  // Sort categories by hours in descending order
  const sortedCategories = data.labels.map((label, index) => ({
    label,
    hours: data.datasets[0].data[index]
  })).sort((a, b) => b.hours - a.hours);

  // Create list items for each category
  sortedCategories.forEach(category => {
    const listItem = document.createElement('div');
    listItem.innerText = `${category.label}: ${category.hours} hours`;
    categoryList.appendChild(listItem);
  });
}

// Initialize the pie chart with any saved data and update the year info
loadData();
updateYearInfo();
createPieChart();


// Additional function to handle the deletion of categories
function deleteCategory(index) {
  // ...other code remains unchanged...

  // Retrieve the hours for the category being deleted
  const hoursToRemove = data.datasets[0].data[index];

  // Remove the category from the dataset
  data.labels.splice(index, 1);
  data.datasets[0].data.splice(index, 1);
  data.datasets[0].backgroundColor.splice(index, 1);

  // Update 'Unallocated' hours
  const unallocatedIndex = data.labels.indexOf('Unallocated');
  if (unallocatedIndex !== -1) {
    data.datasets[0].data[unallocatedIndex] += hoursToRemove;
  } else {
    data.labels.push('Unallocated');
    data.datasets[0].data.push(hoursToRemove);
    data.datasets[0].backgroundColor.push('#cccccc');
  }

  // ...remaining code for createPieChart, displayCategories, and saveData...
}

  
  // Remove the category from the dataset
  data.labels.splice(index, 1);
  data.datasets[0].data.splice(index, 1);
  data.datasets[0].backgroundColor.splice(index, 1);

  // Update the pie chart and category list
  createPieChart();
  displayCategories();
  saveData();
}

// Update the displayCategories function to include delete buttons
function displayCategories() {
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = ''; // Clear the list

  // Sort categories by hours in descending order
  const sortedCategories = data.labels.map((label, index) => ({
    label,
    hours: data.datasets[0].data[index]
  })).sort((a, b) => b.hours - a.hours);

  // Create list items for each category
  sortedCategories.forEach((category, sortedIndex) => {
    const listItem = document.createElement('div');
    const originalIndex = data.labels.indexOf(category.label); // Find the original index before sorting
    listItem.innerText = `${category.label}: ${category.hours} hours`;

    // Add a delete button if the category is not 'Unallocated'
    if (category.label !== 'Unallocated') {
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = function() { deleteCategory(originalIndex); };
      listItem.appendChild(deleteButton);
    }

    categoryList.appendChild(listItem);
  });
}

// Call these functions to initialize the pie chart with any saved data
loadData(); // This will load data from localStorage if available
updateYearInfo(); // This will set the year info on page load
createPieChart(); // This will create the pie chart with the loaded data

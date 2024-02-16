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
  var categoryName = document.getElementById('categoryName').value.trim();
  var hoursSpent = parseFloat(document.getElementById('hoursSpent').value.trim());
  var frequency = document.getElementById('frequency').value;

  // Validate hours to not exceed 24 and to be positive
  if (!categoryName || isNaN(hoursSpent) || hoursSpent <= 0 || hoursSpent > 24) {
    alert("Please enter a category name and a valid number of hours (1-24).");
    return;
  }

  // Calculate the total hours for the year based on the frequency
  var totalHours = calculateTotalHours(hoursSpent, frequency);

  // Check if the new total hours exceed the total hours in the year
  const totalHoursInYear = 24 * 365; // Adjust for leap years if necessary
  const totalAllocatedHours = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
  if (totalAllocatedHours + totalHours > totalHoursInYear) {
    alert('The total hours allocated exceed the total hours in the year!');
    return; // Prevent adding the category
  }

  // Update or add the new category
  const existingIndex = data.labels.indexOf(categoryName);
  if (existingIndex !== -1) {
    // Update existing category
    data.datasets[0].data[existingIndex] += totalHours;
  } else {
    // Add new category
    data.labels.push(categoryName);
    data.datasets[0].data.push(totalHours);
    data.datasets[0].backgroundColor.push(getRandomColor()); // Assign a random color
  }

  // Update the chart and category list display
  createPieChart();
  displayCategories();
  // Clear the input fields
  document.getElementById('categoryName').value = '';
  document.getElementById('hoursSpent').value = '';
  // Save the updated data to local storage
  saveData();
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
  if (data.labels[index] !== 'Unallocated') {
    // Retrieve the hours for the category being deleted
    const hoursToRemove = data.datasets[0].data[index];

    // Remove the category from the dataset
    data.labels.splice(index, 1);
    data.datasets[0].data.splice(index, 1);
    data.datasets[0].backgroundColor.splice(index, 1);

    // Update 'Unallocated' hours
    const unallocatedIndex = data.labels.indexOf('Unallocated');
    if (unallocatedIndex !== -1) {
      // Add back the hours to 'Unallocated', ensuring it doesn't exceed the total hours in a year
      data.datasets[0].data[unallocatedIndex] = Math.min(data.datasets[0].data[unallocatedIndex] + hoursToRemove, 24 * 365);
    } else {
      // If 'Unallocated' doesn't exist, create it with the removed hours
      data.labels.push('Unallocated');
      data.datasets[0].data.push(hoursToRemove);
      data.datasets[0].backgroundColor.push('#cccccc');
    }
   else {
    // If trying to delete 'Unallocated', simply ignore as it should always exist
    console.log("Can't delete 'Unallocated' category.");
    return;
  }

  // Update the pie chart and category list
  createPieChart();
  displayCategories();
  saveData();


  
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

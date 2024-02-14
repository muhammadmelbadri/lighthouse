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
  var ctx = document.getElementById('pieChart').getContext('2d');
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

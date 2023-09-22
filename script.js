// Get all tab buttons and tab content elements
// Inside your extension's JavaScript code

// Now you can use XLSX library methods here

const tabButtons = document.querySelectorAll('.tab-button');
const tabs = document.querySelectorAll('.tab');

// Add a click event listener to each tab button
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove the 'active' class from all tab buttons and tabs
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabs.forEach((tab) => tab.classList.remove('active'));

    // Add the 'active' class to the clicked tab button and corresponding tab content
    button.classList.add('active');
    const tabId = button.id.replace('Tab', ''); // Extract the tab ID from the button's ID
    document.getElementById(tabId).classList.add('active');
  });
});

document.getElementById('HomeTab').click(); // Click the 'Home' tab button by default


// Get references to the search input and search button elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Get references to the tab content elements
const companiesTab = document.getElementById('Companies');
const editorialTab = document.getElementById('Editorial');
const HomeTab = document.getElementById('Home');
const searchstatus = document.getElementById('search-status');

// Add an event listener to the search button
searchButton.addEventListener('click', () => {
    // Get the user's search query from the input field
    const searchTerm = searchInput.value.toLowerCase();

    // Clear any previous content in the Companies and Editorial tabs
    companiesTab.innerHTML = 'Loading...';
    editorialTab.innerHTML = 'Loading...';
    searchstatus.innerHTML = "Searching for: " + searchTerm + " .....";
    // Perform the search and update the content of the tabs
    searchAndDisplayContent(searchTerm);
});

// Example search and content update function for a locally stored XLSX file
function searchAndDisplayContent(query) {
    
  let formData = new FormData();
  formData.append('url', query);

  fetch('https://manrajmann.pythonanywhere.com/problem', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      
      companiesTab.innerHTML = maketags(data.data.Companies);
      editorialTab.innerHTML = data.data.Solution;
      
      searchstatus.innerHTML = "Found results for: " + query;
  })
  .catch(error => {
      console.error(error);
  });

}

function maketags(data){

  let tags = "";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      tags += `<div class="companies-tag">${(key.toUpperCase())} <div class="company-count">${value}</div> </div>`;
    }
  }
    
  return tags;

}


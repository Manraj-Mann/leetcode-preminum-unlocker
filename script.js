// Get all tab buttons and tab content elements
// Inside your extension's JavaScript code

// Now you can use XLSX library methods here

const tabButtons = document.querySelectorAll(".tab-button");
const tabs = document.querySelectorAll(".tab");

// Add a click event listener to each tab button
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the 'active' class from all tab buttons and tabs
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add the 'active' class to the clicked tab button and corresponding tab content
    button.classList.add("active");
    const tabId = button.id.replace("Tab", ""); // Extract the tab ID from the button's ID
    document.getElementById(tabId).classList.add("active");

    // Check if the editorialTab is active and embed KaTeX tags if so
    if (tabId === "Editorial") {
      embedKaTeX();
    }
  });
});

document.getElementById("HomeTab").click(); // Click the 'Home' tab button by default

// Get references to the search input and search button elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Get references to the tab content elements
const companiesTab = document.getElementById("Companies");
const editorialTab = document.getElementById("Editorial");
const HomeTab = document.getElementById("Home");
const searchstatus = document.getElementById("search-status");

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  // Get the user's search query from the input field
  const searchTerm = searchInput.value.toLowerCase();

  // Clear any previous content in the Companies and Editorial tabs
  companiesTab.innerHTML = "Loading...";
  editorialTab.innerHTML = "Loading...";
  searchstatus.innerHTML = "Searching for: " + searchTerm + " .....";
  // Perform the search and update the content of the tabs
  searchAndDisplayContent(searchTerm);
});

// Example search and content update function for a locally stored XLSX file
function searchAndDisplayContent(query) {
  let formData = new FormData();
  formData.append("url", query);

  fetch("https://manrajmann.pythonanywhere.com/problem", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      companiesTab.innerHTML = maketags(data.data.Companies);
      editorialTab.innerHTML = data.data.Solution;

      searchstatus.innerHTML = "Found results for: " + query;

      // Check if the editorialTab is active after updating its content and embed KaTeX if so
      if (editorialTab.classList.contains("active")) {
        embedKaTeX();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function maketags(data) {
  let tags = "";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      tags += `<div class="companies-tag">${key.toUpperCase()} <div class="company-count">${value}</div> </div>`;
    }
  }

  return tags;
}

// Function to embed KaTeX tags
function embedKaTeX() {
  const katexStylesheet = document.createElement("link");
  katexStylesheet.rel = "stylesheet";
  katexStylesheet.href = "assets/katex/katex.min.css";

  const katexScript = document.createElement("script");
  katexScript.src = "assets/katex/katex.min.js";

  // Append KaTeX tags to the editorialTab
  editorialTab.appendChild(katexStylesheet);
  editorialTab.appendChild(katexScript);

  // Check if the CSS file for editorialTab is already added, if not, add it
  if (!document.querySelector('link[href="editorial-tab.css"]')) {
    const editorialCSS = document.createElement("link");
    editorialCSS.rel = "stylesheet";
    editorialCSS.href = "editorial-tab.css"; // Replace with the actual CSS file path
    editorialCSS.type = "text/css";
    editorialCSS.media = "screen";
    document.head.appendChild(editorialCSS);
  }
}


// Get the button element by its id
var facebookButton = document.getElementById("TopFacebook");
var googleButton = document.getElementById("TopGoogle");
var amazonButton = document.getElementById("TopAmazon");
var microsoftButton = document.getElementById("TopMicrosoft");

// Get the companiesContainer element by its class name
var companiesContainer = document.getElementById("companies-container");
var compnaiesList = document.getElementById("companies-list");
var companiesProblems = document.getElementById("CompaniesList");

// Add a click event listener to the button
facebookButton.addEventListener("click", function () {
  
  addTopCompanyList("facebook")
  // alert("Button clicked! You can perform your action here.");
});
// Add a click event listener to the button
googleButton.addEventListener("click", function () {
  
  addTopCompanyList("google")
  // alert("Button clicked! You can perform your action here.");
});
amazonButton.addEventListener("click", function () {
  
  addTopCompanyList("amazon")
  // alert("Button clicked! You can perform your action here.");
});
microsoftButton.addEventListener("click", function () {
  
  addTopCompanyList("microsoft")
  // alert("Button clicked! You can perform your action here.");
});



function addTopCompanyList(company){

  // Your action to perform when the button is clicked goes here
  companiesContainer.style.visibility = "visible";
  companiesContainer.style.display = "block";
  compnaiesList.style.visibility = "hidden";
  compnaiesList.style.display = "none";

  let list = "";

  let formData = new FormData();
  formData.append("company", company);
  
  var url = "https://manrajmann.pythonanywhere.com/topcompany";
  fetch(url , {
    method: "POST",
    body: formData,
  })
    .then(response => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Handle the JSON data here
    
      // console.log(JSON.parse(data.data));
      var index = 1;
      JSON.parse(data.data).forEach(element => {
        
        list += `<tr>
        <td>${index++}</td>
        <td><a href="${element[4]}" target="_blank">${element[2]}</a></td>
        <td>${element[5]}</td>
        <td>${(element[3] * 100).toFixed(2) + "%"}</td>
        <td class="frequency-cell" style="--frequency: ${element[1]};"></td>
        </tr>`;
        
      });

      companiesProblems.innerHTML = list;

      
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch Error:', error);
    });


}
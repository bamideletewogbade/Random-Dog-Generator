const searchForm = document.querySelector(".search");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

searchForm.addEventListener("click", async (e) => {
  e.preventDefault();
  searchQuery = document.querySelector(".input").value;
  const url = `https://jsearch.p.rapidapi.com/search?query="Python"`;
  try {
    const data = await getData(url);
    generateHTML(data);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "898b042769msh0fa009a1f03be8dp1d2da1jsn46e67c7e680e",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

const getData = async (url) => {
  const response = await fetch(url, options);
  const json = await response.json();
  return json.data; // assuming the API returns an array of data objects
};

function generateHTML(results) {
  let generatedHTML = "";
  for (let i = 0; i < results.length; i += 3) {
    generatedHTML += `<div class="row">`;
    for (let j = i; j < i + 3 && j < results.length; j++) {
      const result = results[j];
      generatedHTML += `
        <div class="col-md-4">
          <div class="card mt-4">
            <h1 class="card-title">${result.job_title}</h1>
            <p class="item-data">${result.employer_name}</p>
          </div>
        </div>
      `;
    }
    generatedHTML += `</div>`;
  }
  const searchResultDiv = document.querySelector("#search-result");
  searchResultDiv.innerHTML = generatedHTML;
}


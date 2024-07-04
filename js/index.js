'use strict';
let Games = document.getElementById("Games");
let GameDetails = document.getElementById("GameDetails");
let navLinks = document.querySelectorAll(".nav-link");
let tabPane = document.querySelector(".tab-pane");
let row = document.querySelector(".row");
let details = document.querySelector(".details");
let loader = document.getElementById("loader");
let array = [];
const base_url = 'https://www.freetogame.com/api';
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};
getGames('mmorpg').then(result => { loader.classList.remove("loader"); display(result) });

class gamesClass {
  constructor(thumbnail, title, genre, platform, id, short_description) {
    this.id = id;
    this.thumbnail = thumbnail;
    this.title = title;
    this.short_description = short_description;
    this.genre = genre;
    this.platform = platform;
  }

}
class detailsClass extends gamesClass {
  constructor(thumbnail, title, genre, platform, status, description, game_url) {
    super(thumbnail, title, genre, platform);
    this.status = status;
    this.description = description;
    this.game_url = game_url;
  }

}



navLinks.forEach(element => {
  element.addEventListener("click", async function () {
    let category = element.getAttribute("data-category");
    tabPane.setAttribute("id", "pills-" + category);
    tabPane.setAttribute("aria-labelledby", "pills-" + category + "-tab");
    tabPane.classList.add("active", "show");
    await getGames(category).then(result => { loader.classList.remove("loader"); display(result) });

  })
});

async function getGames(categoreOption) {
  loader.classList.add("loader");
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoreOption}`,
    options
  );
  return await api.json();
}


function display(gamesArr) {
  let box = "";
  for (let i = 0; i < gamesArr.length; i++) {
    let game = new gamesClass(gamesArr[i].thumbnail, gamesArr[i].title, gamesArr[i].genre, gamesArr[i].platform, gamesArr[i].id, gamesArr[i].short_description);
    box += `<div class="col-lg-3 col-md-4 gameCard" onclick="getDetails(${game.id})">
              <div class="card p-3">
                <img src="${game.thumbnail ? game.thumbnail : "images/placeholder-614.webp"}" class="card-img-top" alt="game img">
                <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title text-white">${game.title}</h5>
                  <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p class="card-text text-secondary fw-medium">
                  ${game.short_description.split(" ", 8).join(",")}
                 </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <small class="text-white badge bg-dark">${game.genre}</small>
                  <small class="text-white badge bg-dark">${game.platform}</small>
                </div>
              </div>

          </div>`
  }
  row.innerHTML = box;
  console.log(row);

}

// -- details 

async function getDetails(id) {
  loader.classList.add("loader");
  Games.classList.replace("d-block", "d-none");
  GameDetails.classList.replace("d-none", "d-block");
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const responseData = await api.json().then(loader.classList.remove("loader"));
  let detail = new detailsClass(responseData.thumbnail, responseData.title, responseData.genre, responseData.platform, responseData.status, responseData.description, responseData.game_url);
  console.log(responseData);
  console.log(detail);
  details.innerHTML = `
  <div class="d-flex justify-content-between my-5">
  <h2 class="text-white display-4">Details Game</h2>
            <button type="button" class="btn-close text-white bg-white" aria-label="Close" onclick="closeDetails()"></button>
</div>
      <div class="row">
      <div class="col-md-4">
        <img src="${detail.thumbnail}" class="w-100" alt="game img" />
      </div>
      <div class="col-md-8">
        <ul class="list-unstyled">
          <li class="h3 text-white">Title: <span class="badge text-bg-info text-black">${detail.title}</span></li>
          <li class="text-white">Category:  <span class="badge text-bg-info text-black">${detail.genre}</span></li>
          <li class="text-white">Platform:  <span class="badge text-bg-info text-black">${detail.platform}</span></li>
          <li class="text-white">Status:  <span class="badge text-bg-info text-black">${detail.status}</span></li>
        </ul>
        <p>${detail.description}</p>
        <a href="${detail.game_url}" type="button" class="btn btn-outline-warning mb-5">Show Games</a>

      </div>
      </div>`
};

function closeDetails() {
  GameDetails.classList.replace("d-block", "d-none");
  Games.classList.replace("d-none", "d-block");
}
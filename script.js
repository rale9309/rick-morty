var request = new XMLHttpRequest();
var characters;
var grid = document.querySelector(".grid");
var pagination = document.querySelector(".pagination");
var page = 1;
var left;
var right;
var buttons;
var selected = 1;

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      characters = data;
      createGrid(characters);
      createButtons();
    })
    .catch((err) => console.log(err));
  // request.open(
  //   "GET",
  //   `https://rickandmortyapi.com/api/character/?page=${page}`
  // );
  // request.send();
  // request.onload = function () {
  //   characters = JSON.parse(request.responseText);
  //   console.log(JSON.parse(request.responseText));
  //   if (request.status >= 200 && request.status < 400) {
  //     createGrid(characters);
  //     createButtons();
  //   }
  // };
}

function createGrid(chars) {
  for (var i = 0; i < chars.results.length; i++) {
    var card = document.createElement("div");
    card.classList.add("card");
    var img = document.createElement("img");
    img.classList.add("image");
    img.setAttribute("src", chars.results[i].image);
    var title = document.createElement("div");
    title.classList.add("title");
    title.textContent = chars.results[i].name;

    var likeBtnBox = document.createElement("div");
    likeBtnBox.classList.add("like-btn-box");

    var likeImg = document.createElement("img");
    likeImg.classList.add("like-img");
    likeImg.setAttribute(
      "src",
      "https://freesvg.org/storage/img/thumb/1465762629.png"
    );

    var like = document.createElement("div");
    like.classList.add("like");
    like.textContent = "Like";

    likeBtnBox.appendChild(likeImg);
    likeBtnBox.appendChild(like);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(likeBtnBox);
    grid.appendChild(card);

    card.addEventListener("click", goToDetails(i));
  }
}

function goToDetails(i) {
  return function () {
    localStorage.setItem("id", characters.results[i].id);
    window.location.href = "./details.html";
  };
}

function createButtons() {
  left = document.createElement("img");
  right = document.createElement("img");
  left.setAttribute(
    "src",
    "https://freesvg.org/storage/img/thumb/aiga_left_arrow.png"
  );
  right.setAttribute(
    "src",
    "https://freesvg.org/storage/img/thumb/aiga_right_arrow.png"
  );
  left.classList.add("arrow");
  right.classList.add("arrow");
  left.classList.add("minus");
  right.classList.add("plus");
  if (page > 1) pagination.appendChild(left);

  for (var i = 0; i < 5; i++) {
    var btn = document.createElement("button");
    btn.classList.add("pag-btn");
    // btn.textContent = i;

    if (page === 1) {
      // btn.classList.add("selected");
      btn.textContent = page + i;
    } else if (page === 2) {
      btn.textContent = page + i - 1;
    } else if (page > 2 && page <= 40) {
      btn.textContent = page + i - 2;
    } else if (page === 41) {
      btn.textContent = page + i - 3;
    } else if (page === 42) {
      btn.textContent = page + i - 4;
    }
    page == btn.innerText
      ? btn.classList.add("selected")
      : btn.classList.remove("selected");
    pagination.appendChild(btn);

    btn.addEventListener("click", goToPage(i));
  }
  if (page < characters.info.pages) pagination.appendChild(right);

  left.addEventListener("click", function () {
    pagination.innerHTML = "";
    grid.innerHTML = "";
    if (page > 1) {
      page--;
    } else if (page === 1) {
      page = characters.info.pages;
      console.log(page);
    }

    fetchData();
  });
  right.addEventListener("click", function () {
    pagination.innerHTML = "";
    grid.innerHTML = "";
    if (page < characters.info.pages) {
      page++;
    } else if (page === characters.info.pages) {
      page = 1;
    }

    fetchData();
  });
}

function goToPage(i) {
  return function () {
    page = +this.textContent;
    pagination.innerHTML = "";
    grid.innerHTML = "";
    fetchData();
  };
}
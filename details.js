var detailsBox = document.querySelector(".details");

window.addEventListener("load", function () {
  var id = Number(this.localStorage.getItem("id"));

  this.fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => createDetails(data))
    .catch((err) => console.log(err));
});

function createDetails(specs) {
  var img = document.createElement("img");
  img.classList.add("details-img");
  img.setAttribute("src", specs.image);
  var name = document.createElement("div");
  name.classList.add("name");
  name.textContent = specs.name;
  var lokacija = document.createElement("div");
  lokacija.classList.add("lokacija");
  lokacija.textContent = specs.location.name;
  var specie = document.createElement("div");
  specie.classList.add("species");
  specie.textContent = specs.species;
  var status = document.createElement("div");
  status.classList.add("status");
  status.textContent = specs.status;

  detailsBox.appendChild(img);
  detailsBox.appendChild(name);
  detailsBox.appendChild(lokacija);
  detailsBox.appendChild(specie);
  detailsBox.appendChild(status);
}
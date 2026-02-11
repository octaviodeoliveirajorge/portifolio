const container = document.getElementById("content");
const searchInput = document.getElementById("search");
const buttons = document.querySelectorAll("nav button");

function render(data) {
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    if(item.type === "image") {
      card.innerHTML = `<img src="${item.src}" alt="${item.title}"><h3>${item.title}</h3>`;
      card.querySelector("img").onclick = () => openModal(item.src);
    }

    if(item.type === "video") {
      card.innerHTML = `<iframe src="${item.embed}" allowfullscreen></iframe><h3>${item.title}</h3>`;
    }

    if(item.type === "text") {
      card.innerHTML = `<h3>${item.title}</h3><p>${item.content}</p>`;
    }

    if(item.type === "pdf") {
      card.innerHTML = `<h3>${item.title}</h3><a href="${item.src}" target="_blank">Abrir PDF</a>`;
    }

    container.appendChild(card);
  });
}

buttons.forEach(btn => {
  btn.onclick = () => {
    const filter = btn.dataset.filter;
    if(filter === "all") render(portfolioData);
    else render(portfolioData.filter(item => item.category === filter));
  };
});

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  render(portfolioData.filter(item =>
    item.title.toLowerCase().includes(value)
  ));
});

function openModal(src) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalImg").src = src;
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

render(portfolioData);

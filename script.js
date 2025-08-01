
const form = document.getElementById("postForm");
const feed = document.getElementById("feed");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagenInput = document.getElementById("imagen");
  const archivo = imagenInput.files[0];

  if (!archivo) return;

  const imgURL = URL.createObjectURL(archivo);

  const col = document.createElement("div");
  col.classList.add("col-md-6", "col-lg-4");

  col.innerHTML = `
    <div class="card shadow-sm h-100">
      <img src="${imgURL}" alt="Publicación">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">${descripcion}</p>
        <button class="like-btn mt-auto">❤️ <span class="like-count">0</span></button>
      </div>
    </div>
  `;

  feed.prepend(col);

  const likeBtn = col.querySelector(".like-btn");
  const likeCount = col.querySelector(".like-count");
  let liked = false;

  likeBtn.addEventListener("click", () => {
    liked = !liked;
    if (liked) {
      likeBtn.classList.add("liked");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    } else {
      likeBtn.classList.remove("liked");
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
  });

  form.reset();
});

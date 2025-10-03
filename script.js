
const form = document.getElementById("postForm");
const feed = document.getElementById("feed");

window.addEventListener("DOMContentLoaded", () => {
  let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
  publicaciones.forEach(pub => mostrarPublicacion(pub.titulo, pub.descripcion, pub.imagen));
})
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagenInput = document.getElementById("imagen");
  const archivo = imagenInput.files[0];

  let publicacion = JSON.parse(localStorage.getItem("publicaciones")) || [];

  if (!archivo) return;

  const archivoR = new FileReader();
  archivoR.onload = function(e){
    const img64 = e.target.result;

    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];

    const nuevaPublicacion = {
      titulo,
      descripcion,
      imagen: img64
    };

    publicaciones.unshift(nuevaPublicacion);

    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

    mostrarPublicacion(titulo, descripcion, img64)
  };

  archivoR.readAsDataURL(archivo);

  form.reset();

});

function mostrarPublicacion(titulo, descripcion, imagen) {
    const col = document.createElement("div");
  col.classList.add("col-md-6", "col-lg-4");

  col.innerHTML = `
    <div class="card shadow-sm h-100 publicacion">
      <img src="${imagen}" alt="Publicación">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">${descripcion}</p>
        <button class="like-btn mt-auto">❤️ <span class="like-count">0</span></button>
      </div>
    </div>
  `;

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
  feed.prepend(col);
};

/* Click-to-enlarge lightbox for .gallery images. */
(function () {
  const lb = document.createElement("div");
  lb.id = "lb";
  lb.innerHTML = '<span class="x" aria-label="Close">&times;</span><img alt=""><div class="cap"></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".cap");

  document.querySelectorAll(".gallery figure").forEach(fig => {
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      const cap = fig.querySelector("figcaption");
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
      lbCap.textContent = cap ? cap.textContent : "";
      lb.classList.add("open");
    });
  });

  function close() { lb.classList.remove("open"); }
  lb.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();

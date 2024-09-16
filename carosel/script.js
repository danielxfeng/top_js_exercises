let container = document.getElementById("carosel_container");

let baseDiv = document.createElement("div");
baseDiv.className = "carosel_base";

for (let i = 1; i <= 5; i++) {
  let img = document.createElement("img");
  img.src = `./images/${i}.webp`;
  img.alt = `carosel_img_${i}`;
  img.className = "carosel_img";
  baseDiv.appendChild(img);
}

let box = document.createElement("div");
box.className = "carosel_box";
box.appendChild(baseDiv);

let dots = document.createElement("div");
dots.className = "carosel_dots";
for (let i = 1; i <= 3; i++) {
  let dot = document.createElement("div");
  dot.className = "carosel_dot";
  dot.setAttribute("id", `carosel_dot_${i}`);
  dot.textContent = "•";
  dots.appendChild(dot);
}

let bigBox = document.createElement("div");
bigBox.className = "carosel_big_box";
bigBox.appendChild(box);
bigBox.appendChild(dots);

let left = document.createElement("div");
left.className = "carosel_btn";
left.setAttribute("id", "carosel_btn_left");
left.innerHTML = "<";

let right = document.createElement("div");
right.className = "carosel_btn";
right.setAttribute("id", "carosel_btn_right");
right.innerHTML = ">";

container.appendChild(left);
container.appendChild(bigBox);
container.appendChild(right);



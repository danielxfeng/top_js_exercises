let container = document.getElementById("carosel_container");

let baseDiv = document.createElement("div");
baseDiv.className = "carosel_base";
for (let i = 0; i < 5; i++) {
  let img = document.createElement("img");
  img.src = `./images/${i + 1}.webp`;
  img.alt = `carosel_img_${i}`;
  img.className = "carosel_img";
  baseDiv.appendChild(img);
}

let btns = document.createElement("div");
btns.className = "carosel_btns";
for (let i = 0; i < 2; i++) {
  let btn = document.createElement("div");
  btn.className = "carosel_btn";
  btn.setAttribute("id", `carosel_btn_${i}`);
  btn.textContent = i === 0 ? "<" : ">";
  btn.addEventListener("click", () => {btnClick(i)});
  btns.appendChild(btn);
}

let dots = document.createElement("div");
dots.className = "carosel_dots";
for (let i = 0; i < 5; i++) {
  let dot = document.createElement("div");
  dot.className = "carosel_dot";
  dot.setAttribute("id", `carosel_dot_${i}`);
  if (i === 0) {
    dot.textContent = "●";
  } else {
    dot.textContent = "○";
  }

  dot.addEventListener("click", () => {dotClick(i)});
  dots.appendChild(dot);
}

container.appendChild(baseDiv);
container.appendChild(btns);
container.appendChild(dots);

let currPic = 0;

function dotClick(idx) {
  let dots = document.getElementsByClassName("carosel_dot");
  for (let dot of dots) {
    dot.textContent = "○";
  }
  dots[idx].textContent = "●";
  currPic = idx;
  let baseDiv = document.getElementsByClassName("carosel_base")[0];
  baseDiv.style.transform = `translateX(-${idx * 510}px)`;
}

function btnClick(dir) {
  let idx = currPic;
  if (dir === 0) {
    idx = idx === 0 ? idx = 4 : idx - 1;
  } else {
    idx = idx === 4 ? idx = 0 : idx + 1;
  }
  dotClick(idx);
}

function autoChange() {
  setInterval(()=>{btnClick(1)}, 5000);
}

autoChange();
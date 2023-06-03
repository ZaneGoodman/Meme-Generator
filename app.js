const form = document.querySelector("#generator");
const imgInput = document.querySelector("#img-input");
const topText = document.querySelector("#top");
const bottomText = document.querySelector("#bottom");
const submitBtn = document.querySelector("button");

const color = document.querySelector("#text-color");
const memeSection = document.querySelector("#memes");

const messages = document.querySelector("#messages");

function addDeleteButton(canvas) {
  // create divs to place a canvas into and another to place a remove button into
  let memeDiv = document.createElement("div");
  let rmvBtn = document.createElement("button");
  let rmvBtnDiv = document.createElement("div");
  rmvBtnDiv.append(rmvBtn);
  rmvBtn.classList.add("rmv-button-style");
  rmvBtn.innerText = "delete";
  // only append the picture if it exist
  if (canvas.width > 0) {
    memeDiv.append(canvas);
    memeDiv.append(rmvBtnDiv);

    memeSection.append(memeDiv);
  }
  // event listener on all remove buttons to delete it and its meme
  rmvBtn.addEventListener("click", function (e) {
    let rmvBtnDiv = e.target.parentElement;
    let memeDiv = rmvBtnDiv.parentElement;
    rmvBtnDiv.remove();
    memeDiv.remove();
  });
}

function showMessage() {
  // create message and add to message section
  const successMsg = document.createElement("p");
  successMsg.innerText = "Meme created!";
  successMsg.classList.add("success");
  if (imgInput.value !== "") {
    if (topText.value !== "") {
      messages.append(successMsg);
      successMsg.classList.add("fade-out");
    }
  }
  // delete paragraph after fade out is complete
  setTimeout(() => {
    messages.removeChild(successMsg);
  }, 3000);
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // create image
  let image = new Image();
  image.src = imgInput.value;

  // create canvas

  let canvas = document.createElement("canvas");

  updateMemeCanvas(image, canvas, topText.value, bottomText.value, color.value);
  addDeleteButton(canvas);
  // make sure a meme was actually appended
  if (canvas.width > 100) {
    showMessage();
  }
});

function updateMemeCanvas(image, canvas, topText, bottomText, textColor) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;

  // udate canvas background
  canvas.width = width;
  canvas.height = height;
  const fontSize = Math.floor(width / 15);
  const yOffset = height / 25;

  ctx.drawImage(image, 0, 0);
  // prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // add top text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}

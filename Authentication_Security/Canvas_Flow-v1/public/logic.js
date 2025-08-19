const coverImg = document.querySelector("#cover-img");
const oneOrTwoCoverImg = Math.floor(Math.random() * 2) + 1;
coverImg.setAttribute("src", `images/canvas-flow-cover-img-${oneOrTwoCoverImg}.png`);
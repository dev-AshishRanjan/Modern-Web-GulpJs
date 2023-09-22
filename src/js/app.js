const images = document.querySelectorAll("img");
var currCount = 3;
const totalImg = 24;
// Change the image source on click
images.forEach((image) =>
  image.addEventListener("click", function () {
    currCount = (currCount + 1) % totalImg;
    console.log({ currCount });
    image.src = `./dist/images/${currCount}.jpeg`;
  })
);

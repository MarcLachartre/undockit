let i = -1;
let start = false;

setInterval(() => {
  if (i === -1) {
    self.addEventListener("message", function (event) { // add event listener to start the animation timer when user gives input; 
      if (event.data === "start animation timer") {
        i = 0;
        start = true;
      }
    })
  }

  if (i % 3 == 0 && start === true && i % 2 == 0) {
    self.postMessage({spriteTimer: i/3, animationTimer: i/2});
  } else {
    if (i % 3 == 0 ) {
      self.postMessage({spriteTimer: i/3});
    }
      
    if (start === true && i % 2 == 0) {
      self.postMessage({animationTimer: i/2});
    }
  }

  i++
}, 50);

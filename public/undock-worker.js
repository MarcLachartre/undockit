let i = 0;

self.addEventListener("message", function (event) {
  setInterval(() => {
    const counter = () => {
        self.postMessage(i);
        i++
    }
    counter() 
  }, 100);
});
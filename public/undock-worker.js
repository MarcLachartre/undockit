// // onmessage = function(e) {
//     // console.log("cul")
//     let i = 0
    
// //   }
let i = 0
// // console.log(i)
// //         i++


self.addEventListener("message", function (event) {
    console.log("Hello world from the Service Worker ");

    setInterval(() => {
      const counter = () => {
          // console.log(i)
          self.postMessage(i);
          i++
      }
      counter() 
  }, 100);
  });
// self.addEventListener('message', (event) => console.log('Worker received:', event.data));
// self.postMessage('from Worker');

// self.addEventListener("message", function (event) {
//   console.log("Hello world from the Service Worker 🤙");

// });
// console.log(self)
// self.postMessage('I\'m alive!')
// onmessage = function(e) {
//   console.log('Message received from main script');
//   var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//   console.log('Posting message back to main script');
//   postMessage(workerResult);
// }
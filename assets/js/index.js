// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: './' }).then(function(reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

function calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

document.addEventListener('DOMContentLoaded', function(event) {
  let age = calculateAge(new Date('1979-03-06T10:10:00'));
  console.log('Hey. You are peaking into the console? Nice. But there is not a lot going on here. Just some minor JS fiddle. Yes it uses webpack but actually only for fun and experimentation');
  let ele = document.querySelector('span#calced-age');
  // console.log(ele);

  if (ele !== null){

    let counter = 0;
    let interval = setInterval(()=>{
      if (counter === age){
        // ele.classList.remove('shake');
        clearInterval(interval);
      } else {
        counter++;
        ele.innerHTML = counter;
      }
    }, 23);
    // ele.innerHTML = age;
    // console.log(ele);
  }
});

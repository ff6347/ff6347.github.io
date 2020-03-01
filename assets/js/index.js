function calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

document.addEventListener('DOMContentLoaded', function(_event) {
  let age = calculateAge(new Date('1979-03-06T10:10:00'));
  console.log(
    'Hey. You are peaking into the console? Nice. But there is not a lot going on here. Just some minor JS fiddle. Yes it uses webpack but actually only for fun and experimentation',
  );
  let ele = document.querySelector('span#calced-age');
  // console.log(ele);
  if (ele !== null) {
    let counter = 0;
    let interval = setInterval(() => {
      if (counter === age) {
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

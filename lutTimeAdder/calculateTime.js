window.addEventListener('load', async () => {
  let durations = [];

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  while (durations.length <= 0) {
    durations = [...document.getElementsByClassName('duration')];
    await sleep(50);
  }

  let times = durations.map((duration) => duration.innerText);

  let totalTime = times
    .map((time) => {
      const mIndex = time.indexOf('m');
      const minutes = parseInt(time.substring(0, mIndex));
      const seconds = parseInt(time.substring(mIndex + 1, time.length - 1));
      return minutes * 60 + seconds;
    })
    .reduce((a, b) => a + b, 0);

  let totalHours = Math.floor(totalTime / 3600);
  let totalMinutes = Math.floor((totalTime - totalHours * 3600) / 60);
  let totalSeconds = totalTime - totalHours * 3600 - totalMinutes * 60;

  const autoPlayP = document.querySelector('p.autoplay');

  const newSpan = document.createElement('span');
  newSpan.className = 'totalTime';

  newSpan.innerText =
    'Total Time: ' + totalHours + 'h' + totalMinutes + 'm' + totalSeconds + 's';

  autoPlayP.parentNode.insertBefore(newSpan, autoPlayP);
});

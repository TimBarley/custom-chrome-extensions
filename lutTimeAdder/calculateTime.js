let durations = [];

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.addEventListener('load', () => {
  const main = document.getElementById('main');
  main.addEventListener('DOMSubtreeModified', async () => {
    if (!window.location.pathname.startsWith('/tutorials/')) {
      durations = [];
      return;
    }

    if (durations.length > 0) {
      return;
    }

    durations = [...document.getElementsByClassName('duration')];

    if (durations.length <= 0) {
      return;
    }

    const autoPlayP = await getAutoPlayP();

    processDurations(durations, autoPlayP);
  });
});

async function getAutoPlayP() {
  let autoPlayP;

  while (!autoPlayP) {
    autoPlayP = document.querySelector('p.autoplay');
    await sleep(50);
  }

  return autoPlayP;
}

function processDurations(durations, autoPlayP) {
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

  const newSpan = document.createElement('span');
  newSpan.className = 'totalTime';

  newSpan.innerText =
    'Total Time: ' + totalHours + 'h' + totalMinutes + 'm' + totalSeconds + 's';

  autoPlayP.parentNode.insertBefore(newSpan, autoPlayP);
}

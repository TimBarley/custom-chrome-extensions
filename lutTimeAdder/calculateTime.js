let durations = [];

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.addEventListener('load', () => {
  const primaryDiv = document.getElementById('svelte');
  primaryDiv.addEventListener('DOMSubtreeModified', async () => {
    if (!window.location.pathname.startsWith('/tutorials/')) {
      durations = [];
      return;
    }

    durations = [...document.getElementsByClassName('duration')];

    if (durations.length <= 0) {
      return;
    }

    const videoList = await getVideoList();

    processDurations(durations, videoList);
  });
});

async function getVideoList() {
  let videoList;

  while (!videoList) {
    videoList = document.querySelector('ul');
    await sleep(50);
  }
  return videoList;
}

function processDurations(durations, videoList) {
  let totalTime = durations
    .map((duration) => {
      const time = duration.innerText.toLowerCase();
      const mIndex = time.indexOf('m');
      const minutes = parseInt(time.substring(0, mIndex));
      const seconds = parseInt(time.substring(mIndex + 1, time.length - 1));
      const totalDuration = minutes * 60 + seconds;
      if (totalDuration > 480 && totalDuration < 600) {
        duration.className = 'mediumTime';
      } else if (totalDuration > 600) {
        duration.className = 'longTime';
      } else {
        duration.className = 'shortTime';
      }
      return totalDuration;
    })
    .reduce((a, b) => a + b, 0);

  let totalHours = Math.floor(totalTime / 3600);
  let totalMinutes = Math.floor((totalTime - totalHours * 3600) / 60);
  let totalSeconds = totalTime - totalHours * 3600 - totalMinutes * 60;

  if (totalHours + totalMinutes + totalSeconds <= 0) return;

  const newSpan = document.createElement('span');
  newSpan.className = 'totalTime';

  newSpan.innerText =
    'Total Time: ' + totalHours + 'h' + totalMinutes + 'm' + totalSeconds + 's';

  videoList.parentNode.insertBefore(newSpan, videoList);
}

let hasError = false;

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.addEventListener('load', async () => {
  if (!window.location.pathname.startsWith('/tutorials/')) return;

  const durationSpans = document.getElementsByClassName('duration');
  const durations = [...durationSpans];

  if (durations.length <= 0) return;

  const videoList = await getVideoList(durationSpans[0]);

  processDurations(durations, videoList);
});

async function getVideoList(firstDuration) {
  return firstDuration.parentNode.parentNode.parentNode.parentNode;
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

      if (totalDuration) {
        return totalDuration;
      } else {
        duration.className = 'hasErrorInTime';
        hasError = true;
        return 0;
      }
    })
    .reduce((a, b) => a + b, 0);

  let totalHours = Math.floor(totalTime / 3600);
  let totalMinutes = Math.floor((totalTime - totalHours * 3600) / 60);
  let totalSeconds = totalTime - totalHours * 3600 - totalMinutes * 60;

  if (totalHours + totalMinutes + totalSeconds <= 0) return;

  const newSpan = document.createElement('span');
  newSpan.className = 'totalTime';

  const hasErrorText = hasError ? '<span class="errorIndicator"></span>' : '';

  newSpan.innerHTML =
    'Total Time: ' +
    totalHours +
    'h' +
    totalMinutes +
    'm' +
    totalSeconds +
    's' +
    hasErrorText;

  videoList.parentNode.insertBefore(newSpan, videoList);
}

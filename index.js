function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
let userChatId;
document.addEventListener('DOMContentLoaded', () => {
  let app = window.Telegram.WebApp;
  let query = app.initData;
  let user_data_str = parseQuery(query).user;
  let user_data = JSON.parse(user_data_str);
  app.disableVerticalSwipes();
  app.expand();
  app.ready();
  userChatId = user_data["id"];
});
function vibro() {
  console.log('pulse')
  let detect = new MobileDetect(window.navigator.userAgent);
  if (detect.os() === 'iOS') {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }
  else {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    else {
      alert("Ваш браузер/устройство не поддерживает API вибрации.")
    }
    // if ("vibrate" in navigator) {
    //   // Вибрируем устройство в течение 1000 миллисекунд (1 секунда)
    //   navigator.vibrate(10);
    // } else {
    //   // Ваш браузер не поддерживает API вибрации
    //   console.log("Ваш браузер не поддерживает API вибрации.");
    // }
  }
}

const pulseButton = document.getElementById('pulseButton');
let pulseInterval;
let isPulseActive = false;

// Определяем ритм пульса в виде массива интервалов между ударами
const pulseRhythm = [1000, 950, 1050, 920, 1000, 980, 1020, 960, 1040, 930];

function startPulse() {
  pulseInterval = setInterval(() => {
    vibro();
  }, 800);
  pulseButton.textContent = 'Остановочка пульса';
  isPulseActive = true;
}

function stopPulse() {
  clearInterval(pulseInterval);
  if (navigator.vibrate) {
    navigator.vibrate(0);
  }
  pulseButton.textContent = 'Пульс';
  isPulseActive = false;
}

pulseButton.addEventListener('click', () => {
  if (!isPulseActive) {
    startPulse();
  } else {
    stopPulse();
  }
});

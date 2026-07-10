const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const modeBtns = document.querySelectorAll('.mode-btn');
const alarm = document.getElementById('alarm');

let totalSeconds = 25 * 60;
let timer = null;
let running = false;

// 格式化 mm:ss
function formatTime(s) {
  const min = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}
timeEl.innerText = formatTime(totalSeconds);

// 切换模式（25/5/15）
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    clearInterval(timer);
    running = false;
    const min = Number(btn.dataset.time);
    totalSeconds = min * 60;
    timeEl.innerText = formatTime(totalSeconds);
  });
});

// 开始
startBtn.addEventListener('click', () => {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    totalSeconds--;
    timeEl.innerText = formatTime(totalSeconds);
    if (totalSeconds <= 0) {
      clearInterval(timer);
      running = false;
      alarm.play();
    }
  }, 1000);
});

// 暂停
pauseBtn.addEventListener('click', () => {
  clearInterval(timer);
  running = false;
});

// 重置
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  running = false;
  const active = document.querySelector('.mode-btn.active');
  const min = Number(active.dataset.time);
  totalSeconds = min * 60;
  timeEl.innerText = formatTime(totalSeconds);
});
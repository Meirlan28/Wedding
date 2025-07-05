function startTimer() {
  const weddingDate = new Date('2025-10-04T00:00:00');

  function updateTimer() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function createConfetti() {
  const colors = [
    '#FFD3B6', '#DCE2AA', '#AAD8B0', '#8AC6D1', '#B8B8F3', '#FFAAA7'
  ];
  const shapes = ['circle', 'rect'];

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'rect') {
      confetti.style.borderRadius = '2px';
      confetti.style.transform = 'rotate(' + (Math.random() * 180) + 'deg)';
    }

    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;

    confetti.style.left = `${Math.random() * 100}vw`;

    const size = Math.random() * 6 + 4;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;

    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.animationDuration = `${Math.random() * 4 + 3}s`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), (parseFloat(confetti.style.animationDuration) * 1000) + 1000);
  }
}

function setupForm() {
  const form = document.getElementById('weddingRSVP');
  if (!form) {
    console.error('Форма не найдена!');
    return;
  }

  const errorDiv = document.getElementById('error-message');
  const messageDiv = document.getElementById('form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Сбросить старые сообщения
    errorDiv.textContent = '';
    messageDiv.textContent = '';

    const formData = new FormData(form);

    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      createConfetti();
      messageDiv.style.color = 'green';
      messageDiv.textContent = 'Спасибо! Ваша заявка принята 🎉';
      form.reset(); // очистить форму
    } else {
      errorDiv.textContent = data.error || 'Произошла ошибка';
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const card = document.querySelector('.card');
    if (card) card.classList.add('loaded');
  }, 300);

  startTimer();
  setupForm();

  // IntersectionObserver setup — оставил без изменений
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      } else {
        entry.target.classList.remove('animated');
      }
    });
  }, options);

  const selectors = [
    '.animate-on-scroll', '.v-line', '.date', '.image1', '.image2', '.aru', '.zhaslan',
    '.place', '.greeting', '.intro-text', '.desc', '.map-button', '.calendar', '.month',
    '.days', '.timeline', '.colorContainer', '.containerfortime', '.rsvp-form',
    '.form-group', '.waiting', '.plan', '.container'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => observer.observe(el));
  });
});

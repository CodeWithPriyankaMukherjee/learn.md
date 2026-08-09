// Load the adaptive quiz engine from the Vite src directory
(function () {
  const existing = document.querySelector(
    'script[data-adaptive-loader]'
  );

  if (existing) return;

  const script = document.createElement('script');

  script.type = 'module';
  script.src = '/src/adaptive-quiz.js';
  script.setAttribute('data-adaptive-loader', '1');

  document.body.appendChild(script);
})();

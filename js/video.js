 const faders = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.3,
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    });
  }, options);

  faders.forEach(fader => {
    fader.style.animationPlayState = 'paused';
    appearOnScroll.observe(fader);
  });
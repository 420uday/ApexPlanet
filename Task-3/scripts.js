async function getJoke() {
  const jokeEl = document.getElementById('joke');

  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    jokeEl.textContent = data.joke;
  } catch (error) {
    jokeEl.textContent = 'Failed to fetch joke. Try again later.';
    console.error(error);
  }
}

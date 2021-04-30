{
  import codify from './codify.js';

  const v = codify('hello');

  const quizUrl = 'db-emulation.json';

  async function getQuiz(url) {
    const data = await fetch(url);
    const dataParsed = await data.json();
  }
}

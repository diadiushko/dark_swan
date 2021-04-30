const url = 'example.json';

async function getQuiz(url) {
  const data = await fetch('example.json');
  console.log(data.json());
}

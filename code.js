async function logJSONData() {
  const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
  const jsonData = await response.json();
  console.log(jsonData);
}

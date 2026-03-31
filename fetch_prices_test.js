fetch('https://fuelpass-sl-api.onrender.com/api/prices')
  .then(res => res.json())
  .then(data => require('fs').writeFileSync('tmp_res.json', JSON.stringify(data, null, 2)))
  .catch(console.error);

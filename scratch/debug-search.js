const fetch = require('node-fetch');

async function testSearch() {
  const queries = ['rose', 'jasmine', 'mango', 'lavender'];
  
  for (const q of queries) {
    console.log(`\n--- Testing Search for: "${q}" ---`);
    try {
      const res = await fetch(`http://localhost:3000/api/plants/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`Results found: ${data.data.length}`);
        if (data.data.length > 0) {
          const top = data.data[0];
          console.log(`Top result: ${top.common_name} (${top.scientific_name?.[0]})`);
          console.log(`Image URL: ${top.default_image?.original_url || 'MISSING'}`);
        }
      } else {
        console.log(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      console.log(`Failed to fetch: ${e.message}`);
    }
  }
}

testSearch();

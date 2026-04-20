async function testSearch(query) {
  const apiKey = 'sk-zKjG69e483d9032f116552'; // From .env
  console.log(`Searching for: ${query}`);
  try {
    const res = await fetch(`https://perenual.com/api/v2/species-list?key=${apiKey}&q=${query}`);
    const data = await res.json();
    
    if (data.error) {
      console.error(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      return;
    }

    console.log(`Total results: ${data.total}`);
    console.log(`First 5 results:`);
    if (data.data) {
      data.data.slice(0, 5).forEach(p => {
        console.log(`- ${p.common_name} (${p.scientific_name ? p.scientific_name[0] : 'N/A'})`);
      });
    } else {
      console.log('No data returned');
    }
  } catch (error) {
    console.error(`Fetch Error: ${error.message}`);
  }
}

async function runTests() {
  await testSearch('rose');
  console.log('---');
  await testSearch('jasmine');
  console.log('---');
  await testSearch('rice');
}

runTests();

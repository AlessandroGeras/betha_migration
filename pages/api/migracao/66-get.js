const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function fetchResourceIDs() {
    try {
        // Define the API URL and the request headers
        const apiUrl = 'https://patrimonio.betha.cloud/patrimonio-services/api/tipos-bem';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 1d12dec7-0720-4b34-a2e5-649610d10806`
        };

        // Make the API request
        const response = await fetch(apiUrl, { headers });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error accessing the API: ${response.statusText}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Extract the IDs from the resources
        const resourceIDs = data.content.map(resource => resource.id);

        // Save the IDs to a JSON file
        fs.writeFileSync('get.json', JSON.stringify(resourceIDs, null, 2));
        console.log('Resource IDs saved in get.json');

    } catch (error) {
        console.error('Error fetching resource IDs:', error);
    }
}

// Call the main function
fetchResourceIDs();

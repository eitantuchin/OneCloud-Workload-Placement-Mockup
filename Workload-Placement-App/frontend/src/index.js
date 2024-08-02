import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './start_page.js';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

// Add RxDB Dev Mode Plugin
addRxPlugin(RxDBDevModePlugin);


// Create a unique database name with the formatted timestamp
const databaseName = `responsedatabase2`;

// Create the database
const responseDatabase = await createRxDatabase({
  name: databaseName,
  storage: getRxStorageDexie()
});

// Define the schema
const responseSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 20
    },
    VZID: { 
      type: 'string',
    },
    VSAD: {
      type: 'string'
    },
    RESPONSES: {
      type: 'string'
    },
    REC: {
      type: 'string',
    }
  },
  required: ['id', 'VZID', 'VSAD', 'RESPONSES', 'REC']
};

// Add collections to the database
await responseDatabase.addCollections({
  responses: {
    schema: responseSchema
  }
});

// Uncomment to reset the database

/*await responseDatabase.responses
  .remove()
  .then(() => {
    console.log('All documents have been removed.');
  })
  .catch((error) => {
    console.error('Error removing documents:', error);
  });
*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { responseDatabase };

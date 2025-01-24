import { connectToMongoDatabase } from './config/mongodb.config';
import { config } from '../../core/config';

export const connectMongoDatabases = () => {
  const dbURIs = [
    { name: 'SuperAdmin', uri: config.database.MONGO_URI_SUPER_ADMIN },
    { name: 'Analyst', uri: config.database.MONGO_URI_ANALYST },
    // { name: 'TinderAdmin', uri: config.database.MONGO_URI_TINDER_ADMIN },
    // { name: 'Developer', uri: config.database.MONGO_URI_DEVELOPER },
  ];

  
  dbURIs.forEach(({ name, uri }) => {
    if (uri) {
      connectToMongoDatabase(name, uri); // Only connect if the URI is defined
    } else {
      console.warn(`MongoDB connection URI for ${name} is not defined.`);
    }
  });
};
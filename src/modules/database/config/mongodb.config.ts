import mongoose from 'mongoose';

// Utility function to create a MongoDB connection
const connectToDB = (connectionString: string, dbName: string): mongoose.Connection => {
  const connection = mongoose.createConnection(connectionString);

  connection.once('open', () => {
    console.log(`MongoDB connected: ${dbName}`);
  });

  connection.on('error', (err) => {
    console.error(`Error connecting to ${dbName}:`, err);
  });

  connection.on('disconnected', () => {
    console.log(`${dbName} disconnected`);
  });

  connection.on('reconnected', () => {
    console.log(`${dbName} reconnected`);
  });

  return connection;
};

// Map for storing MongoDB connections
const mongoConnections: Record<string, mongoose.Connection> = {};

// Function to dynamically connect to a single MongoDB database
export const connectToMongoDatabase = (name: string, uri: string): void => {
  if (!uri) {
    console.warn(`MongoDB connection URI for ${name} is not defined.`);
    return;
  }

  if (!mongoConnections[name]) {
    mongoConnections[name] = connectToDB(uri, name);
  } else {
    console.log(`MongoDB connection for ${name} already exists.`);
  }
};

// Function to get all active connections
export const getMongoConnections = (): Record<string, mongoose.Connection> => mongoConnections;

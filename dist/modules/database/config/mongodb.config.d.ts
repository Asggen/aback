import mongoose from 'mongoose';
export declare const connectToMongoDatabase: (name: string, uri: string) => void;
export declare const getMongoConnections: () => Record<string, mongoose.Connection>;

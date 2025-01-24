import { Pool } from 'pg';
export declare const connectPostgres: () => Pool;
export declare const executeQuery: (query: string, params?: any[]) => Promise<any[]>;

import { Pool } from 'pg';
interface PostgresConfig {
    name: string;
    connectionString: string;
}
export declare const connectPostgresDatabases: (dbConfigs: PostgresConfig[]) => void;
export declare const getPostgresPool: (name: string) => Pool | undefined;
export declare const getAllPostgresPools: () => Record<string, Pool>;
export {};

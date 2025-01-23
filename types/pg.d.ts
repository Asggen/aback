// types/pg.d.ts
declare module 'pg' {
    import { EventEmitter } from 'events';
  
    export interface ClientConfig {
      host?: string;
      user?: string;
      password?: string;
      database?: string;
      port?: number;
      ssl?: boolean;
    }
  
    export class Client extends EventEmitter {
      constructor(config?: ClientConfig);
      connect(): Promise<void>;
      query(query: string): Promise<any>;
      end(): Promise<void>;
    }
  
    export class Pool {
      constructor(config?: ClientConfig);
      connect(): Promise<Client>;
      query(query: string): Promise<any>;
      end(): Promise<void>;
    }
  }
  
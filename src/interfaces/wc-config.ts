export type Env = 'dev' | 'stage' | 'prod';

export interface IWcConfig {
  env: Env;
}

export interface IStore {
  isValue: boolean;
  value: string;
}

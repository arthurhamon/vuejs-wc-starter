import { Env } from '@/interfaces/wc-config';

export interface IBoot {
  env: Env;
  initApi: () => void;
  initSentry: () => void;
}

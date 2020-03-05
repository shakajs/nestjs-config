export interface RegisterConfigOptions {
  schemas: Array<{ new (): any }>;
  envFile: string;
}

export interface PluginResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

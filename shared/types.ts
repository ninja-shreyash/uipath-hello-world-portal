export interface DemoItem {
  id: string;
  name: string;
  value: number;
}
export interface SystemInfo {
  timestamp: string;
  environment: string;
  version: string;
  uptime: string;
}
export interface UiPathStatus {
  connected: boolean;
  orchestratorUrl?: string;
  lastChecked: string;
  status: 'connected' | 'disconnected' | 'checking';
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
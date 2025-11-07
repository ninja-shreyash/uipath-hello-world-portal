import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, Clock, Server, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { SystemInfo, UiPathStatus, ApiResponse } from '@shared/types';
import { format } from 'date-fns';
export function HomePage() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [uiPathStatus, setUiPathStatus] = useState<UiPathStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [systemResponse, uiPathResponse] = await Promise.all([
          fetch('/api/system-info').then(res => res.json()),
          fetch('/api/uipath-status').then(res => res.json())
        ]);
        const systemData = systemResponse as ApiResponse<SystemInfo>;
        const uiPathData = uiPathResponse as ApiResponse<UiPathStatus>;
        if (systemData.success && systemData.data) {
          setSystemInfo(systemData.data);
        } else {
          console.error('Failed to fetch system info:', systemData.error);
        }
        if (uiPathData.success && uiPathData.data) {
          setUiPathStatus(uiPathData.data);
        } else {
          console.error('Failed to fetch UiPath status:', uiPathData.error);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load system information');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return timestamp;
      }
      return format(date, 'PPpp');
    } catch {
      return timestamp;
    }
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Loading system information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex h-16 items-center justify-between border-b border-border pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-lg font-semibold text-foreground">UiPath Hello World Portal</h1>
                </div>
              </div>
              <div className="flex items-center space-x-2 pr-12">
                {uiPathStatus && (
                  <Badge
                    variant={uiPathStatus.connected ? "default" : "destructive"}
                    className={uiPathStatus.connected ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100" : ""}
                  >
                    {uiPathStatus.connected ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                )}
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main className="space-y-8">
            {error && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm font-medium">Error loading system information</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </CardContent>
              </Card>
            )}
            {/* Welcome Section */}
            <div className="text-center space-y-4 py-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Welcome to UiPath
                <span className="block text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal mt-2">
                  Hello World Portal
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your gateway to UiPath automation. Monitor system status, check connectivity,
                and manage your automation workflows from this centralized dashboard.
              </p>
            </div>
            {/* System Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Information Card */}
              <Card className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    <span>System Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {systemInfo ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Current Time</span>
                        <span className="font-medium text-foreground text-sm text-right">
                          {formatTimestamp(systemInfo.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Environment</span>
                        <Badge variant="secondary" className="text-xs">
                          {systemInfo.environment}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Version</span>
                        <span className="font-medium text-foreground text-sm">
                          {systemInfo.version}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">System Uptime</span>
                        <span className="font-medium text-foreground text-sm">
                          {systemInfo.uptime}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Server className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">System information unavailable</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* UiPath Connection Status Card */}
              <Card className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>UiPath Orchestrator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {uiPathStatus ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Connection Status</span>
                        <Badge
                          variant={uiPathStatus.connected ? "default" : "destructive"}
                          className={uiPathStatus.connected ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100" : ""}
                        >
                          {uiPathStatus.status}
                        </Badge>
                      </div>
                      {uiPathStatus.orchestratorUrl && (
                        <div className="flex justify-between items-start py-2 border-b border-border">
                          <span className="text-sm text-muted-foreground">Orchestrator URL</span>
                          <span className="font-medium text-foreground text-sm text-right max-w-[200px] break-all">
                            {uiPathStatus.orchestratorUrl}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">Last Checked</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium text-foreground text-sm">
                            {formatTimestamp(uiPathStatus.lastChecked)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">UiPath status unavailable</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {/* Status Summary */}
            <Card className="border border-border bg-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    {uiPathStatus?.connected ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-medium text-foreground">System Ready</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <span className="text-lg font-medium text-foreground">System Initializing</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {uiPathStatus?.connected
                      ? "All systems are operational and ready for automation workflows."
                      : "Please check your UiPath Orchestrator connection and try again."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Built with ❤️ at Cloudflare
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
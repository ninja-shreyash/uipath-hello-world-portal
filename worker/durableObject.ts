import { DurableObject } from "cloudflare:workers";
import type { DemoItem, SystemInfo, UiPathStatus } from '@shared/types';
import { MOCK_ITEMS } from '@shared/mock-data';
// **DO NOT MODIFY THE CLASS NAME**
export class GlobalDurableObject extends DurableObject {
    async getCounterValue(): Promise<number> {
      const value = (await this.ctx.storage.get("counter_value")) || 0;
      return value as number;
    }
    async increment(amount = 1): Promise<number> {
      let value: number = (await this.ctx.storage.get("counter_value")) || 0;
      value += amount;
      await this.ctx.storage.put("counter_value", value);
      return value;
    }
    async decrement(amount = 1): Promise<number> {
      let value: number = (await this.ctx.storage.get("counter_value")) || 0;
      value -= amount;
      await this.ctx.storage.put("counter_value", value);
      return value;
    }
    async getDemoItems(): Promise<DemoItem[]> {
      const items = await this.ctx.storage.get("demo_items");
      if (items) {
        return items as DemoItem[];
      }
      await this.ctx.storage.put("demo_items", MOCK_ITEMS);
      return MOCK_ITEMS;
    }
    async addDemoItem(item: DemoItem): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = [...items, item];
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    async updateDemoItem(id: string, updates: Partial<Omit<DemoItem, 'id'>>): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    async deleteDemoItem(id: string): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = items.filter(item => item.id !== id);
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    async getSystemInfo(): Promise<SystemInfo> {
      const cached = await this.ctx.storage.get("system_info");
      if (cached) {
        const systemInfo = cached as SystemInfo;
        // Update timestamp on each request
        const updatedInfo: SystemInfo = {
          ...systemInfo,
          timestamp: new Date().toISOString(),
        };
        await this.ctx.storage.put("system_info", updatedInfo);
        return updatedInfo;
      }
      // Initialize system info
      const systemInfo: SystemInfo = {
        timestamp: new Date().toISOString(),
        environment: 'Production',
        version: '1.0.0',
        uptime: this.calculateUptime(),
      };
      await this.ctx.storage.put("system_info", systemInfo);
      return systemInfo;
    }
    async setSystemInfo(info: Partial<SystemInfo>): Promise<SystemInfo> {
      const current = await this.getSystemInfo();
      const updated: SystemInfo = {
        ...current,
        ...info,
        timestamp: new Date().toISOString(),
      };
      await this.ctx.storage.put("system_info", updated);
      return updated;
    }
    async getUiPathStatus(): Promise<UiPathStatus> {
      const cached = await this.ctx.storage.get("uipath_status");
      if (cached) {
        const status = cached as UiPathStatus;
        // Update last checked timestamp
        const updatedStatus: UiPathStatus = {
          ...status,
          lastChecked: new Date().toISOString(),
        };
        await this.ctx.storage.put("uipath_status", updatedStatus);
        return updatedStatus;
      }
      // Initialize UiPath status (mock connected state)
      const status: UiPathStatus = {
        connected: true,
        orchestratorUrl: 'https://cloud.uipath.com',
        lastChecked: new Date().toISOString(),
        status: 'connected',
      };
      await this.ctx.storage.put("uipath_status", status);
      return status;
    }
    async setUiPathStatus(status: Partial<UiPathStatus>): Promise<UiPathStatus> {
      const current = await this.getUiPathStatus();
      const updated: UiPathStatus = {
        ...current,
        ...status,
        lastChecked: new Date().toISOString(),
      };
      await this.ctx.storage.put("uipath_status", updated);
      return updated;
    }
    private calculateUptime(): string {
      // Mock uptime calculation - in real scenario this would be actual system uptime
      const uptimeMs = Date.now() % (24 * 60 * 60 * 1000); // Mock daily reset
      const hours = Math.floor(uptimeMs / (60 * 60 * 1000));
      const minutes = Math.floor((uptimeMs % (60 * 60 * 1000)) / (60 * 1000));
      return `${hours}h ${minutes}m`;
    }
}
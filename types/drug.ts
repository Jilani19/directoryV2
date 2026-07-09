import { BaseEntity } from "./common"; export interface Drug extends BaseEntity { name: string; genericName?: string; description?: string; manufacturerId: string; isActive: boolean; }

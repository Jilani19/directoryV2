import { BaseEntity } from "./common"; export interface Category extends BaseEntity { name: string; slug: string; description?: string; parentId?: string; isActive: boolean; }

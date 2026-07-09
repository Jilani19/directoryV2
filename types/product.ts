import { BaseEntity } from "./common"; export interface Product extends BaseEntity { name: string; slug: string; description: string; companyId: string; isActive: boolean; }

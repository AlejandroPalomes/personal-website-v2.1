import { doGet } from './helpers';

export const API = {
  projects: {
    getAll: () =>
      //TODO add models and types
      doGet<any[]>('/projects/all'),
    getFiltered: (filters) =>
      //TODO add models and types
      doGet<any[]>(`/projects/filter?${filters}`),
    getById: (id: string) =>
      //TODO add models and types
      doGet<any>(`/projects/${id}`)
  },
  categories: {
    getAll: () =>
      doGet<any[]>('/categories/all')
  },
  technologies: {
    getAll: () =>
      doGet<any[]>('/technologies/all')
  }
    //TODO Remove the following, just for reference now
    // tenants: {
    //     assingTenantToUnit: (tenantId: ModelId) => (unit: Partial<Unit>) =>
    //         doPost(`/units/${unit._id}/tenant`, { tenantId }),
    //     unassingTenantFromUnit: (tenantId: ModelId) => (unitId: ModelId) =>
    //         doDelete(`/units/${unitId}/tenant`, { tenantId: tenantId }),
    //     create: (buildingId: ModelId) => (tenant: Partial<Tenant>) =>
    //         doPost(`/tenants/${buildingId}/new`, tenant),
    //     edit: (tenantId: ModelId) => (tenant: Partial<Tenant>) =>
    //         doPut<Tenant>(`/tenants/${tenantId}`, tenant),
    // }
};
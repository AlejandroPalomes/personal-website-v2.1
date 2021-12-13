import { doGet } from './helpers';

export const API = {
    projects: {
        getAll: () =>
            //TODO add models and types
            doGet<any[]>('/projects/all'),
        getById: (id: string) => 
            //TODO add models and types
            doGet<any>(`/projects/${id}`)
    },
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

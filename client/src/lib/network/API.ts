import { doDelete, doGet, doPost, doPostFileUpload, doPut, doPutFileUpload, toPaginatedURL } from './helpers';
import { AuthResponse, Booking, BookingFilters, Building, CancellationPolicy, Incident, IncidentComment, IncidentFilters, Message, ModelId, PlaybookTask, Product, Service, ServiceHighlight, Staff, Status, Task, Tenant, TokenData, Unit, User } from '../../models';
import { MemberOfTeam } from '../../models/MemberOfTeam';
import { PaginationOptions } from '../../hooks/api/usePagination';
import { Card } from '../../models/Card';
import { AcquisitionLanding } from '../../models/AcquisitionLanding';
import { Subcategory } from '../../models/Subcategory';
import { Organization } from '../../models/Organization';
import { Country } from '../../models/Country';
import { OnboardingRequestBody, Utility } from '../../models/OnboardingTenant';

export const API = {
  auth: {
    acceptInvite: (password: string, token: string, name: string) =>
      doPost<AuthResponse>('/auth/accept-invite', { password, token, name }),
    login: (email: string, password: string) =>
      doPost<AuthResponse>('/auth/signin', { email, password, scope: 'dashboard' }),
    logout: () =>
      doPost('/auth/logout'),
    forgot: (email: string) =>
      doPost('/auth/forgot', { email }),
    createPassword: (password: string, token: string) =>
      doPost<any>('/auth/create-password', { password, token }),
    verifyToken: (token: string) =>
      doPost<TokenData>('/auth/verify-token', { token }),
    profile: () =>
      doGet<User>('/auth/profile')
  },
  landings: {
    get: (slug: string) => () =>
      doGet<AcquisitionLanding>(`/landings/slug/${slug}`),
    signup: (name: string, email: string, password: string, landing: AcquisitionLanding) =>
      doPost<AuthResponse>('/landings/signup', { name, email, password, landing })
  },
  countries: {
    get: () =>
      doGet<Country[]>('/countries')
  },
  organizations: {
    getPaginated: () =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<Organization[]>(toPaginatedURL('/organizations', pagination)),
    getAll: () =>
      doGet<any[]>('/organizations'),
    get: (_id: string) => () =>
      doGet<any>(`/organizations/${_id}`),
    new: (body) =>
      doPost('/organizations', body),
    edit: (organizationId: ModelId) => (organization: Partial<Organization>) =>
      doPut(`/organizations/${organizationId}`, organization)
  },
  services: {
    getAll: (organizationId: ModelId) => () =>
      doGet<Service[]>(`/services/${organizationId}/all`),
    get: (serviceId: ModelId) => () =>
      doGet<any>(`/services/${serviceId}`),
    create: (organizationId: ModelId) => (service: Partial<Service>) =>
      doPost(`/services/${organizationId}`, service),
    edit: (serviceId: ModelId) => (service: Partial<Service>) =>
      doPut<Service>(`/services/${serviceId}`, service),
    delete: (serviceId: ModelId) =>
      doDelete<Service>(`/services/${serviceId}`),
    setServicePhoto: (organizationId: ModelId) => (serviceData: any) =>
      doPostFileUpload(`/services/${organizationId}/${serviceData._id}/photo`, serviceData.body),
    deleteServicePhoto: (organizationId: ModelId) => (serviceId: ModelId) =>
      doDelete(`/services/${organizationId}/${serviceId}/photo`),
    createServiceHighlight: (serviceId: ModelId, organizationId: ModelId | undefined) => (highlight: Partial<ServiceHighlight>) =>
      doPost(`/services/${organizationId}/${serviceId}/highlights`, highlight),
    deleteServiceHighlight: (serviceId: ModelId, organizationId: ModelId | undefined) => (highlightId: ModelId) =>
      doDelete<ServiceHighlight>(`/services/${organizationId}/${serviceId}/highlights/${highlightId}`),
    getSubcategories: (serviceId: ModelId) => () =>
      doGet<Subcategory[]>(`/subcategories/${serviceId}/all`),
    createSubcategory: (serviceId: ModelId) => (name: Partial<Subcategory>) =>
      doPost<any>(`/subcategories/${serviceId}`, { title: name.title, hidden: false }),
    deleteSubcategory: (serviceId: ModelId) => (subcategoryId: ModelId) =>
      doDelete(`/subcategories/${serviceId}/${subcategoryId}`),
    updateSubcategory: (serviceId: ModelId) => (subcategory: Partial<Subcategory>) =>
      doPut<any>(`/subcategories/${serviceId}/${subcategory._id}`, { title: subcategory.title, hidden: subcategory.hidden }),
    reorderSubcategory: (serviceId: ModelId) => (subcategory: Partial<Subcategory>) =>
      doPut<Subcategory>(`/subcategories/${serviceId}/${subcategory._id}/reorder`, { order: subcategory.order }),
    reorderOrganizationServices: (organizationId: ModelId) => (serviceToOrder: Partial<Service>) =>
      doPut(`/services/${organizationId}/${serviceToOrder._id}/reorder`, { order: serviceToOrder.order }),
    reorderBuildingServices: (buildingId: ModelId) => (serviceToOrder: Partial<Service>) =>
      doPut(`/buildings/${buildingId}/service-reorder`, { order: serviceToOrder.order, serviceId: serviceToOrder._id })
  },
  products: {
    getAll: (serviceId: ModelId) => () =>
      doGet<Product[]>(`/v2/products/${serviceId}/all`),
    delete: (serviceId: ModelId) => (productId: ModelId) =>
      doDelete<Product>(`/products/${serviceId}/${productId}`),
    create: (serviceId: ModelId) => (product: Partial<Product>) =>
      doPost(`/products/${serviceId}`, product),
    edit: () => (product: Partial<Product>) =>
      doPut(`/products/${product._id}`, product),
    reorder: (serviceId: ModelId) => (product: Partial<Product>) =>
      doPut(`/products/${serviceId}/${product._id}/reorder`, { order: product.order }),
    duplicate: (serviceId: ModelId) => (product: Partial<Product>) =>
      doPut(`/products/${serviceId}/${product._id}/duplicate`),
    setPhoto: (serviceId: ModelId) => (productData: any) =>
      doPostFileUpload(`/products/${serviceId}/${productData._id}/photo`, productData.body),
    deletePhoto: (serviceId: ModelId) => (productId: ModelId) =>
      doDelete(`/products/${serviceId}/${productId}/photo`),
    hide: (serviceId: ModelId) => (product: Partial<Product>) =>
      doPut(`/products/${serviceId}/${product._id}/hide`),
    getCancellationPolicy: (serviceId: ModelId, productId: ModelId) => () =>
      doGet<CancellationPolicy>(`/products/${serviceId}/${productId}/policy`),
    addCancellationPolicy: (serviceId: ModelId) => (policy: Partial<CancellationPolicy>) =>
      doPost<CancellationPolicy>(`/products/${serviceId}/${policy.productId}/policy`, policy),
    editCancellationPolicy: (serviceId: ModelId, productId: ModelId) => (policy: Partial<CancellationPolicy>) =>
      doPut(`/products/${serviceId}/${productId}/policy`, policy),
    getPlaybook: (serviceId: ModelId, productId: ModelId) => () =>
      doGet<PlaybookTask[]>(`/products/${serviceId}/${productId}/playbook`),
    addPlaybookTask: (serviceId: ModelId, productId: ModelId) => (task: Partial<PlaybookTask>) =>
      doPost<PlaybookTask>(`/products/${serviceId}/${productId}/playbook`, task),
    createPlaybook: (serviceId: ModelId) => (playbook: Partial<PlaybookTask[]>, productId: ModelId) =>
      doPost<PlaybookTask>(`/products/${serviceId}/${productId}/new-playbook`, playbook),
    removePlaybookTask: (serviceId: ModelId, productId: ModelId) => (playbookTaskId: ModelId) =>
      doDelete(`/products/${serviceId}/${productId}/playbook/${playbookTaskId}`),
    editPlaybookTask: (serviceId: ModelId, productId: ModelId) => (task: Partial<PlaybookTask>) =>
      doPut<PlaybookTask>(`/products/${serviceId}/${productId}/playbook/${task._id}`, task),
    reorderPlaybook: (serviceId: ModelId, productId: ModelId) => (task: Partial<PlaybookTask>) =>
      doPut<PlaybookTask>(`/products/${serviceId}/${productId}/playbook/${task._id}/reorder`, { order: task.order })
  },
  bookings: {
    getByBuildingPaginated: (buildingId: ModelId, filters: BookingFilters) =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<Booking[]>(toPaginatedURL(`/bookings/${buildingId}/all?${filters.getQuery()}`, pagination)),
    get: (bookingId: ModelId) => () =>
      doGet<Booking>(`/bookings/${bookingId}`),
    cancelBooking: ()=> (bookingId: ModelId) =>
      doDelete<Booking>(`/bookings/${bookingId}`)
  },
  onboarding: {
    searchOnboardingTenants: (buildingId: ModelId | undefined) => () =>
      doGet<User[]>(`/onboarding/tenants/search${buildingId ? `?buildingId=${buildingId}` : ''}`),
    inviteTenantOnboarding: () => (newTenantAndUnit: Partial<OnboardingRequestBody>) =>
      doPost('/onboarding/tenant/invite', newTenantAndUnit),
    attachFileToTenant: (tenantId) => (data) =>
      doPutFileUpload(`/onboarding/tenant/${tenantId.length ? tenantId : data.id}`, data.formData),
    updateUtility: (buildingId: ModelId, onboardingId: ModelId) => (utility: Partial<Utility>) =>
      doPut(`/onboarding/${buildingId}/tenants/${onboardingId}/state/moveIn/utility/${utility.type}`, { utilityState: utility.state }),
    getDocuments: (type: 'unit' | 'tenant', id: ModelId) => () =>
      // doGet<Document[]>(`/documents/type/${type}/id/${id}`),
      console.log('TODO get documents'), // TODO: include get documents endpoint when ready
    uploadDocument: () =>
      console.log('TODO upload a document'), // TODO: include upload document endpoint when ready
    removeDocument: (documentId: ModelId) =>
      // doDelete(`documents/${documentId}`)
      console.log('TODO remove a document') // TODO: include remove document endpoint when ready
  },
  tenants: {
    getByBuildingPaginated: (buildingId: ModelId) =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<Tenant[]>(toPaginatedURL(`/tenants/${buildingId}/all`, pagination)),
    getAll: () =>
      doGet<any[]>('/tenants'),
    get: (tenantId: ModelId) => () =>
      doGet<Tenant>(`/tenants/${tenantId}`),
    searchByName: (buildingId: ModelId) => (name: string) => () =>
      doGet<User[]>(`/tenants/${buildingId}/search?name=${name}`),
    searchByNameInOrganization: (name: string) => () =>
      doGet<User[]>(`/tenants/search?name=${name}`),
    assingTenantToUnit: (tenantId: ModelId) => (unit: Partial<Unit>) =>
      doPost(`/units/${unit._id}/tenant`, { tenantId }),
    unassingTenantFromUnit: (tenantId: ModelId) => (unitId: ModelId) =>
      doDelete(`/units/${unitId}/tenant`, { tenantId: tenantId }),
    create: (buildingId: ModelId) => (tenant: Partial<Tenant>) =>
      doPost(`/tenants/${buildingId}/new`, tenant),
    edit: (tenantId: ModelId) => (tenant: Partial<Tenant>) =>
      doPut<Tenant>(`/tenants/${tenantId}`, tenant),
    delete: (tenantId: ModelId) =>
      doDelete<Tenant>(`/tenants/${tenantId}`),
    invite: (tenantId: ModelId) =>
      doPost(`/tenants/${tenantId}/invite`)
  },
  buildings: {
    getAll: () =>
      doGet<Building[]>('/buildings/all'),
    getById: (buildingId: ModelId) => () =>
      doGet<Building>(`/buildings/${buildingId}`),
    create: (building: Partial<Building>) =>
      doPost('/buildings/', building),
    addService: (buildingId: ModelId) => (service: Partial<Service>) =>
      doPut<Building>(`/buildings/${buildingId}/services/${service._id}`),
    removeService: (buildingId: ModelId) => (serviceId) =>
      doDelete<Building>(`/buildings/${buildingId}/services/${serviceId}`),
    attachPhoto: (buildingId: ModelId) =>
      (photo: FormData) =>
        doPostFileUpload(`/buildings/${buildingId}/image`, photo),
    deletePhoto: (buildingId: ModelId) =>
      doDelete<Building>(`/buildings/${buildingId}/image`),
    updateSettings: (buildingId: ModelId) => (settings: Partial<Building>) =>
      doPut<Building>(`/buildings/${buildingId}/settings`, settings),
    update: (buildingId: ModelId) => (building: Partial<Building>) =>
      doPut(`/buildings/${buildingId}`, building),
    updateAcquisition: (buildingId: ModelId) => (acquisition: Partial<Building>) =>
      doPut(`/buildings/${buildingId}/acquisition`, acquisition),
    uploadPropertyManagerLogo: (buildingId: ModelId) =>
      (photo: FormData) =>
        doPostFileUpload(`/buildings/${buildingId}/acquisition/image`, photo),
    deletePropertyManagerLogo: (buildingId: ModelId) =>
      doDelete<Building>(`/buildings/${buildingId}/acquisition/image`),
    getRecent: (organizationId: ModelId) => () =>
      doGet<Building[]>(`/buildings/search/${organizationId}`),
    searchByName: (organizationID: ModelId) => (name: string) => () =>
      doGet<Building[]>(`/buildings/search/${organizationID}?name=${name}`)
  },
  incidents: {
    getById: (_id: string) => () =>
      doGet<any>(`/incidents/${_id}`),
    getByBuildingId: (buildingId: ModelId) => () =>
      doGet<Incident[]>(`/incidents/building/${buildingId}`),
    getByBuildingPaginated: (buildingId: ModelId, filters: IncidentFilters) =>
      (pagination: PaginationOptions) =>
        () => doGet<Incident[]>(toPaginatedURL(`/incidents/building/${buildingId}?${filters.getQuery()}`, pagination)),
    getByTenant: (tenantId: ModelId) => () =>
      doGet<Incident[]>(`/incidents/tenant/${tenantId}?sort=date`),
    getByUnitId: (unitId: ModelId) => () =>
      doGet<Incident[]>(`/incidents/unit/${unitId}`),
    updateState: (_id: string, body: object) =>
      doPut<any>(`/incidents/${_id}/state`, body),
    updateStaff: (_id: string) => (body: object) =>
      doPut<any>(`/incidents/${_id}/staff`, body),
    updatePriority: (_id: string, body: object) =>
      doPut<any>(`/incidents/${_id}/priority`, body),
    sendMessage: (_id: string) => (body: object) =>
      doPut<IncidentComment[]>(`/incidents/${_id}/comments`, body),
    getRecent: (buildingId: ModelId) => () =>
      doGet<Incident[]>(`/incidents/search/${buildingId}`),
    searchByName: (buildingId: ModelId) => (name: string) => () =>
      doGet<Incident[]>(`/incidents/search/${buildingId}?name=${name}`)
  },
  units: {
    getAllByBuilding: (buildingId: ModelId) => () =>
      doGet<Unit[]>(`/units/${buildingId}/all`),
    getByBuildingPaginated: (buildingId: ModelId) =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<Unit[]>(toPaginatedURL(`/units/${buildingId}/all`, pagination)),
    getRecentByBuilding: (buildingId: ModelId) => () =>
      doGet<Unit[]>(`/units/${buildingId}/search`),
    get: (unitId: ModelId) => () =>
      doGet<Unit>(`/units/${unitId}`),
    create: (buildingId: ModelId) => (unit: Partial<Unit>) =>
      doPost(`/units/new/${buildingId}`, unit),
    edit: (buildingId: ModelId) => (unit: Partial<Unit>) =>
      doPut<Unit>(`/units/${buildingId}`, unit),
    delete: (unitId: ModelId) =>
      doDelete<Unit>(`/units/${unitId}`),
    assingTenant: (unitId: ModelId) => (tenant: Partial<Tenant>) =>
      doPost(`/units/${unitId}/tenant`, { tenantId: tenant._id }),
    unassingTenant: (unitId: ModelId) => (tenantId: ModelId) =>
      doDelete(`/units/${unitId}/tenant`, { tenantId: tenantId }),
    assingStaff: (unitId: ModelId) => (staff: Partial<Staff>) =>
      doPost(`/units/${unitId}/staff`, { staffId: staff._id }),
    unassingStaff: (unitId: ModelId) => (staffId: ModelId) =>
      doDelete(`/units/${unitId}/staff`, { staffId: staffId }),
    searchByName: (buildingId: ModelId) => (name: string) => () =>
      doGet<Unit[]>(`/units/${buildingId}/search?name=${name}&empty=true`),
    searchAllByName: (buildingId: ModelId) => (name: string) => () =>
      doGet<Unit[]>(`/units/${buildingId}/search?name=${name}`),
    getEmptyUnits: (buildingId: ModelId) => () =>
      doGet<Unit[]>(`/units/${buildingId}/search?empty=true`)
  },
  users: {
    getTeam: () =>
      doGet<MemberOfTeam[]>('/team'),
    getTeamPaginated: () =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<MemberOfTeam[]>(toPaginatedURL('/team', pagination)),
    updateTeamMember: (userId: ModelId) => (update: Partial<MemberOfTeam>) =>
      doPut<MemberOfTeam>(`/team/${userId}`, update),
    invite: (body) =>
      doPost('/team/invite', body),
    update: (body) =>
      doPut('/users', body),
    updateAvatar: (body: FormData) =>
      doPostFileUpload('/users/profile', body),
    deleteAvatar: () =>
      doDelete('/users/avatar'),
    deleteTeamMember: (userId: ModelId) =>
      doDelete(`/team/${userId}`)
  },
  messages: {
    getById: (messageId: ModelId) => () =>
      doGet<Message>(`/messages/${messageId}`),
    getMessages: (buildingId: ModelId) => () =>
      doGet<Message[]>(`/messages/buildings/${buildingId}`),
    getByBuildingPaginated: (buildingId: ModelId) =>
      (pagination: PaginationOptions) =>
        () =>
          doGet<Message[]>(toPaginatedURL(`/messages/buildings/${buildingId}`, pagination)),
    create: (buildingId: ModelId) => (message: Partial<Message>) =>
      doPost<Message>(`/messages/buildings/${buildingId}`, message),
    attachPhoto: (messageId: ModelId) => (photo: FormData) =>
      doPutFileUpload(`/messages/${messageId}`, photo),
    send: (messageId: ModelId) => () =>
      doPost(`/messages/${messageId}`)
  },
  tasks: {
    createTask: (buildingId: ModelId) => (newTask) =>
      doPost<Task>(`/tasks/${buildingId}`, newTask),
    getById: (taskId: ModelId) => () =>
      doGet<Task>(`/tasks/task/${taskId}`),
    /**
     * @deprecated use pagination
     * @param buildingId
     * @param status
     */
    getByBuildingIdAndStatus: (buildingId: ModelId, status: Status) => () =>
      doGet<Task[]>(`/tasks/${buildingId}?status=${status}`),

    getByBuildingIdAndStatusPaginated: (buildingId: ModelId, status: Status) =>
      (pagination: PaginationOptions) =>
        doGet<Task[]>(toPaginatedURL(`/tasks/${buildingId}?status=${status}`, pagination)),
    getByRelationshipId: (bookingId: ModelId) => () =>
      doGet<Task>(`/tasks/relationship/${bookingId}`),

    //TODO change type for upadtedCheck/updatedTask
    updateCheck: (taskId: ModelId, itemId: ModelId) => (updatedCheck: any) =>
      doPut<Task>(`/tasks/${taskId}/check-items/${itemId}`, updatedCheck),
    updateStatus: (taskId: ModelId) => (updatedTask: any) =>
      doPut<Task>(`/tasks/${taskId}/status`, updatedTask),
    updateTask: (taskId: ModelId) => (updatedTask: any) =>
      doPut<Task>(`/tasks/${taskId}`, updatedTask),
    updateStaff: (taskId: ModelId) => (updatedTask: any) =>
      doPut<Task>(`/tasks/${taskId}/staff`, updatedTask),
    updateSnooze: (taskId: ModelId) => (updatedTask: any) =>
      doPut<Task>(`/tasks/${taskId}/snooze`, updatedTask),
    updateUnit: (taskId: ModelId) => (updatedTask: any) =>
      doPut<Task>(`/tasks/${taskId}/unit`, updatedTask),
    deleteTask: (taskId: ModelId) =>
      doDelete<Task>(`/tasks/${taskId}`)
  },
  team: {
    searchByName: (name: string) => () =>
      doGet<User[]>(`/team/search?name=${name}`)
  },
  dashboard: {
    getDashboard: (buildingId: ModelId) => () =>
      doGet<Card[]>(`/dashboard/${buildingId}`)
  }
};

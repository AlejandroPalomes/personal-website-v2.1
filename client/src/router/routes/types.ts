
export type RouteType = string;

export interface BaseRoute {
  path: string;
  to?: (_id: string) => RouteType;
  withParams?: (any) => RouteType;
  /**
   * Used in routes with indentation level 1 (outlet)
   */
  indent?: string;
}

import { ActionReturnType } from "../rootType"

export enum RequestStatus {
  PENDING = "PENDING",
  RESOLVE = "RESOLVE",
  REJECT = "REJECT",
}

/**
 * @section ACTION TYPES
 */

export type UpdateRequestStatusAction = ActionReturnType<
  '@app/UPDATE_REQUEST_STATUS',
  {
    status: RequestStatus | null;
    message?: string;
  }
>;

/**
 * @section MAIN TYPES
 */

export interface AppState {
  status: RequestStatus | null;
  message?: string;
}

export type AppActions = UpdateRequestStatusAction
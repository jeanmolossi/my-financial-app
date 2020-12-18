import { UpdateRequestStatusAction } from "./types";

export function UpdateRequestStatus(
  payload: UpdateRequestStatusAction['payload']
): UpdateRequestStatusAction {
  return {
    type: '@app/UPDATE_REQUEST_STATUS',
    payload
  }
}
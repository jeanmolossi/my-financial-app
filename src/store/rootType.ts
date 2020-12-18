export type ActionReturnType<A = string, T = any> = {
  type: A;
  payload: T;
}
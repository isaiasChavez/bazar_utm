export enum LOG_A {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS",
  CONFIRM_PASS_SUCCESS = "CONFIRM_PASS_SUCCESS",
  RECOVER_PASS_SUCCESS = "RECOVER_PASS_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  CLOSE_SESION = "CLOSE_SESION",
}


export enum USERS_TYPES {
  ADMIN="ADMIN",
  USER = "USER"
}
export enum ROLES_TYPES {
  ADMIN="ADMIN",
  USER = "0266305a-187c-4446-9584-4f696fb7ef65"
}

export type LOGIN_SUCCESS_PAYLOAD = {
  token: string;
};

export type RESET_PASS_SUCCESS_PAYLOAD = {};
export type CONFIRM_PASS_SUCCESS_PAYLOAD = {};
export type RECOVER_PASS_SUCCESS_PAYLOAD = {};
export type LOGIN_ERROR_PAYLOAD = {};
export type CLOSE_SESION_PAYLOAD = {};


export type LOGIN_SUCCESS = {
  type: LOG_A.LOGIN_SUCCESS;
  payload: LOGIN_SUCCESS_PAYLOAD;
};

export type RESET_PASS_SUCCESS = {
  type: LOG_A.RESET_PASS_SUCCESS;
  payload: RESET_PASS_SUCCESS_PAYLOAD;
};

export type CONFIRM_PASS_SUCCESS = {
  type: LOG_A.RESET_PASS_SUCCESS;
  payload: CONFIRM_PASS_SUCCESS_PAYLOAD;
};

export type RECOVER_PASS_SUCCESS = {
  type: LOG_A.RESET_PASS_SUCCESS;
  payload: RECOVER_PASS_SUCCESS_PAYLOAD;
};

export type LOGIN_ERROR = {
  type: LOG_A.RESET_PASS_SUCCESS;
  payload: LOGIN_ERROR_PAYLOAD;
};

export type CLOSE_SESION = {
  type: LOG_A.CLOSE_SESION;
  payload: CLOSE_SESION_PAYLOAD;
};

export type ActionTypes = LOGIN_SUCCESS | RESET_PASS_SUCCESS |CONFIRM_PASS_SUCCESS|RECOVER_PASS_SUCCESS|LOGIN_ERROR|CLOSE_SESION;

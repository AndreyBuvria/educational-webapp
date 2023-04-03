export interface AuthState {
  login?: AuthOperationDataState;
  signup?: AuthOperationDataState;
}

export interface AuthOperationDataState {
  success: boolean | null;
  error?: string;
}


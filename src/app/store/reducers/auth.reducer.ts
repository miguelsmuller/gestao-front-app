import { AuthActions, AuthActionTypes } from '@app/store/actions/auth.action';
import { Usuario } from '@app/shared/models/usuario';

export interface AuthState {
  user: Usuario | null;
}

const initialState: AuthState = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      return state;

    case AuthActionTypes.REGISTER_USER:
      return state;

    case AuthActionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}

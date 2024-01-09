interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
}

interface LoginFailureAction {
  type: 'LOGIN_FAILURE';
}

export type AuthActionTypes = LoginSuccessAction | LoginFailureAction;

export const login = (username: string, password: string) => {
  return (dispatch: (arg: AuthActionTypes) => void) => {
    // Simulate a login request to the server
    if (username === 'admin' && password === 'password') {
      dispatch({ type: 'LOGIN_SUCCESS' });
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
};
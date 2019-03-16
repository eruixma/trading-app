import { createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = { theme: 'dark' };

export const { changeTheme } = createActions({
  CHANGE_THEME: (theme) => ({ theme }),
});

const reducer = handleActions(
  {
    [combineActions(changeTheme)]: (
      state,
      { payload: { theme } }
    ) => {
      return { ...state, theme };
    }
  },
  defaultState
);

export default reducer;

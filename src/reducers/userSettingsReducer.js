export const USER_SETTINGS_TYPES = {
  TOGGLE_SOUND: 'TOGGLE_SOUND',
};

export const userSettingsReducer = (prevState, action) => {
  switch (action.type) {
    case USER_SETTINGS_TYPES.TOGGLE_SOUND:
      return {
        ...prevState,
        soundOn: action.payload
      };
  }
}

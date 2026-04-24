import { environment } from '../../../../core/data-access/core.constant';

export const CharacterUrlConstant = {
  API: {
    BASE: `${environment.serverUrl}/VideoGameCharacters`,
  },
};

export const ToastCharacterConstant = {
  SEVERITY: {
    Success: 'success',
    Danger: 'danger',
    Warn: 'warn',
  },
  TITLE: {
    TitleSuccess: 'Success',
    TitleDanger: 'Error',
    TitleWarn: 'Warning',
  },
  MESSAGE: {
    createdSuccess: 'Character created successfully!',
    updatedSuccess: 'Character updated successfully!',
    deletedSuccess: 'Character deleted successfully!',
  },
};

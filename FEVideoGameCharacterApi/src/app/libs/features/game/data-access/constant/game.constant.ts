import { environment } from '../../../../core/data-access/core.constant';

export const GameUrlConstant = {
  API: {
    BASE: `${environment.serverUrl}/Games`,
  },
};

export const ToastGameConstant = {
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
    createdSuccess: 'Game created successfully!',
    updatedSuccess: 'Game updated successfully!',
    deletedSuccess: 'Game deleted successfully!',
    characterAddedSuccess: 'Character added to game successfully!',
    characterRemovedSuccess: 'Character removed from game successfully!',
  },
};

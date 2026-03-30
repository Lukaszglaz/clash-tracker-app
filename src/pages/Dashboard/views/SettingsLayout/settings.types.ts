export interface NestUserSettings {
  email: string;
  playerTag: string | null;
  playerName: string;
  marketingAccepted?: boolean;
  marketingConsent?: boolean;
  termsAccepted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SettingsPanelOptions {
  emailAlertsEnabled: boolean;
  apiSyncEnabled: boolean;
  advancedPanelsEnabled: boolean;
  customSystemsEnabled: boolean;
}

export interface SettingsFieldErrors {
  firstName?: string;
  lastName?: string;
  playerTag?: string;
}

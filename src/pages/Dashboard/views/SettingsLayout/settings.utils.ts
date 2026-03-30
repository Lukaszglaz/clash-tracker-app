import { type SettingsPanelOptions } from "./settings.types";

const DASHBOARD_PANEL_OPTIONS_KEY = "dashboard_panel_options";
const API_SUFFIX_REGEX = /\/api\/?$/i;

export const getSettingsEndpoint = (baseURL?: string) =>
  API_SUFFIX_REGEX.test(baseURL ?? "") ? "/users/settings" : "/api/users/settings";

export const normalizePlayerTag = (value: string) => {
  const cleanedValue = value.toUpperCase().replace(/\s+/g, "");
  const alphanumericValue = cleanedValue.replace(/[^#A-Z0-9]/g, "");
  const tagWithoutHashes = alphanumericValue.replace(/^#+/, "");

  if (!tagWithoutHashes) return "";

  return `#${tagWithoutHashes}`;
};

export const splitPlayerName = (playerName?: string | null) => {
  if (!playerName) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  const [firstName = "", ...lastNameParts] = playerName.trim().split(" ");

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
};

export const getMarketingAcceptedValue = (
  marketingAccepted?: boolean,
  marketingConsent?: boolean,
) => marketingAccepted ?? marketingConsent ?? false;

export const getStoredPanelOptions = (
  defaults: SettingsPanelOptions,
): SettingsPanelOptions => {
  try {
    const rawValue = localStorage.getItem(DASHBOARD_PANEL_OPTIONS_KEY);

    if (!rawValue) return defaults;

    const parsedValue = JSON.parse(rawValue) as Partial<SettingsPanelOptions>;

    return {
      emailAlertsEnabled:
        typeof parsedValue.emailAlertsEnabled === "boolean"
          ? parsedValue.emailAlertsEnabled
          : defaults.emailAlertsEnabled,
      apiSyncEnabled:
        typeof parsedValue.apiSyncEnabled === "boolean"
          ? parsedValue.apiSyncEnabled
          : defaults.apiSyncEnabled,
      advancedPanelsEnabled:
        typeof parsedValue.advancedPanelsEnabled === "boolean"
          ? parsedValue.advancedPanelsEnabled
          : defaults.advancedPanelsEnabled,
      customSystemsEnabled:
        typeof parsedValue.customSystemsEnabled === "boolean"
          ? parsedValue.customSystemsEnabled
          : defaults.customSystemsEnabled,
    };
  } catch {
    return defaults;
  }
};

export const savePanelOptions = (options: SettingsPanelOptions) => {
  try {
    localStorage.setItem(DASHBOARD_PANEL_OPTIONS_KEY, JSON.stringify(options));
  } catch {
    return;
  }
};

export const arePanelOptionsEqual = (
  first: SettingsPanelOptions,
  second: SettingsPanelOptions,
) =>
  first.emailAlertsEnabled === second.emailAlertsEnabled &&
  first.apiSyncEnabled === second.apiSyncEnabled &&
  first.advancedPanelsEnabled === second.advancedPanelsEnabled &&
  first.customSystemsEnabled === second.customSystemsEnabled;

// src/types/google.d.ts

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    auto_select?: boolean;
    callback?: (response: GoogleSignInResponse) => void;
    use_fedcm_for_prompt?: boolean;
  }) => void;
  prompt: (callback: (notification: PromptNotification) => void) => void;
}

interface GoogleSignInResponse {
  credential: string;
  select_by: string;
}

interface PromptNotification {
  isSkippedMoment: boolean;
  isDismissedMoment: boolean;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

interface Google {
  accounts: GoogleAccounts;
}

declare const google: Google;

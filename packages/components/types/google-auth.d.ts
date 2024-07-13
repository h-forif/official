export interface GoogleAuthConfig {
  client_id: string;
  auto_select?: boolean;
  callback: (response: GoogleAuthResponse) => void;
}

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

export interface Google {
  accounts: {
    id: {
      initialize(config: GoogleAuthConfig): void;
      renderButton(element: HTMLElement, options: GoogleButtonOptions): void;
    };
  };
}

export interface GoogleButtonOptions {
  text: string;
  theme: string;
}

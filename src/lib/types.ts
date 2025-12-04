export interface UserData {
	nombre: string;
	apellido: string;
	email: string;
}

export interface GoogleCredentialResponse {
	credential?: string;
}

export interface DOMElements {
	buttonDiv: HTMLElement | null;
	nativeForm: HTMLFormElement | null;
	loadingMessage: HTMLElement | null;
	userInfo: HTMLElement | null;
	userData: HTMLElement | null;
	googleSection: HTMLElement | null;
	divider: HTMLElement | null;
	nativeFormSection: HTMLElement | null;
}

// Declaraciones globales para el SDK de Google
declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
					prompt: () => void;
					renderButton: (parent: HTMLElement, options: any) => void;
				};
			};
		};
	}

	const google: {
		accounts: {
			id: {
				initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
				prompt: () => void;
				renderButton: (parent: HTMLElement, options: any) => void;
			};
		};
	} | undefined;
}

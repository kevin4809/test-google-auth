import type { GoogleCredentialResponse, UserData } from '../types';
import { parseJwt } from '../auth/tokenParser';

/**
 * Carga el SDK de Google Identity Services de forma lazy usando Intersection Observer
 * @param buttonElement - Elemento HTML donde se renderizará el botón
 * @param onLoad - Callback a ejecutar cuando el SDK se cargue
 */
export function loadGoogleSDK(
	buttonElement: HTMLElement | null,
	onLoad: () => void
): void {
	if (!buttonElement) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const script = document.createElement('script');
				script.src = 'https://accounts.google.com/gsi/client';
				script.async = true;
				script.defer = true;
				script.onload = onLoad;
				document.head.appendChild(script);
				observer.disconnect();
			}
		});
	}, { rootMargin: '50px' });

	observer.observe(buttonElement);
}

/**
 * Inicializa Google Sign In y renderiza el botón
 * @param clientId - Client ID de Google OAuth
 * @param buttonElement - Elemento donde renderizar el botón
 * @param callback - Función que maneja la respuesta de autenticación
 */
export function initializeGoogleSignIn(
	clientId: string,
	buttonElement: HTMLElement | null,
	callback: (response: GoogleCredentialResponse) => void
): void {
	if (typeof google === 'undefined' || !buttonElement) return;

	google.accounts.id.initialize({
		client_id: clientId,
		callback
	});

	google.accounts.id.renderButton(buttonElement, {
		theme: 'outline',
		size: 'large',
		width: 350,
		text: 'continue_with',
		locale: 'es'
	});
}

/**
 * Extrae los datos del usuario desde la respuesta de Google
 * @param response - Respuesta con el credential de Google
 * @returns Datos del usuario o null si no se pudo extraer
 */
export function extractUserDataFromCredential(
	response: GoogleCredentialResponse
): UserData | null {
	if (!response?.credential) return null;

	const userInfo = parseJwt(response.credential);

	if (!userInfo?.email) return null;

	return {
		nombre: userInfo.given_name || '',
		apellido: userInfo.family_name || '',
		email: userInfo.email || ''
	};
}

import type { UserData } from '../types';

/**
 * Envía datos de usuario a Google Sheets
 * @param data - Datos del usuario a enviar
 * @param sheetsUrl - URL del endpoint de Google Sheets
 * @throws Error si la petición falla
 */
export async function sendToGoogleSheets(
	data: UserData,
	sheetsUrl: string
): Promise<void> {
	await fetch(sheetsUrl, {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
}

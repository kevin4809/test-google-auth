/**
 * Decodifica un token JWT y extrae su payload
 * @param token - Token JWT a decodificar
 * @returns Objeto con los datos del payload o null si falla
 */
export function parseJwt(token: string): Record<string, any> | null {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		console.error('Error al decodificar el token:', e);
		return null;
	}
}

/**
 * Escapa HTML para prevenir ataques XSS
 * @param text - Texto a escapar
 * @returns Texto escapado y seguro para insertar en HTML
 */
export function escapeHtml(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

import type { DOMElements } from '../lib/types';

/**
 * Inicializa y cachea todos los elementos del DOM necesarios
 * @returns Objeto con referencias a elementos del DOM
 */
export function initElements(): DOMElements {
	return {
		buttonDiv: document.getElementById('buttonDiv'),
		nativeForm: document.getElementById('native-form') as HTMLFormElement,
		loadingMessage: document.getElementById('loading-message'),
		userInfo: document.getElementById('user-info'),
		userData: document.getElementById('user-data'),
		googleSection: document.querySelector('.google-section'),
		divider: document.querySelector('.divider'),
		nativeFormSection: document.querySelector('.native-form-section')
	};
}

/**
 * Oculta múltiples elementos del DOM añadiendo la clase 'hidden'
 * @param elements - Lista de elementos a ocultar
 */
export function hideElements(...elements: (HTMLElement | null)[]): void {
	elements.forEach(el => el?.classList.add('hidden'));
}

/**
 * Muestra un elemento del DOM removiendo la clase 'hidden'
 * @param element - Elemento a mostrar
 */
export function showElement(element: HTMLElement | null): void {
	element?.classList.remove('hidden');
}

import { useEffect, useRef } from 'react';
import type { GoogleCredentialResponse } from '@/lib/types';

interface UseGoogleAuthProps {
	clientId: string;
	onSuccess: (response: GoogleCredentialResponse) => void;
}

/**
 * Hook personalizado para manejar la autenticación con Google
 * Carga el SDK de forma lazy y proporciona una función para iniciar sesión
 */
export function useGoogleAuth({ clientId, onSuccess }: UseGoogleAuthProps) {
	const isInitialized = useRef(false);
	const isSDKLoaded = useRef(false);

	useEffect(() => {
		if (isSDKLoaded.current) return;
		loadGoogleSDK();
	}, []);

	const loadGoogleSDK = () => {
		if (isSDKLoaded.current) return;

		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		script.onload = initializeGoogleSignIn;
		document.head.appendChild(script);
		isSDKLoaded.current = true;
	};

	const initializeGoogleSignIn = () => {
		if (typeof google === 'undefined' || isInitialized.current) return;

		google.accounts.id.initialize({
			client_id: clientId,
			callback: onSuccess
		});

		isInitialized.current = true;
	};

	// Función para iniciar el flujo de autenticación
	const login = () => {
		if (typeof google === 'undefined' || !isInitialized.current) {
			console.error('Google SDK no está inicializado todavía');
			return;
		}

		// Dispara el popup de autenticación de Google
		google.accounts.id.prompt();
	};

	return { login };
}

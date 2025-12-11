import { useEffect, useState } from 'react';

interface FacebookUser {
  first_name: string;
  last_name: string;
  email: string;
}

interface UseFacebookLoginProps {
  appId: string;
  onSuccess: (user: FacebookUser) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export function useFacebookLogin({ appId, onSuccess, onError }: UseFacebookLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // Cargar el SDK de Facebook
    if (window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      });
      setIsSDKLoaded(true);
    };

    // Cargar el script del SDK
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/es_LA/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    return () => {
      // Cleanup si es necesario
      const fbRoot = document.getElementById('fb-root');
      if (fbRoot) {
        fbRoot.remove();
      }
    };
  }, [appId]);

  const login = () => {
    if (!isSDKLoaded) {
      console.error('Facebook SDK no está cargado');
      return;
    }

    setIsLoading(true);

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          // Usuario autenticado, obtener información del perfil
          window.FB.api('/me', { fields: 'first_name,last_name,email' }, (userInfo: FacebookUser) => {
            setIsLoading(false);
            onSuccess(userInfo);
          });
        } else {
          setIsLoading(false);
          if (onError) {
            onError(new Error('Usuario canceló el login'));
          }
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return { login, isLoading, isSDKLoaded };
}

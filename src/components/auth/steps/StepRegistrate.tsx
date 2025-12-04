import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { UserData, GoogleCredentialResponse } from '@/lib/types';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { extractUserDataFromCredential } from '@/lib/services/googleAuthService';
import { sendToGoogleSheets } from '@/lib/services/sheetsService';
import { escapeHtml } from '@/utils/security';

interface StepRegistrateProps {
  onNext: (userData: UserData) => void;
  clientId: string;
  sheetsUrl: string;
}

export default function StepRegistrate({ onNext, clientId, sheetsUrl }: StepRegistrateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  useEffect(() => {
    if (registeredUser) {
      onNext(registeredUser);
    }
  }, [registeredUser]);

  const { login } = useGoogleAuth({
    clientId,
    onSuccess: handleGoogleResponse,
  });

  function handleGoogleResponse(response: GoogleCredentialResponse) {
    const userData = extractUserDataFromCredential(response);
    if (userData) {
      handleUserRegistration(userData);
    }
  }

  async function handleUserRegistration(data: UserData) {
    setIsLoading(true);

    try {
      await sendToGoogleSheets(data, sheetsUrl);
      setIsLoading(false);

      setTimeout(() => {
        setRegisteredUser(data);
      }, 100);
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setIsLoading(false);
      alert('Hubo un error al guardar tus datos. Por favor, intenta nuevamente.');
    }
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData: UserData = {
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      email: formData.email.trim(),
    };

    if (!userData.nombre || !userData.apellido || !userData.email) {
      alert('Por favor, completa todos los campos');
      return;
    }

    handleUserRegistration(userData);
  }

  return (
    <div className='md:max-w-[845px] m-auto'>
      <p className='text-[32px] leading-[128%] uppercase text-center mt-8 md:text-[40px] max-w-[800px] m-auto '>
        ¿Listo para una noche inolvidable con Alejo?
      </p>

      <p className='text-[16px] font-mono text-center mt-[20px] md:mt-[22px] md:mb-[56px] mb-[54px] md:text-[24px] md:w-[90%] md:m-auto'>
        Regístrate y participa por una serenata privada con Alejandro González. Solo necesitas dejar tus datos y ya estás dentro del parche.
      </p>

      <div className='max-w-[250px] md:max-w-[288px] m-auto'>
        <button
          onClick={login}
          className='border border-light-cream flex justify-center items-center gap-1 rounded-[50px] py-2.5 px-1 w-full cursor-pointer hover:bg-light-cream/10 transition-colors'
        >
          <img className='w-6 h-6' src='/assets/social/google.svg' alt='google' />
          <p className='text-[16px] font-mono md:text-[18px] '>Regístrate con Google</p>
        </button>
      </div>

      <picture>
        <source media='(min-width: 768px)' srcSet='/assets/divisor_desktop.svg' />
        <img src='/assets/divisor.svg' alt='divisor' className='my-[22px] md:m-auto md:py-[32px]' />
      </picture>

      <form className='flex gap-6 flex-col mb-[62px] ' onSubmit={handleFormSubmit}>
        <div className='grid gap-6  md:grid-cols-2'>
          <InputFieldForm
            name='nombre'
            label='Nombre'
            type='text'
            placeholder='Tu nombre'
            autoComplete='given-name'
            formData={formData}
            setFormData={setFormData}
          />
          <InputFieldForm
            name='apellido'
            label='Apellido'
            type='text'
            placeholder='Tu apellido'
            autoComplete='family-name'
            formData={formData}
            setFormData={setFormData}
          />
          <InputFieldForm
            name='email'
            label='Correo electrónico'
            type='email'
            placeholder='tu@email.com'
            autoComplete='email'
            formData={formData}
            setFormData={setFormData}
            customClass='md:col-span-2'
          />
        </div>

        <div className='md:flex md:gap-[12px]'>
          <CheckboxFieldForm label='Acepto términos y condiciones del concurso.' />
          <CheckboxFieldForm label='Certifico que tengo 18 años o más.' />
        </div>

        <p className='text-[12px] font-mono '>
          Al enviar tus datos, aceptas el tratamiento de tu información para fines de contacto y participación en el concurso.
        </p>

        <button
          type='submit'
          className='max-w-[250px] w-full rounded-[50px] border-light-cream border py-2.5 px-[5px] bg-[rgba(143,96,166,0.20)] font-mono m-auto'
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

interface InputFieldFormProps {
  name: 'nombre' | 'apellido' | 'email';
  label: string;
  type?: 'text' | 'email';
  placeholder: string;
  autoComplete: string;
  formData: { nombre: string; apellido: string; email: string };
  setFormData: (data: { nombre: string; apellido: string; email: string }) => void;
  customClass?: string;
}

const InputFieldForm = ({ name, label, type = 'text', placeholder, autoComplete, formData, setFormData, customClass }: InputFieldFormProps) => {
  return (
    <div className={`font-mono ${customClass}`}>
      <label htmlFor={name}>{label}</label>
      <input
        className='block border border-blue w-full rounded-[50px] py-[10px] px-[14px] mt-[8px]  bg-[rgba(143,96,166,0.20)]'
        type={type}
        id={name}
        name={name}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      />
    </div>
  );
};

const CheckboxFieldForm = ({ label }: { label: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <div onClick={toggleCheckbox} className='flex  items-center gap-2'>
      <div
        className={`w-[18px] h-[18px] rounded-full border  flex justify-center items-center p-0.5 ${
          isChecked ? 'border-light-cream ' : 'border-blue '
        } cursor-pointer`}
      >
        <div className={` w-full h-full rounded-full ${isChecked ? 'bg-light-cream ' : ' bg-transparent'}`}></div>
      </div>
      <p className='text-[12px] tracking-norma-[160%] font-mono'>{label}</p>
    </div>
  );
};

export const validateEmail = (email) => {
  if (!email) return 'Ingresa un email';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return 'Email inválido';
  return null;
};

export const validateName = (name) => {
  if (!name?.trim()) return 'Ingresa tu nombre';
  if (typeof name !== 'string') return 'Nombre inválido';
  if (name.length < 2) return 'Muy corto';
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName?.trim()) return 'Ingresa tu apellido';
  if (lastName.length < 2) return 'Muy corto';
  return null;
};

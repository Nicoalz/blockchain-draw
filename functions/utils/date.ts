export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
};

export const formatDateSlash = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
};

export const formatHour = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('fr-FR', options);
};

export const formatDateHour = (dateString: string, a?: boolean): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  if (a) {
    return `${day}/${month}/${year} à ${hour}h${minute}`;
  }

  return `${day}/${month}/${year}, ${hour}h${minute}`;
};

export const combineDateHour = (date: string, hour: string): string => {
  const date1 = new Date(date);
  const date2 = new Date(hour);
  const day = date1.getDate().toString().padStart(2, '0');
  const month = (date1.getMonth() + 1).toString().padStart(2, '0');
  const year = date1.getFullYear().toString();
  const hour1 = date2.getHours().toString().padStart(2, '0');
  const minute = date2.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hour1}:${minute}:00.000Z`;
};

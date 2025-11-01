import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: number | string) => {
    const dateToFormat = typeof date === 'string' ? new Date(date) : date;
    //return `hace ${formatDistanceToNow(dateToFormat, { locale: es })}`;
    return `hace 14 minutos`;
};

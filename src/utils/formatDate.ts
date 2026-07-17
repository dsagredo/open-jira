import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: number | string | Date): string => {
    const dateToFormat =
        typeof date === 'string' || typeof date === 'number'
            ? new Date(date)
            : date;
    return `hace ${formatDistanceToNow(dateToFormat, { locale: es })}`;
};

import { compareAsc, format } from 'date-fns'

export function formatDateString(date: string) {
    return format(new Date(date), 'yyyy MM/dd')
}
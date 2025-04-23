export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)

}

export function formatDate(datestr: string) : string {
    const dateobj = new Date(datestr)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(dateobj)
}
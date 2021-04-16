

export const getAxisID = (metric: string) => {
    if (metric.toLowerCase().endsWith('pressure')) {
        return 1
    } else if (metric.toLowerCase().endsWith('temp')) {
        return 2
    }
    return 0
}

export const appendUnit = (value: number): string => value >= 1000 ? `${value / 1000}K` : value.toString();

export const COLORS = ['#5c2020', '#823327', '#a64a29', '#c86527', '#e6841d', '#ffa600'];

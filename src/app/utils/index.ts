import { Flight } from "@/app/types";

export const fotmat = {
    price: (price: number) => {
        return new Intl.NumberFormat("ru", {
            style: "currency",
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(price);
    },
    date: (date: string) => {
        return new Intl.DateTimeFormat("ru", { day: 'numeric', month: 'short', weekday: 'short' })
            .format(new Date(date))
            .split(', ')
            .reverse()
            .join(' ');
    },
    time: (date: string) => {
        return new Intl.DateTimeFormat("ru", { timeStyle: "short" }).format(new Date(date));
    },
    duration: (time: number) => {
        return `${Math.floor(time / 60)} ч ${time % 60} мин`;
    },
}

export const filters = {
    sort: ['- по возрастанию цены', '- по убыванию цены', '- по времени в пути'],
    path: ['- без пересадкок', '- 1 пересадка'],
}

export const sort = (items: Array<Flight>, value: number) => {
    switch (value) {
        case 1:
            return items.sort((a, b) => (Number(a.price.total.amount) - Number(b.price.total.amount)) * 1);
        case 2:
            return items.sort((a, b) => (Number(a.price.total.amount) - Number(b.price.total.amount)) * -1);
        case 3:
            return items.sort((a, b) => 
                (Number(a.legs.reduce((acc, el) => (acc.duration + el.duration) as any)) - Number(b.legs.reduce((acc, el) => (acc.duration + el.duration as any)))));
    }
}

export const groupBy = <T, K extends keyof any>(array: T[], key: (i: T) => K) =>
    array.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
}, {} as Record<K, T[]>);


//     if (!data.length) return -1;
//     if (end < 1) return 0;
//     const middle = Math.floor((start + (end - start) / 2));
//     if (target === data[middle]) return middle;
//     if (end - 1 === start) return Math.abs(data[start] - target) > Math.abs(data[end] - target) ? end : start; 
//     if (target > data[middle]) return binarySearch(data, target, middle, end);
//     if (target < data[middle]) return binarySearch(data, target, start, middle);
//     return -1;
// }

// export const sortedFilter = (array: number[], start: number, end: number) => {
//     let startIndex = binarySearch(array, start, 0, array.length - 1);
//     startIndex = (array[startIndex] < start) ? startIndex + 1 : startIndex;
    
//     let endIndex = binarySearch(array, end, 0, array.length - 1);
//     endIndex = (array[endIndex] > end) ? endIndex - 1 : endIndex;

//     return array
//         .slice(startIndex, endIndex + 1);
// }


// console.log(sortedFilter([ 0, 2, 5, 7, 10, 12, 80, 101 ], 4, 100));






// export const sort: (<T extends { [key: string]: number }>(array: T[], key: string) => Array<T>) = <T extends { [key: string]: number }>(array: T[], key: string) => {
//     if (array.length <= 1) return array;

//     const pivot = array[0], left: Array<T> = [], right: Array<T> = [];

//     for (let i = 1; i < array.length; i++) {
//         array[i][key] < pivot[key] ? left.push(array[i]) : right.push(array[i]);
//     }

//     return sort(left, key).concat(pivot, sort(right, key));
// };
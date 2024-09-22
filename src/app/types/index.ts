export interface Query {
    sort: number,
    transfers: number[],
    price: {
        min: number,
        max: number,
    },
    airlines: string[],
    page: number,
}

export interface Result {
    page: number,
    nextPage: number | null,
    items: Flight[] | undefined,
}

export interface QueryResult {
    result: {
        bestPrices: Object,
        flights: Array<{
            flight: Flight,
        }>
    }
}

export interface Flight {
    carrier: Category,
    price: {
        total: Price,
        totalFeeAndTaxes: Price,
        rates: {
            totalUsd: Price,
            totalEur: Price
        },
        passengerPrices: Array<{
            total: Price,
            passengerType: Category,
            singlePassengerTotal: Price,
            passengerCount: number,
            tariff: Price,
            feeAndTaxes: Price,
        }>
    },
    servicesStatuses: {
        baggage: Category,
        exchange: Category,
        refund: Category,
    },
    legs: Array<{
        duration: number,
        segments: Array<Segment>
    }>,
    exchange: {
        ADULT: {
            exchangeableBeforeDeparture: boolean,
            exchangeAfterDeparture: Price,
            exchangeBeforeDeparture: Price,
            exchangeableAfterDeparture: boolean
        }
    },
    isTripartiteContractDiscountApplied: boolean,
    international: boolean,
    seats: [
        {
            count: number,
            type: Category,
        }
    ],
    refund: {
        ADULT: {
            refundableBeforeDeparture: boolean,
            refundableAfterDeparture: boolean,
        }
    }
}

export interface Segment {
    classOfServiceCode: string,
    classOfService: Category,
    departureAirport: Category,
    departureCity: Category,
    aircraft: Category,
    travelDuration: number,
    arrivalCity: Category,
    arrivalDate: string,
    flightNumber: string,
    operatingAirline?: Category,
    techStopInfos: Array<any>,
    departureDate: string,
    stops: number,
    servicesDetails: {
        freeCabinLuggage: Object,
        paidCabinLuggage: Object,
        tariffName: string,
        fareBasis: {
            ADULT: string,
        },
        freeLuggage: {
            ADULT: {
                pieces: number,
                nil: boolean,
                unit: string,
            }
        },
        paidLuggage: Object
    },
    airline: Category,
    starting: boolean,
    arrivalAirport: Category,
}

export interface Category {
    uid: string,
    caption: string,
    airlineCode?: string
}

export interface Price {
    amount: string,
    currency?: string,
    currencyCode: string,
}

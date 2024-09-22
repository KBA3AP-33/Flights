import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Flight, Query, Result } from "@/app/types";
import { groupBy } from "@/app/utils";


interface QueryProp {
    [key: string]: number | number[] | { min: number, max: number } | string[],
}

export interface FlightState {
    flights?: Flight[],
    query: Query,
    queryResult?: Result,
    filters: {
        airlines: Array<
            {
                company: string,
                price: number
            }
        >,
        transfers: number[],
    },
    isLoad: boolean
}

const initialState: FlightState = {
    flights: [],
    query: {
        sort: 1,
        transfers: [],
        price: {
            min: 0,
            max: 1000000,
        },
        airlines: [],
        page: 1
    },
    queryResult: undefined,
    filters: {
        airlines: [],
        transfers: [],
    },
    isLoad: true,
};

export const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        setQueryState: (state, action: PayloadAction<QueryProp | Query>) => {
            state.query = { ...state.query, ...action.payload };
        },
        setQueryResultState: (state, action: PayloadAction<Result>) => {
            state.queryResult = action.payload;
            state.flights = (state.queryResult.page === 1)
                ? state.queryResult.items
                : (state.flights?.length && state.queryResult.items?.length) ? [...state.flights, ...state.queryResult.items] : [];

            const airlines = groupBy(state.flights!, e => e.carrier.caption);
            state.filters = {
                airlines: Object.keys(airlines).map(e => ({
                    company: e,
                    price: Math.min(...airlines[e].map(x => Number(x.price.total.amount)))
                })),
                transfers: Array.from(new Set(state.flights?.flatMap(e => e.legs.map(x => x.segments.length - 1)))),
            };
        },
        setIsLoadState: (state, action: PayloadAction<boolean>) => {
            state.isLoad = action.payload;
        },
    },
})

export const { setQueryState, setQueryResultState, setIsLoadState } = flightSlice.actions;
export const flightReducer = flightSlice.reducer;

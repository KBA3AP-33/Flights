import flights from "@/app/data/flights.json";
import { Query, QueryResult, Result } from "@/app/types";
import { sort } from "@/app/utils";


const limit = 5;
export const getFlights = (params: Query): Promise<Result> => {
    const nextFlights = (flights as QueryResult).result.flights
        ?.map(e => e.flight)
        ?.filter(e => 
            (Number(e.price.total.amount) >= params.price.min && Number(e.price.total.amount) <= params.price.max) &&
            (!params.transfers.length || params.transfers.some(i => e.legs.map(x => x.segments.length - 1).includes(i))) &&
            (!params.airlines.length || params.airlines.some(i => e.carrier.caption === i))
        );

    const offset = (params.page - 1) * limit;
    const result = {
        page: params.page,
        nextPage: nextFlights.length > offset + limit ? params.page + 1 : null,
        items: sort(nextFlights, params.sort)?.slice(offset, offset + limit),
    }

    return new Promise((res, rej) => {
        setTimeout(() => {
            res(result);
        }, Math.floor(Math.random() * (500 + 1) + 500));//500-1000ms
    });
};

export const getFlightsWithError = (params: Query): Promise<Result> => {
    return new Promise(() => {
        throw new Error("500, unknown server error");
    });
};

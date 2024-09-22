'use client'

import { useEffect, useState } from "react";
import { Query } from "@/app/types";
import { filters } from "@/app/utils";
import { getFlights } from "@/app/api";
import { Input } from "@/app/components/global/input";
import { Filter } from "@/app/components/global/filter";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { setIsLoadState, setQueryResultState, setQueryState } from "@/app/store/flightSlice";
import { useDebounce } from "@/app/hooks/debounce";

const defaultParams = { sort: 1, transfers: [], price: { min: -1, max: 1000000, }, airlines: [], page: 1 };
export const SideBar = () => {
    const [params, setParams] = useState<Query>(defaultParams);
    const { query, filters: sideFilters } = useAppSelector((state) => state.flight);
    const dispatch = useAppDispatch();  
    const debounce = useDebounce(params, 1000);

    useEffect(() => {
        if (JSON.stringify(defaultParams) !== JSON.stringify(params)) {
            dispatch(setQueryState(params));
        }
    }, [debounce])

    useEffect(() => {
        dispatch(setIsLoadState(true));
        getFlights(query)
            .then(e => dispatch(setQueryResultState(e)))
            .catch(e => console.log(e.message))
            .finally(() => dispatch(setIsLoadState(false)));
    }, [query])

    return (
        <aside className="w-full flex flex-wrap lg:flex-col lg:max-w-[320px] px-2 py-4 [&>*]:mb-4">
            <Filter title="Сортировать">
                {
                    filters.sort.map((e, i) =>
                        <Input
                            key={e}
                            text={e}
                            type="radio"
                            id={e}
                            name="sort"
                            value={i + 1}
                            checked={params.sort === i + 1}
                            onChange={(e) => setParams(prev => ({ ...prev, sort: Number(e.target.value) }))}
                            className="flex-row-reverse justify-end [&>input]:max-w-[15px]"/>)
                }
            </Filter>
            <Filter title="Фильтровать">
                {
                    filters.path.map((e, i) =>
                        <Input
                            key={e}
                            id={e}
                            type="checkbox"
                            text={e}
                            value={i}
                            disabled={!sideFilters.transfers.includes(i)}
                            onChange={(e) => setParams(prev => ({
                                ...prev, transfers: (e.target.checked) ? [...prev.transfers, Number(e.target.value)] : prev.transfers.filter(x => x !== Number(e.target.value))
                            }))}
                            className="flex-row-reverse justify-end [&>input]:max-w-[15px]"/>)
                }
            </Filter>
            <Filter title="Цена">
                <div className="flex flex-col gap-4">
                    <Input
                        id="from"
                        text="от"
                        type="number"
                        changeValue={(min) => setParams(prev => ({ ...prev, price: { ...prev.price, min: Number(min) } }))}
                        defaultValue={0}/>
                    <Input
                        id="to"
                        text="до"
                        type="number"
                        changeValue={(max) => setParams(prev => ({ ...prev, price: { ...prev.price, max: Number(max) } }))}
                        defaultValue={params.price.max}/>
                </div>
            </Filter>
            {
                sideFilters?.airlines.length
                ? <Filter title="Авиакомпании">
                    {
                        sideFilters?.airlines.map(e =>
                            <div key={e.company} className="flex justify-between items-center flex-nowrap gap-2">
                                <div className="grow">
                                    <Input
                                        id={e.company}
                                        type="checkbox"
                                        text={`- ${e.company}`}
                                        value={e.company}
                                        onChange={(e) => setParams(prev => ({
                                            ...prev, airlines: (e.target.checked) ? [...prev.airlines, e.target.value] : prev.airlines.filter(x => x !== e.target.value)
                                        }))}
                                        className="flex-row-reverse justify-end [&>input]:max-w-[15px] [&>label]:max-w-[170px]"/>
                                </div>
                                <span className="text-nowrap">от {e.price} р.</span>
                            </div>)
                    }
                </Filter>
                : <></>
            }
        </aside>
    )    
}

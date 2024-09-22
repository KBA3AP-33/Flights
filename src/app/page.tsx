'use client'

import { Catalog } from "@/app/components/flight/catalog";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { setQueryState } from "@/app/store/flightSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoad, queryResult, flights } = useAppSelector((state) => state.flight);

  return (
    <main className="max-w-[1024px] w-full px-2 py-4">
      <Catalog
        flights={flights}
        isNext={typeof(queryResult?.nextPage) === 'number'}
        isLoad={isLoad}
        onShowMore={() => dispatch(setQueryState({ page: Number(queryResult?.nextPage) }))}/>
    </main>
  );
}

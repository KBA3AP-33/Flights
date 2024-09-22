import { Button } from "@/app/components/global/button";
import { FlightItem } from "@/app/components/flight/FlightItem";
import { fotmat } from "@/app/utils";
import { Flight } from "@/app/types";
import { FC } from "react";

interface Props {
    flight: Flight,
}

export const CatalogItem: FC<Props> = ({ flight }) => {
    return (
        <article className="w-full bg-[#0087c9] flex flex-col mb-8">
            <h2 className="w-full text-white flex justify-between items-center px-5">
                <img src="#" alt={flight.carrier.caption}/>
                <div></div>
                <div>
                    <p className="text-end">{fotmat.price(Number(flight.price.passengerPrices[0].total.amount))}</p>
                    <p className="text-end">Стоимость для одного взрослого пасссажира</p>
                </div>
            </h2>
            <div className="flex flex-col gap-0.5">
                {
                    flight.legs.length && flight.legs.map((_, i) => <FlightItem key={i} route={flight.legs[i]}/>)
                }
            </div>
            <Button className="uppercase border-none bg-[#ffb168] text-white py-2.5 hover:bg-orange-300">Выбрать</Button>
        </article>
    )
}

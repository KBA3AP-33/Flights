import { fotmat } from "@/app/utils";
import { Clock } from "@/app/components/icons/clock";
import { ArrowRight } from "@/app/components/icons/arrowRight";
import { Segment } from "@/app/types";
import { FC } from "react";

interface Props {
    route: {
        duration: number,
        segments: Segment[]
    }
}

export const FlightItem: FC<Props> = ({ route }) => {
    return (
        <div className="w-full bg-white rounded flex flex-col px-2.5 py-1.5">
            <h3 className="border-b border-gray-200 text-xl pb-2">
                <span>{route.segments[0].departureCity?.caption}, {route.segments[0].departureAirport.caption}</span>
                <span className="text-[#0087c9]"> ({route.segments[0].departureAirport.uid})
                    <span className="[&>*]:inline-block">
                        &nbsp;<ArrowRight/>&nbsp;
                    </span>
                </span>
                <span>{route.segments[route.segments.length - 1].arrivalCity?.caption}, {route.segments[route.segments.length - 1].arrivalAirport.caption}</span>
                <span className="text-[#0087c9]"> ({route.segments[route.segments.length - 1].arrivalAirport.uid})</span>
            </h3>
            <div className="flex justify-between items-center">
                <p className="flex items-baseline gap-2 py-2">
                    <span className="text-xl">{fotmat.time(route.segments[0].departureDate)}</span>
                    <span className="text-[#0087c9]">{fotmat.date(route.segments[0].departureDate)}</span>
                </p>
                <p className="text-xl flex items-center gap-1">
                    <span><Clock/></span>
                    <span>{fotmat.duration(route.duration)}</span>
                </p>
                <p className="flex items-baseline gap-2 py-2">
                    <span className="text-[#0087c9]">{fotmat.date(route.segments[route.segments.length - 1].arrivalDate)}</span>
                    <span className="text-xl">{fotmat.time(route.segments[route.segments.length - 1].arrivalDate)}</span>
                </p>
            </div>
            <span className="transfer-count flex justify-center items-center text-[#ffb168] text-center text-nowrap">
                {
                    (route.segments.length - 1) ? <span>{route.segments.length - 1} пересадка</span> : <></>
                }
            </span>
            <p className="text-xl pt-2">
                Рейс выполняет: { (route.segments[0].operatingAirline) ? route.segments[0].operatingAirline.caption : route.segments[0].airline.caption }
            </p>
        </div>
    )
}

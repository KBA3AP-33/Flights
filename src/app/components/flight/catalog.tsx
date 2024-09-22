import { Button } from "@/app/components/global/button";
import { CatalogItem } from "@/app/components/flight/catalogItem";
import { FC } from "react";
import { Flight } from "@/app/types";
import { Loader } from "@/app/components/global/loader";

interface Props {
    flights?: Flight[],
    isNext: boolean,
    isLoad: boolean,
    onShowMore: () => void,
}

export const Catalog: FC<Props> = ({ flights, onShowMore, isNext, isLoad }) => {
    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className="w-full">
                {
                    flights?.length
                        ? flights.map((flight, i) => <CatalogItem key={i} flight={flight}/>)
                        : <p className="text-center">{!isLoad ? 'Список пуст!' : ''}</p>
                }
            </div>
            {
                isLoad
                    ? <Loader isActive={isLoad}/>
                    : <>
                        {
                            isNext
                            ? <Button className="font-normal !px-20 hover:bg-[#e3e3e3]" onClick={onShowMore}>Показать еще</Button>
                            : <></>
                        }
                    </>
            }

        </div>
    )
}

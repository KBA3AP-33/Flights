import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<'div'> {
    title: string
}

export const Filter: FC<Props> = ({ title, children }) => {
    return (
        <div>
            <h3 className="font-semibold px-4">{ title }</h3>
            <div className="flex flex-col px-4 py-2">
                {children}
            </div>
        </div>
    )
}

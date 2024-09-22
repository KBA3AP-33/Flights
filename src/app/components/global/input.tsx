'use client'

import { ComponentProps, FC, useEffect, useState } from "react";

interface Props extends ComponentProps<'input'> {
    text?: string,
    changeValue?: (value: string | number | readonly string[] | undefined) => void,
}

export const Input: FC<Props> = ({ className, defaultValue, text, changeValue, ...props }) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => changeValue && changeValue(value), [value]);

    return (
        <div className={`flex gap-1 ${className}`}>
            {
                text && <label htmlFor={props.id} className="min-w-[20px] text-ellipsis inline-block overflow-hidden text-nowrap">{text}</label>
            }
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-black px-1"
                {...props} />
        </div>
    )
}
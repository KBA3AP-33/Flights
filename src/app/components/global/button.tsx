import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<'button'> { }

export const Button: FC<Props> = ({ children, className, ...props }) => {
    return (
        <button className={`px-3 py-1 font-semibold leading-5 border border-[#898787] bg-[#f1f1f1] transition-colors ${className}`} {...props}>
            {children}
        </button>
    )
}

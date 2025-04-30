import {ReactNode} from "react";

export default function Text({children, className, color}: {
    children: ReactNode,
    className?: string,
    color?: string
}) {
    const textColor = color || "text-black dark:text-white"
    return <p className={`${textColor} ${className}`}>{children}</p>
}
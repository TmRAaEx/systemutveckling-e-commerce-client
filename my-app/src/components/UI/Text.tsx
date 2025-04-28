import {ReactNode} from "react";

export default function Text({children, className}: { children: ReactNode, className?: string }) {
    return <p className={`text-black dark:text-white ${className}`}>{children}</p>
}
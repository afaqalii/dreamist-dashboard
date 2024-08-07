import { TitleProps } from "@/lib/interfaces"
const Title = ({ children, isRootLetter = false, className }: TitleProps) => {
    return (
        <div className="my-5">
            <h1 className={`relative text-xl md:text-2xl font-bold ${isRootLetter ? 'py-2' : 'py-0'} ${className}`}>{children}
                <div className="absolute -bottom-2 left-1 h-1 w-20 bg-blue"></div>
            </h1>
        </div>
    )
}

export default Title
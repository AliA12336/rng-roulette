import { type PropsWithChildren } from "react"

export const Plate = ({children}: PropsWithChildren) => {
    return (
         <div className="plate-outside-border w-[90%] max-w-[580px] aspect-square rounded-full bg-[#6f4e37] border-[5px] border-white mx-auto relative flex justify-center items-center">
            <div className="plate-outside w-[95%] aspect-square rounded-full bg-white shadow-[inset_0_0_8px_#ccc] flex justify-center items-center">
              <div className="plate-inside-border w-[98%] aspect-square rounded-full bg-[#6f4e37] border border-white flex justify-center items-center">
                <div className="plate-inside w-[98%] aspect-square rounded-full bg-white flex justify-center items-center">
                    <>{children}</>
                </div>
              </div>
            </div>
        </div>
    )
}
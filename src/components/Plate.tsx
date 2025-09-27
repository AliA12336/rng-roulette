import { type PropsWithChildren } from "react"

export const Plate = ({children}: PropsWithChildren) => {
    return (
         <div className="plate-outside-border" style={{position: "relative", width: "600px", height: "600px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #ffffff"}}>
            <div className="plate-outside" style={{width: "550px", height: "550px", background: "#ffffff", borderRadius: "50%", boxShadow: "inset 0 0 8px #ccc", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <div className="plate-inside-border" style={{position: "relative", width: "540px", height: "540px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #ffffff"}}>
                <div className="plate-inside" style={{width: "530px", height: "530px", background: "#ffffff", borderRadius: "50%",  display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <>{children}</>
                </div>
              </div>
            </div>
        </div>
    )
}
import { type PropsWithChildren } from "react"

export const Plate = ({children}: PropsWithChildren) => {
    return (
         <div className="plate-outside-border" style={{position: "relative", width: "350px", height: "350px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #ffffff"}}>
            <div className="plate-outside" style={{width: "330px", height: "330px", background: "#ffffff", borderRadius: "50%", boxShadow: "inset 0 0 8px #ccc", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <div className="plate-inside-border" style={{position: "relative", width: "300px", height: "300px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #ffffff"}}>
                <div className="plate-inside" style={{width: "290px", height: "290px", background: "#ffffff", borderRadius: "50%", boxShadow: "inset 0 0 8px #ccc", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <>{children}</>
                </div>
              </div>
            </div>
        </div>
    )
}
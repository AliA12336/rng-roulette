import SpinWheel from "./SpinWheel"

export const CoffeeMug = () => {
    return (
        <div className="cup" style={{position: "relative", height: "420px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #ffffff"}}>
             <SpinWheel />
            <div className="cup-handle" style={{ position: "absolute", right: "-55%", top: "58%", transform: "translateY(-50%)", width: '300px', height: '300px', backgroundColor: '#6f4e37', clipPath: 'path("M 80 75 Q 89 123 80 165 L 80 165 L 125 165 Q 130 165 130 160 L 130 80 Q 130 75 125 75 L 100 75 L 100 75 Z")'}} />
        </div>
    )
}
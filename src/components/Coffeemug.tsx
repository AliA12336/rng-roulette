export const CoffeeMug = () => {
    return (
        <div style={{position: "relative", width: "200px", height: "200px", background: "#6f4e37", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #ffffff"}}>
            <div style={{width: "130px", height: "130px", background: "#ffffff", borderRadius: "50%", boxShadow: "inset 0 0 8px #ccc"}}>
              <div style={{ position: "absolute", right: "-100%", top: "62%", transform: "translateY(-50%)", width: '300px', height: '300px', backgroundColor: '#6f4e37', clipPath: 'path("M 100, 100 Q 108, 125, 100, 150 L 120 150 A 10 10 0 0 0 130 140 L 130 110 A 10 10 0 0 0 120 100 Z")'}} />
            </div>
        </div>
    )
}
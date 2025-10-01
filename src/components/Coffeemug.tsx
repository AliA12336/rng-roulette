import SpinWheel from "./SpinWheel"

export const CoffeeMug = () => {
    return (
        <div className="relative w-[70%] rounded-full mx-auto top-1/12">
            <SpinWheel />
            <svg
                viewBox="0 0 130 165"
                preserveAspectRatio="xMidYMid meet"
                style={{
                position: 'absolute',
                right: '-15%',
                top: '35%',
                transform: 'translateY(-50%)',
                width: '30%',
                height: '50%',
                }}
            >
                <path
                    className="cup-handle"
                    d="M 80 75 Q 89 123 80 165 L 80 165 L 125 165 Q 130 165 130 160 L 130 80 Q 130 75 125 75 L 100 75 L 100 75 Z"
                    fill="#6f4e37"
                />
            </svg>
        </div>
    )
}
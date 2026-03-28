export default function StepDots({ current, total }) {
    return (
        <div className="flex items-center gap-2 mb-10 justify-center">
            {Array.from({ length: total }, (_, i) => {
                const idx = i + 1;
                const isDone   = idx < current;
                const isActive = idx === current;
                return (
                    <div
                        key={idx}
                        className="h-2 rounded-full border transition-all duration-300"
                        style={{
                            width:           isActive ? '24px' : '8px',
                            background:      isActive ? '#c9a84c' : isDone ? '#444' : 'transparent',
                            borderColor:     isActive ? '#c9a84c' : isDone ? '#444' : '#333',
                            borderRadius:    isActive ? '4px' : '50%',
                        }}
                    />
                );
            })}
        </div>
    );
}
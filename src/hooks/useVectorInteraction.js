import { useState, useCallback } from 'react';

const useVectorInteraction = (canvasRef) => {
    const [vecA, setVecA] = useState({ x: 50, y: 100 });
    const [vecB, setVecB] = useState({ x: 150, y: -50 });
    const [selectedVector, setSelectedVector] = useState(null); // null, 'A', or 'B'

    const calculateMagnitude = useCallback((x, y) => Math.sqrt(x * x + y * y).toFixed(2), []);

    const getMousePos = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, [canvasRef]);
    
    const getTouchPos = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }, [canvasRef]);

    const handleMouseMove = useCallback((e) => {
        if (!selectedVector) return;
        
        const mousePos = getMousePos(e);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const origin = { x: canvas.width / 2, y: canvas.height / 2 };
        
        const newX = mousePos.x - origin.x;
        const newY = -(mousePos.y - origin.y);
        
        if (selectedVector === 'A') {
            setVecA({ x: Math.round(newX), y: Math.round(newY) });
        } else if (selectedVector === 'B') {
            setVecB({ x: Math.round(newX), y: Math.round(newY) });
        }
    }, [selectedVector, getMousePos, canvasRef]);

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e) => {
        if (!selectedVector) return; 

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        e.preventDefault();
    }, [selectedVector, handleMouseMove, handleMouseUp]);
    
    const handleTouchMove = useCallback((e) => {
        if (!selectedVector) return;
        
        handleMouseMove(e.touches[0]);
        
        e.preventDefault();
    }, [selectedVector, handleMouseMove]);

    const handleTouchEnd = useCallback(() => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }, [handleTouchMove]);

    const handleTouchStart = useCallback((e) => {
        if (!selectedVector) return;
        
        // Simulate mouse move for touch start to get initial position
        handleMouseMove(e.touches[0]);
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        
        e.preventDefault();
    }, [selectedVector, handleMouseMove, handleTouchMove, handleTouchEnd]);

    const handleVectorInputChange = useCallback((vectorName, axis, value) => {
        if (vectorName === 'A') {
            setVecA(prev => ({ ...prev, [axis]: Number(value) }));
        } else if (vectorName === 'B') {
            setVecB(prev => ({ ...prev, [axis]: Number(value) }));
        }
    }, []);

    const calculateResultant = useCallback(() => {
        const [ax, ay, bx, by] = [Number(vecA.x), Number(vecA.y), Number(vecB.x), Number(vecB.y)];
        const [rx, ry] = [ax + bx, ay + by];
        const resultantMagnitude = calculateMagnitude(rx, ry);

        return {
            resultant: { x: rx, y: ry },
            info: {
                a: `Vektor A: (${ax}, ${ay}), |A|: ${calculateMagnitude(ax, ay)}`,
                b: `Vektor B: (${bx}, ${by}), |B|: ${calculateMagnitude(bx, by)}`,
                r: `Resultan R: (${rx}, ${ry}), |R|: ${resultantMagnitude}`
            }
        };
    }, [vecA, vecB, calculateMagnitude]);

    return {
        vecA, setVecA,
        vecB, setVecB,
        selectedVector, setSelectedVector,
        handleMouseDown,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleVectorInputChange,
        calculateResultant,
        calculateMagnitude // Expose if needed elsewhere
    };
};

export default useVectorInteraction;

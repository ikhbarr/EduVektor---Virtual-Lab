import { useEffect, useCallback } from 'react';

const useVectorCanvas = (canvasRef, { vecA, vecB, resultant, selectedVector }) => {
    const getContext = useCallback(() => canvasRef.current.getContext('2d'), [canvasRef]);
    const getOrigin = useCallback(() => ({ x: canvasRef.current.width / 2, y: canvasRef.current.height / 2 }), [canvasRef]);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = getContext();
        const origin = getOrigin();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
        for (let y = 0; y <= canvas.height; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
        
        // Draw axes
        ctx.strokeStyle = '#9e9e9e'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, origin.y); ctx.lineTo(canvas.width, origin.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(origin.x, 0); ctx.lineTo(origin.x, canvas.height); ctx.stroke();
    }, [canvasRef, getContext, getOrigin]);

    const drawVector = useCallback((x, y, color, label) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = getContext();
        const origin = getOrigin();
        const endX = origin.x + x;
        const endY = origin.y - y;
        
        // Scale vector drawing for smaller canvas on mobile
        const scale = Math.min(canvas.width / 600, 1); 
        const lineWidth = Math.max(2, 3 * scale);
        const fontSize = Math.max(12, Math.floor(16 * scale));
        const arrowSize = Math.max(8, Math.floor(10 * scale));
        
        ctx.beginPath(); 
        ctx.moveTo(origin.x, origin.y); 
        ctx.lineTo(endX, endY); 
        ctx.strokeStyle = color; 
        ctx.lineWidth = lineWidth; 
        ctx.stroke();
        
        const angle = Math.atan2(endY - origin.y, endX - origin.x);
        ctx.save(); 
        ctx.translate(endX, endY); 
        ctx.rotate(angle); 
        ctx.beginPath(); 
        ctx.moveTo(0, 0); 
        ctx.lineTo(-arrowSize, arrowSize/2); 
        ctx.lineTo(-arrowSize, -arrowSize/2); 
        ctx.closePath(); 
        ctx.fillStyle = color; 
        ctx.fill(); 
        ctx.restore();
        
        ctx.font = `bold ${fontSize}px Arial`; 
        ctx.fillStyle = color; 
        ctx.fillText(label, endX + arrowSize, endY);
    }, [canvasRef, getContext, getOrigin]);

    const redrawCanvas = useCallback(() => {
        clearCanvas();
        const [ax, ay, bx, by] = [Number(vecA.x), Number(vecA.y), Number(vecB.x), Number(vecB.y)];
        drawVector(ax, ay, selectedVector === 'A' ? 'orange' : 'red', 'A');
        drawVector(bx, by, selectedVector === 'B' ? 'orange' : 'blue', 'B');
        
        if (resultant && resultant.x !== undefined && resultant.y !== undefined) {
            drawVector(resultant.x, resultant.y, 'green', 'R');
        }
    }, [clearCanvas, drawVector, vecA, vecB, resultant, selectedVector]);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
        const container = canvas.parentElement;
        if (!container) return;

        let displayHeight, displayWidth;

        if (window.innerWidth < 900) {
            // --- Logika Mobile ---
            displayWidth = Math.min(container.clientWidth, window.innerWidth * 0.95);
            displayHeight = Math.min(window.innerHeight * 0.6, 400);
        }
        else {
            // --- Logika Desktop ---
            displayWidth = container.clientWidth;
            displayHeight = container.clientHeight; 
        }


        if (!displayWidth || !displayHeight) {
            return;
        }

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight; 
        }

        redrawCanvas();
        };

        const initialResizeId = setTimeout(resizeCanvas, 0);

        const resizeHandler = () => {
            setTimeout(resizeCanvas, 0);
        }

        window.addEventListener('resize', resizeHandler);

        return () => {
            clearTimeout(initialResizeId);
            window.removeEventListener('resize', resizeHandler);
        };
        }, [canvasRef, redrawCanvas]);

    //     const observer = new ResizeObserver(() => {
            
    //         setTimeout(resizeCanvas, 0);
    //     });

    //     if (canvas.parentElement) {
    //         observer.observe(canvas.parentElement);
    //     }

    //     resizeCanvas(); // Initial resize

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [canvasRef, redrawCanvas]);

    
    useEffect(() => {
        redrawCanvas();
    }, [vecA, vecB, resultant, selectedVector, redrawCanvas]);

    return { clearCanvas, redrawCanvas };
};

export default useVectorCanvas;

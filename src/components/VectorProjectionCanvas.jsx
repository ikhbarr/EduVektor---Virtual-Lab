// src/components/VectorProjectionCanvas.jsx
import React, { useRef, useEffect, useState } from 'react';

const VectorProjectionCanvas = () => {
  const canvasRef = useRef(null);
  const [vector, setVector] = useState({ x: 0, y: 0 });
  const [magnitude, setMagnitude] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [projectile, setProjectile] = useState(null);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
   
    const resizeCanvas = () => {
     
      const container = canvas.parentElement;
      if (!container) return;
      
      const containerWidth = Math.min(container.clientWidth, window.innerWidth * 0.95);
      const containerHeight = Math.min(window.innerHeight * 0.5, 400); 
      
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const getCanvasContext = () => canvasRef.current.getContext('2d');

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx, width, height) => {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
  };

  const drawVector = (ctx, x, y, height) => {

    const scale = Math.min(canvasRef.current.width / 800, 1); 
    const lineWidth = Math.max(2, 3 * scale);
    const headlen = Math.max(8, 10 * scale);
    
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(x, height - y);
    ctx.stroke();


    const angle = Math.atan2(height - (height - y), x);
    ctx.beginPath();
    ctx.moveTo(x, height - y);
    ctx.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), height - y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x, height - y);
    ctx.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), height - y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  const drawProjectile = (ctx, p, height) => {
    if (!p) return;
    
    
    const scale = Math.min(canvasRef.current.width / 800, 1); 
    const radius = Math.max(3, 5 * scale);
    
    ctx.fillStyle = '#00f';
    ctx.beginPath();
    ctx.arc(p.x, height - p.y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawTrails = (ctx, trails, height) => {

    const scale = Math.min(canvasRef.current.width / 800, 1); 
    const radius = Math.max(1, 2 * scale);
    
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    trails.forEach(trail => {
      ctx.beginPath();
      ctx.arc(trail.x, height - trail.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const updateVectorInfo = (x, y) => {
    const mag = Math.sqrt(x * x + y * y);
    const ang = Math.atan2(y, x) * (180 / Math.PI);
    setVector({ x: x.toFixed(1), y: y.toFixed(1) });
    setMagnitude(mag.toFixed(1));
    setAngle(ang.toFixed(1));
  };


  const getTouchPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setProjectile(null);
    e.preventDefault(); 
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setProjectile(null);
    e.preventDefault(); 
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = canvas.height - (e.clientY - rect.top);
    updateVectorInfo(x, y);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = getTouchPos(e);
    const x = touch.x;
    const y = canvas.height - touch.y;
    updateVectorInfo(x, y);
    e.preventDefault(); 
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    launchProjectile();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    launchProjectile();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = canvas;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', () => setIsDragging(false));
    
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', () => setIsDragging(false));
      
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const ctx = getCanvasContext();
    const { width, height } = canvasRef.current;
    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, width, height);
    drawAxes(ctx, width, height);
    if (isDragging) {
      drawVector(ctx, parseFloat(vector.x), parseFloat(vector.y), height);
    }
    drawTrails(ctx, trails, height);
    drawProjectile(ctx, projectile, height);
  }, [vector, isDragging, projectile, trails]);

  const launchProjectile = () => {
    let t = 0;
    const C = 0.5; 
    const initialVx = parseFloat(vector.x) || 0;
    const initialVy = parseFloat(vector.y) || 0;

    const newTrail = [];

    const animation = () => {
      const pX = initialVx * t / 10;
      const pY = initialVy * t / 10 - C * t * t;

      if (pY < 0) {
        setTrails(prev => [...prev, ...newTrail]);
        setProjectile(null);
        return;
      }

      setProjectile({ x: pX, y: pY });
      newTrail.push({ x: pX, y: pY });
      t += 1;
      requestAnimationFrame(animation);
    };

    animation();
  };

  const handleReset = () => {
    setVector({ x: 0, y: 0 });
    setMagnitude(0);
    setAngle(0);
    setProjectile(null);
    setTrails([]);
  };

  return (
    <div className="vector-projection-container">
      <canvas ref={canvasRef} id="proyeksi-canvas" style={{ border: '1px solid black', width: '100%', height: 'auto' }} />
      <div id="proyeksi-info-panel" className="info-panel">
        <h3>Informasi Vektor</h3>
        <p>Komponen: V = ({vector.x}, {vector.y})</p>
        <p>Magnitudo: ||V|| = {magnitude}</p>
        <p>Sudut: θ = {angle}°</p>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default VectorProjectionCanvas;

// src/pages/SimulasiPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import firebase from '../firebase';

const SimulasiPage = () => {
    const [vecA, setVecA] = useState({ x: 50, y: 100 });
    const [vecB, setVecB] = useState({ x: 150, y: -50 });
    const [info, setInfo] = useState({ a: '-', b: '-', r: '-' });
    const [history, setHistory] = useState([]);
    
    const canvasRef = useRef(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const origin = { x: canvas.width / 2, y: canvas.height / 2 };

        const drawGrid = () => {
            ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1;
            for (let x = 0; x <= canvas.width; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
            for (let y = 0; y <= canvas.height; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
            ctx.strokeStyle = '#9e9e9e'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, origin.y); ctx.lineTo(canvas.width, origin.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(origin.x, 0); ctx.lineTo(origin.x, canvas.height); ctx.stroke();
        };
        
        drawGrid();
    }, []);

    useEffect(() => {
        if (!currentUser) {
            setHistory([]);
            return;
        }

        const unsubscribe = db.collection('calculations').doc(currentUser.uid).collection('history')
            .orderBy('timestamp', 'desc').limit(5)
            .onSnapshot(snapshot => {
                const fetchedHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setHistory(fetchedHistory);
            });

        return () => unsubscribe();
    }, [currentUser]);

    const getContext = () => canvasRef.current.getContext('2d');
    const getOrigin = () => ({ x: canvasRef.current.width / 2, y: canvasRef.current.height / 2 });
    
    const calculateMagnitude = (x, y) => Math.sqrt(x * x + y * y).toFixed(2);

    const clearCanvas = () => {
        const ctx = getContext();
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const canvas = canvasRef.current;
        const origin = getOrigin();
        ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
        for (let y = 0; y <= canvas.height; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
        ctx.strokeStyle = '#9e9e9e'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, origin.y); ctx.lineTo(canvas.width, origin.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(origin.x, 0); ctx.lineTo(origin.x, canvas.height); ctx.stroke();
    };

    const drawVector = (x, y, color, label) => {
        const ctx = getContext();
        const origin = getOrigin();
        const endX = origin.x + x; const endY = origin.y - y; // y dibalik
        ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(endX, endY); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
        const angle = Math.atan2(endY - origin.y, endX - origin.x);
        ctx.save(); ctx.translate(endX, endY); ctx.rotate(angle); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-10, 5); ctx.lineTo(-10, -5); ctx.closePath(); ctx.fillStyle = color; ctx.fill(); ctx.restore();
        ctx.font = "bold 16px Arial"; ctx.fillStyle = color; ctx.fillText(label, endX + 10, endY);
    };

    const handleDraw = () => {
        clearCanvas();
        const [ax, ay, bx, by] = [Number(vecA.x), Number(vecA.y), Number(vecB.x), Number(vecB.y)];
        drawVector(ax, ay, 'red', 'A');
        drawVector(bx, by, 'blue', 'B');
        setInfo({
            a: `Vektor A: (${ax}, ${ay}), |A|: ${calculateMagnitude(ax, ay)}`,
            b: `Vektor B: (${bx}, ${by}), |B|: ${calculateMagnitude(bx, by)}`,
            r: '-'
        });
    };

    const handleAdd = async () => {
        handleDraw();
        const [ax, ay, bx, by] = [Number(vecA.x), Number(vecA.y), Number(vecB.x), Number(vecB.y)];
        const [rx, ry] = [ax + bx, ay + by];
        drawVector(rx, ry, 'green', 'R');

        setInfo(prev => ({
            ...prev,
            r: `Resultan R: (${rx}, ${ry}), |R|: ${calculateMagnitude(rx, ry)}`
        }));

        if (currentUser) {
            try {
                await db.collection('calculations').doc(currentUser.uid).collection('history').add({
                    vecA: { x: ax, y: ay }, vecB: { x: bx, y: by }, vecR: { x: rx, y: ry },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) { console.error("Gagal menyimpan riwayat:", error); }
        }
    };

    return (
        <main className="simulasi">
            <section className="canvas-container">
                <canvas ref={canvasRef} width="600" height="600"></canvas>
            </section>
            <aside className="controls">
                <h2>Panel Kontrol</h2>
                <fieldset>
                    <legend>Vektor A (Merah)</legend>
                    <label>Komponen x:</label>
                    <input type="number" value={vecA.x} onChange={e => setVecA({ ...vecA, x: e.target.value })} />
                    <label>Komponen y:</label>
                    <input type="number" value={vecA.y} onChange={e => setVecA({ ...vecA, y: e.target.value })} />
                </fieldset>
                <fieldset>
                    <legend>Vektor B (Biru)</legend>
                    <label>Komponen x:</label>
                    <input type="number" value={vecB.x} onChange={e => setVecB({ ...vecB, x: e.target.value })} />
                    <label>Komponen y:</label>
                    <input type="number" value={vecB.y} onChange={e => setVecB({ ...vecB, y: e.target.value })} />
                </fieldset>
                <div className="actions">
                    <button onClick={handleDraw}>1. Gambar Vektor A & B</button>
                    <button onClick={handleAdd}>2. Gambar Vektor Resultan (A + B)</button>
                    <button onClick={() => { clearCanvas(); setInfo({a:'-',b:'-',r:'-'}); }}>Reset Canvas</button>
                </div>
                 <div id="results">
                    <h3>Hasil Perhitungan:</h3>
                    <p>{info.a}</p>
                    <p>{info.b}</p>
                    <p>{info.r}</p>
                </div>
            </aside>
            {currentUser && (
                <section id="history-section">
                    <h2>Riwayat Simulasi (5 Terakhir)</h2>
                    <ul id="history-list">
                        {history.length > 0 ? (
                            history.map(item => (
                                <li key={item.id}>
                                    A({item.vecA.x}, {item.vecA.y}) + B({item.vecB.x}, {item.vecB.y}) = R({item.vecR.x}, {item.vecR.y})
                                </li>
                            ))
                        ) : (
                            <li>Belum ada riwayat.</li>
                        )}
                    </ul>
                </section>
            )}
        </main>
    );
};
export default SimulasiPage;
// src/pages/KuisPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import firebase from '../firebase';

const questionBank = [
    { question: "Jika Vektor A = (3, 4), berapakah magnitudo dari Vektor A?", options: ["5", "7", "1", "12"], answer: "5" },
    { question: "Besaran yang hanya memiliki nilai saja disebut...", options: ["Vektor", "Skalar", "Resultan", "Komponen"], answer: "Skalar" },
    { question: "Jika Vektor A = (2, 1) dan Vektor B = (1, 3), maka Vektor Resultan A + B adalah...", options: ["(3, 3)", "(3, 4)", "(4, 3)", "(1, -2)"], answer: "(3, 4)" },
    { question: "Vektor yang memiliki panjang satu satuan disebut...", options: ["Vektor Nol", "Vektor Satuan", "Vektor Posisi", "Vektor Basis"], answer: "Vektor Satuan" },
    { question: "Hasil dari perkalian titik (dot product) antara vektor A = (2, 3) dan B = (4, -1) adalah...", options: ["5", "8", "11", "10"], answer: "5" },
    { question: "Dua vektor dikatakan ortogonal (tegak lurus) jika hasil dot product-nya adalah...", options: ["1", "0", "-1", "Sama dengan magnitudonya"], answer: "0" },
    { question: "Jika vektor P = (6, -8), maka vektor satuan dari P adalah...", options: ["(0.6, -0.8)", "(6/10, 8/10)", "(3, -4)", "Tidak bisa ditentukan"], answer: "(0.6, -0.8)" }
];

const getShuffledQuestions = (arr, num = 5) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};


const KuisPage = () => {
    const { currentUser } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        setQuestions(getShuffledQuestions(questionBank, 5));
    }, []);

    const handleAnswerChange = (qIndex, option) => {
        setAnswers(prev => ({ ...prev, [qIndex]: option }));
    };

    const handleSubmit = async () => {
        let currentScore = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                currentScore++;
            }
        });
        setScore(currentScore);

        if (currentUser) {
            await db.collection('quizScores').doc(currentUser.uid).collection('attempts').add({
                score: currentScore,
                totalQuestions: questions.length,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    };

    if (!currentUser) {
        return <p>Login untuk memulai kuis dan menyimpan skormu!</p>;
    }

    return (
        <div>
            <h1>Kuis Pemahaman Vektor</h1>
            {questions.length > 0 ? (
                 <div id="quiz-form">
                    {questions.map((q, index) => (
                        <div key={index} className="question">
                            <p><strong>{index + 1}. {q.question}</strong></p>
                            <div className="options">
                                {q.options.map(option => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={`question${index}`}
                                            value={option}
                                            checked={answers[index] === option}
                                            onChange={() => handleAnswerChange(index, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p>Memuat soal...</p>}
           
            <button id="submit-quiz" onClick={handleSubmit}>Kumpulkan Jawaban</button>
            {score !== null && (
                <div id="quiz-results">
                    Skor Anda: {score} dari {questions.length}
                </div>
            )}
        </div>
    );
};

export default KuisPage;
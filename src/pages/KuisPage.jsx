// src/pages/KuisPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import firebase from '../firebase';
import styles from './KuisPage.module.css';

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
    const [isSubmitted, setIsSubmitted] = useState(false);

    const startQuiz = () => {
        setQuestions(getShuffledQuestions(questionBank, 5));
        setAnswers({});
        setScore(null);
        setIsSubmitted(false);
    };

    useEffect(() => {
        startQuiz();
    }, []);

    const handleAnswerChange = (qIndex, option) => {
        if (isSubmitted) return; // Prevent changes after submission
        setAnswers(prev => ({ ...prev, [qIndex]: option }));
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctAnswers++;
            }
        });
        
        const finalScore = (correctAnswers / questions.length) * 100;
        setScore(correctAnswers);
        setIsSubmitted(true);

        if (currentUser) {
            try {
                await db.collection('quiz_attempts').add({
                    userId: currentUser.uid,
                    quizId: 'vektor_dasar_1',
                    score: finalScore,
                    correctAnswers: correctAnswers,
                    totalQuestions: questions.length,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error("Error saving quiz attempt: ", error);
            }
        }
    };

    if (!currentUser) {
        return <p>Login untuk memulai kuis dan menyimpan skormu!</p>;
    }

    return (
        <div className="kuis-container">
            <h1>Kuis Pemahaman Vektor</h1>
            
            {isSubmitted && (
                <div className={styles.quizResultsSummary}>
                    <h2>Hasil Kuis</h2>
                    <p>Skor Anda: <strong>{score}</strong> dari <strong>{questions.length}</strong></p>
                    <button onClick={startQuiz}>Coba Lagi</button>
                </div>
            )}

            {questions.length > 0 ? (
                 <div id="quiz-form">
                    {questions.map((q, index) => {
                        const isCorrect = q.answer === answers[index];
                        return (
                            <div key={index} className="question">
                                <p><strong>{index + 1}. {q.question}</strong></p>
                                <div className={styles.options}>
                                    {q.options.map(option => {
                                        const isSelected = answers[index] === option;
                                        let labelClass = '';
                                        if (isSubmitted) {
                                            if (option === q.answer) labelClass = styles.correct;
                                            else if (isSelected) labelClass = styles.incorrect;
                                        }
                                        return (
                                            <label key={option} className={`${labelClass} ${isSelected ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name={`question${index}`}
                                                    value={option}
                                                    checked={isSelected}
                                                    disabled={isSubmitted}
                                                    onChange={() => handleAnswerChange(index, option)}
                                                />
                                                {option}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : <p>Memuat soal...</p>}
           
            {!isSubmitted && (
                <button id="submit-quiz" className={styles.submitQuiz} onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                    Kumpulkan Jawaban
                </button>
            )}
        </div>
    );
};

export default KuisPage;
import React, {useState} from "react";
import Result from "./Result";
import Question from "./Question";

const   QuizApp =()=> {
    const  questions= [
                {
                    id: 1,
                    question: "What is the capital of France?",
                    options: ["Paris", "London", "Berlin", "Madrid"],
                    answer: "Paris"
                },
                {
                    id: 2,
                    question: "What is the largest planet in our solar system?",
                    options: ["Jupiter", "Saturn", "Mars", "Earth"],
                    answer: "Jupiter"
                }
            ];

        const [score, setScore]=useState(0)
        const [currentQuestion, setCurrentQuestion]=useState(0) // question hiện tại
       const [quizzEnd, setQuizzEnd]= useState(false)
        const handleReplay = () => {
            setCurrentQuestion(0);
            setScore(0);
            setQuizzEnd(false);
        };
    const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizzEnd(true);
        }
    };
        return (
            <div>
                <h2>Quizz App</h2>
                {quizzEnd ?
                <Result score={score} total={questions.length} onReplay={handleReplay} />
                    :
                    (
                        <Question
                            question={questions[currentQuestion].question}
                            options={questions[currentQuestion].options}
                            onSelectAnswer={handleAnswer}
                        />
                    )
                }
            </div>
        );
}

export default QuizApp;

import React from "react";

const Question = ({ question, options, onSelectAnswer }) => {
    return (
        <div className="container">
            <h2 className="text-center">{question}</h2>
            <div className="d-flex flex-column align-items-center gap-2">
                {options.map((option, index) => (
                    <button key={index} className="btn btn-primary w-50" onClick={() => onSelectAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;

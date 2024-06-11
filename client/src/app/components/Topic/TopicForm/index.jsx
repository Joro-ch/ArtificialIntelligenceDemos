"use client";
import { useState } from "react";

const TopicForm = ({ values, questionTarget, fileName }) => {
    const [answer, setAnswer] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const question = [];
        console.log(fileName)

        Object.keys(values).map((key) => {
            if (key != questionTarget) {
                const selector = form[key.toLowerCase()];
                question.push(selector.value);
            }
        });

        const response = await fetch('/api/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file_name: fileName, pregunta: question }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result)
            setAnswer(result.respuesta);
        };
    }

    return (
        <form className="flex flex-col gap-5 w-1/2 " onSubmit={onSubmit}>
            <p className="mb-3">
                3. Try changing feature parameters to form a question for the Decision Tree.
            </p>
            <div className="flex flex-col gap-5 max-h-[45vh] overflow-auto">
                {Object.keys(values).map((key) => (
                    <>
                        {key != questionTarget && (
                            <span className="flex gap-5">
                                {key}
                                <select className="w-full text-black" name={key.toLowerCase()}>
                                    {values[key].sort().map((option, index) =>
                                        <option key={index} value={option}> {option} </option>
                                    )}
                                </select>
                            </span>
                        )}
                    </>
                ))}
            </div>
            <button className="bg-green-500 rounded p-1" type="submit">
                🚀 Send and Do the Question 🚀
            </button>
            {answer && (
                <h5 className="text-xl text-center"> 
                    Answer: {answer} 
                </h5>
            )}
        </form>
    )
}

export default TopicForm;
"use client";
import { useState } from "react";

const TopicForm = ({ values, questionTarget, fileName }) => {
    const [answer, setAnswer] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const question = [];

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
            setAnswer(result.respuesta);
        };
    }

    return (
        <form className="flex flex-col gap-5 w-1/2 " onSubmit={onSubmit}>
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
            <button className="bg-green-300 rounded" type="submit">
                Do the Question
            </button>
            <h5> Answer: {answer} </h5>
        </form>
    )
}

export default TopicForm;
"use client";
import { useState } from "react";

const TopicForm = ({ values, questionTarget }) => {
    const [answer, setAnswer] = useState("");

    console.log(values)

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const outlook = form.outlook.value;
        const temperature = form.temperature.value;
        const humidity = form.humidity.value;
        const wind = form.wind.value;
        const question = [outlook, temperature, humidity, wind];

        const response = await fetch('/api/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file_name: 'playTennis.json', pregunta: question }),
        });

        if (response.ok) {
            const result = await response.json();
            setAnswer(result.respuesta);
        }
    }

    return (
        <form className="flex flex-col gap-5 w-1/2" onSubmit={onSubmit}>
            {Object.keys(values).map((key) => (
                <>
                    {key != questionTarget && (
                        <span className="flex gap-5">
                            {key}
                            <select className="w-full text-black" name={key.toLowerCase()}>
                                {values[key].map((a) =>
                                    <option> {a} </option>
                                )}
                            </select>
                        </span>
                    )}
                </>
            ))}
            <button className="bg-green-300 rounded" type="submit">
                Do the Question
            </button>
            <h5> Answer: {answer} </h5>
        </form>
    )
}

export default TopicForm;
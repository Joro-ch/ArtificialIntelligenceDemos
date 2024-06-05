"use client";
import { useState } from "react";

const TopicForm = ({  }) => {
    const [answer, setAnswer] = useState("");

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
            <span className="flex gap-5">
                {"Outlook"}
                <select className="w-full text-black" name="outlook">
                    <option> Sunny </option>
                    <option> Overcast </option>
                    <option> Rain </option>
                </select>
            </span>
            <span className="flex gap-5">
                {"Temperature"}
                <select className="w-full text-black" name="temperature">
                    <option> Hot </option>
                    <option> Mild </option>
                    <option> Cool </option>
                </select>
            </span>
            <span className="flex gap-5">
                {"Humidity"}
                <select className="w-full text-black" name="humidity">
                    <option> High </option>
                    <option> Normal </option>
                </select>
            </span>
            <span className="flex gap-5">
                {"Wind"}
                <select className="w-full text-black" name="wind">
                    <option> Strong </option>
                    <option> Weak </option>
                </select>
            </span>
            <button className="bg-green-300 rounded" type="submit">
                Do the Question
            </button>
            <h5> Answer: {answer} </h5>
        </form>
    )
}

export default TopicForm;
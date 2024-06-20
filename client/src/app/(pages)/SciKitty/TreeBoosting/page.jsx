"use client";
import { useState } from 'react';
import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    A package inspired by the widely used Scikit Learn.
`

const TreeBoosting = ({ }) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const getImage = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/scikitty_linear_regression/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setResult(result);
            } else {
                const errorData = await response.json();
                console.error('Error fetching data:', errorData);
                setError('Error fetching data');
            }
        } catch (error) {
            console.error('Request failed:', error);
            setError('Request failed');
        }
    }

    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="SciKitty Boosting" description={DESC} />
                <button onClick={getImage}> 
                    Enviar 
                </button>
                {result && (
                    <div>
                        <p>Mean Squared Error: {result.mse}</p>
                        <img src={`data:image/png;base64,${result.plot}`} alt="Plot" />
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </article>
        </main>
    )
}

export default TreeBoosting;

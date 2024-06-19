"use client";
import { useState } from "react";
import InitBoard from "../InitBoard";
import GoalBoard from "../GoalBoard";

const RAGTryDemo = ({ }) => {
    const [boardData, setBoardData] = useState({});
    const [boardSize, setBoardSize] = useState(2);
    const [randomBoard, setRandomBoard] = useState([]);

    const onChangeSize = (e) => {
        const newSize = e.target.value;
        if (newSize < 2 || newSize > 10) return;
        setBoardSize(newSize);
    }

    const randomizeBoardNumbers = () => {
        const totalNumbers = boardSize * boardSize;
        const numbers = Array.from({ length: totalNumbers }, (_, index) => index);

        for (let i = totalNumbers - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        const matrix = [];
        for (let i = 0; i < boardSize; i++) {
            matrix.push(numbers.slice(i * boardSize, (i + 1) * boardSize));
        }

        setRandomBoard(matrix); 
    }

    return (
        <>
            <p>
                Try to set a size for the board. Insert the numbers in
                the board o try to use the Randomize Board Numbers Button. 
                Use '0' for the empty value.
            </p>
            <div className="flex justify-center items-center gap-5 mt-3 ">
                <span className="bg-gray-800 p-3 flex justify-center items-center w-1/3 rounded gap-5 border border-gray-600">
                    <h5 className="text-blue-400"> 📐 Board Size </h5>
                    <input
                        className="text-black text-center rounded p-1"
                        type="number"
                        min={2}
                        onChange={onChangeSize}
                        defaultValue={boardSize}
                    />
                </span>
                <button
                    className="text-blue-400 bg-gray-800 p-4 w-1/3 rounded border border-gray-600 hover:bg-gray-900"
                    onClick={randomizeBoardNumbers}
                >
                    🎲 Randomize Board Numbers 🎲
                </button>
            </div>
            <div className="flex gap-3 mt-3">
                <InitBoard setBoardData={setBoardData} boardSize={boardSize} randomBoard={randomBoard} />
                {Object.keys(boardData).length > 0 && (
                    <GoalBoard boardData={boardData} />
                )}
            </div>
        </>
    )
}

export default RAGTryDemo;
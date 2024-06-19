"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const InitBoard = ({ setBoardData, boardSize, randomBoard }) => {
    const [isLoading, setIsLoading] = useState(false);
    const columns = Array.from({ length: boardSize }, (_, i) => i);
    const [formBoard, setFormBoard] = useState([]);

    useEffect(() => {
        if (randomBoard.length) {
            setFormBoard(randomBoard);
        }
    }, [randomBoard]);

    const getRetraigoData = async (board) => {
        const response = await fetch('/api/retraigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "board": board
            }),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }
        else {
            return await response.json();
        };
    }

    const onSubmitBoard = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const formData = new FormData(e.target);
            const board = getFormBoard(formData);
            const boardData = await getRetraigoData(board);
            console.log(boardData);
            setBoardData(boardData);
        }
        catch (e) {
            if (e instanceof TypeError) {
                toast.error('Error!', { description: "Server not online!" });
            }
            else {
                toast.error('Error!', { description: e.message });
            };
        }
        finally {
            setIsLoading(false);
        }
    }

    const getFormBoard = (formData) => {
        const board = [];
        const valuesSet = new Set();
        for (let i = 0; i < boardSize; i++) {
            const row = [];
            for (let j = 0; j < boardSize; j++) {
                let value = formData.get(`c${i}${j}`);
                if (value === '0') {
                    value = 'empty';
                }
                if (valuesSet.has(value)) {
                    throw new Error(`Duplicate value found: ${value} at position (${i}, ${j})`);
                }
                valuesSet.add(value);
                row.push(value);
            }
            board.push(row);
        }
        return board;
    }

    return (
        <form
            onSubmit={onSubmitBoard}
            className="flex flex-col justify-center bg-gray-700 p-5 rounde w-1/2 m-auto rounded border border-gray-600"
        >
            <h5 className="text-3xl text-center text-blue-400 mb-3">
                Initial Board
            </h5>
            <table className="m-5 mt-0 h-full">
                <tbody>
                    {columns.map((col1, index1) => (
                        <tr key={col1 + index1}>
                            {columns.map((col2, index2) => (
                                <td key={col2 + index2}>
                                    <input
                                        type="number"
                                        min={0}
                                        max={(boardSize * boardSize) - 1}
                                        className="border p-2 text-center text-xl text-black rounded w-full"
                                        name={`c${col1}${col2}`}
                                        defaultValue={formBoard[col1]?.[col2] ?? ''}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isLoading ? (
                <button type="submit" className="bg-green-500 p-1 rounded w-2/3 m-auto">
                    🚀 Send Board to Play 🚀
                </button>
            ) : (
                <button type="submit" className="bg-green-700 p-1 rounded w-2/3 m-auto cursor-not-allowed text-gray-400">
                    <FontAwesomeIcon icon={faSpinner} className="spinner" />
                </button>
            )}
        </form>
    )
}

export default InitBoard;

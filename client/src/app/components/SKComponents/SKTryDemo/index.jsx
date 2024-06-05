"use client";
import Image from "next/image";
import Papa from "papaparse";
import TopicForm from "@/app/components/Topic/TopicForm";
import { useState } from "react";

const DATASETS = [{
    name: "Play Tennis",
    file_name: "playTennis.json",
    target: "Play Tennis"
}]

const SKTryDemo = ({ }) => {
    const [csvData, setCSVData] = useState([]);
    const [values, setValues] = useState({});
    const [questionTarget, setQuestionTarget] = useState("");

    const changeHandler = (e) => {
        const form = e.target;
        Papa.parse(form.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                setCSVData(results.data);
                const header = results.data.shift();
                setQuestionTarget(header[0]);
                const output = results.data[0].map((_, colIndex) => results.data.map(row => row[colIndex]));
                let newDic = {};
                output.map((row, index) => {
                    const a = ([... new Set(row)]);
                    newDic = {
                        ...newDic,
                        [header[index]]: a,
                    }
                })
                setValues(newDic);
            },
        });
    };

    const handleOnChangeTarget = (e) => {
        e.preventDefault();
        const newOption = e.target.value;
        setQuestionTarget(newOption);
    };

    return (
        <section className="mx-10 mt-10">
            <h2 className="text-3xl"> Try Demo </h2>
            <hr className="my-3" />
            <div className="flex pb-5 gap-5 items-center">
                <span className="flex items-center gap-3">
                    DataSet:
                    <select className="text-black rounded bg-green-300 p-2">
                        {DATASETS.map((dataset, index) => (
                            <option key={index}> {dataset.name} </option>
                        ))}
                    </select>
                </span>
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={changeHandler}
                />
                {questionTarget && (
                    <span className="flex gap-3">
                        Target: 
                        <select className="text-black" onChange={handleOnChangeTarget}>
                            {Object.keys(values).map((value, index) =>
                                <option key={index}> {value} </option>
                            )}
                        </select>
                    </span>
                )}
            </div>
            <div className="flex gap-10">
                <Image
                    width={3840}
                    height={2160}
                    src={"/images/SciKitty.webp"}
                    alt={"SciKitty Logo"}
                    className="h-[50vh] rounded-t w-full object-cover w-[350px] bg-[#323C4F]"
                />
                {Object.keys(values).length > 0 && (
                    <TopicForm values={values} questionTarget={questionTarget}/>
                )}
            </div>
        </section>
    )
}

export default SKTryDemo;
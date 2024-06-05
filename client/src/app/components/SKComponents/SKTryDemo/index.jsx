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

    //State to store the values
    const [values, setValues] = useState({});

    const changeHandler = (e) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        const form = e.target;
        Papa.parse(form.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {

                const header = results.data[0];
                if (typeof header === 'object' && header !== null) {
                    setValues(header);
                };
            },
        });
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
                <h5> Target: {DATASETS[0].target} </h5>
            </div>
            <div className="flex gap-10">
                <Image
                    width={3840}
                    height={2160}
                    src={"/images/SciKitty.webp"}
                    alt={"SciKitty Logo"}
                    className="h-[50vh] rounded-t w-full object-cover w-[350px] bg-[#323C4F]"
                />
                <TopicForm />
            </div>
        </section>
    )
}

export default SKTryDemo;
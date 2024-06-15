"use client";
import Papa from "papaparse";
import UploadCSV from "../UploadCSV";
import SendCSV from "../SendCSV";
import Metrics from "../Metrics";
import DoQuestion from "../DoQuestion";
import { useState } from "react";
import { toast } from "sonner";
import { DATASETS } from "@/app/constants/DATASETS";

const SKTryDemo = ({ }) => {
    const [csvData, setCSVData] = useState([]);
    const [values, setValues] = useState({});
    const [questionTarget, setQuestionTarget] = useState("");
    const [criterion, setCriterion] = useState("entropy");
    const [fileName, setFileName] = useState("");
    const [dataSets, setDataSets] = useState(DATASETS);
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        const form = e.target;
        if (!form.files[0]) return;
        const fileName = form.files[0].name;
        const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));
        const newFileName = nameWithoutExtension;
        const newDataSet = {
            fileName: newFileName,
        }
        setFileName(newFileName);
        Papa.parse(form.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                setCSVData(results.data);
                newDataSet.data = results.data;
                initParams(newDataSet);
            },
        });
        setDataSets([...dataSets, newDataSet]);
    };

    const initParams = (newDataSet) => {
        const header = newDataSet.data[0];
        const dataWithOutHeader = newDataSet.data.slice(1);
        setQuestionTarget(header[0]);
        const output = dataWithOutHeader[0].map((_, colIndex) => dataWithOutHeader.map(row => row[colIndex]));
        let newDic = {};
        output.map((row, index) => {
            const a = ([... new Set(row)]);
            newDic = {
                ...newDic,
                [header[index]]: a,
            }
        });
        setValues(newDic);
    };

    const handleOnChangeTarget = (e) => {
        e.preventDefault();
        const newOption = e.target.value;
        setQuestionTarget(newOption);
    };

    const handleOnChangeCriterion = (e) => {
        e.preventDefault();
        const newOption = e.target.value;
        const lowerCase = newOption.toLowerCase();
        setCriterion(lowerCase);
    };

    const handleOnSelectSavedDataSet = (e) => {
        e.preventDefault();
        const dataSetIndex = e.target.value;
        if (dataSetIndex == 0) return;
        const newDataSet = dataSets[dataSetIndex - 1];
        setFileName(newDataSet.fileName); 
        setCSVData(newDataSet.data);
        initParams(newDataSet);
    };

    const onEnviar = async () => {
        try {
            if (fileName == "") return;
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/transformCSV/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ csv: csvData, featureTarget: questionTarget, fileName: fileName }),
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }
            else {
                const result = await response.json();
                setMetrics(result);
            }
        }
        catch (e) {
            if (e instanceof TypeError) {
                toast.error('Error!', { description: "Server not online!" })
            }
            else {
                toast.error('Error!', { description: e.message })
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-10 mt-10">
            <h2 className="text-3xl"> Try Demo </h2>
            <hr className="my-3" />
            <UploadCSV
                changeHandler={changeHandler}
                dataSets={dataSets}
                onSelectSavedDataSet={handleOnSelectSavedDataSet}
            />
            <SendCSV
                fileName={fileName}
                values={values}
                onChangeTarget={handleOnChangeTarget}
                onChangeCriterion={handleOnChangeCriterion}
                onEnviar={onEnviar}
                isLoading={loading}
            />
            {Object.keys(metrics).length > 0 && (
                <>
                    <Metrics metrics={metrics} />
                    <DoQuestion
                        values={values}
                        questionTarget={questionTarget}
                        fileName={fileName}
                    />
                </>
            )}
        </section>
    )
}

export default SKTryDemo;
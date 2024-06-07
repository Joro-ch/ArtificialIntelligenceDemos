
const SendCSV = ({ fileName, values, handleOnChangeTarget, onEnviar }) => {
    return (
        <section className="mt-3 flex flex-col">
            {fileName != "" && (
                <>
                    <p>
                        2. Please select the target you want to use to train the Decision Tree:
                    </p>
                    <span className="flex gap-3 justify-center my-5">
                        Target:
                        <select className="text-black" onChange={handleOnChangeTarget}>
                            {Object.keys(values).map((value, index) =>
                                <option key={index}> {value} </option>
                            )}
                        </select>
                    </span>
                </>
            )}
            <button onClick={onEnviar} className={`w-1/3 m-auto mt-3 rounded p-2 ${fileName == "" ? "cursor-not-allowed bg-green-700 text-gray-400" : "bg-green-500 "}`}>
                🚀 Send dataset to train a Decision Tree 🚀
            </button>
        </section>
    )
}

export default SendCSV;
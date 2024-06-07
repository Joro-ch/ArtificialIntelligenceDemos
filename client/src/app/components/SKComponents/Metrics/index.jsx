
const Metrics = ({ metrics }) => {
    return (
        <section className="flex gap-3 mt-8 flex-wrap w-full justify-center">
            <div className="flex flex-col gap-3 w-1/4 bg-gray-800 rounded-xl p-3">
                <h5 className="text-3xl mb-3 text-center">
                    Tree Metrics
                </h5>
                <span>
                    Accuracy: {metrics.accuracy}
                </span>
                <span>
                    Precision: {metrics.precision}
                </span>
                <span>
                    Recall: {metrics.recall}
                </span>
                <span>
                    F1: {metrics.f1}
                </span>
                <span>
                    Is Balanced: {metrics.is_balanced ? "Yes" : "No"}
                </span>
                <span>
                    Train Features:
                    <>
                        {" ["}
                        {metrics.features.map((item, index) =>
                            <>
                                {index != metrics.features.length - 1 ? `${item}, ` : item}
                            </>
                        )}
                        {"]"}
                    </>
                </span>
                <span>
                    Real Features:
                    <>
                        {" ["}
                        {metrics.real_features.map((item, index) =>
                            <>
                                {index != metrics.features.length - 1 ? `${item}, ` : item}
                            </>
                        )}
                        {"]"}
                    </>
                </span>
            </div>
            <div className="flex flex-col bg-gray-800 rounded-xl p-3 w-2/3 ">
                <h5 className="text-3xl mb-3 text-center ">
                    Confusion Matrix
                </h5>
                <table className="m-5 mt-0 h-full">
                    <tbody>
                        {metrics.conf_matrix.map((fila, indiceFila) => (
                            <tr key={indiceFila} >
                                {fila.map((celda, indiceCelda) => (
                                    <td key={indiceCelda} className="border p-2 text-center text-xl">
                                        {celda}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Metrics;
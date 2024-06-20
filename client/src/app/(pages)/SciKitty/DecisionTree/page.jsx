import SKTryDemo from "../../../components/SKComponents/SKTryDemo";
import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    A package inspired by the widely used Scikit Learn.
`

const SciKitty = ({ }) => {
    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="SciKitty Decision Tree" description={DESC} />
                <SKTryDemo />
            </article>
        </main>
    )
}

export default SciKitty;
import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    A package inspired by the widely used Scikit Learn.
`

const Boosting = ({ }) => {
    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="SciKitty Boosting" description={DESC} />
            </article>
        </main>
    )
}

export default Boosting;
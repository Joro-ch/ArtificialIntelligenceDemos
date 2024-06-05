import SKTryDemo from "../../components/SKComponents/SKTryDemo";
import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    Lorem ipsum dolor sit amet consectetur, 
    adipisicing elit. Incidunt libero at nemo! 
    Dolores vel tenetur similique error, eum, libero 
    id sit accusamus maiores nulla quos consectetur fugit veniam, 
    delectus laudantium.
`

const SciKitty = ({ }) => {
    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="SciKitty" description={DESC} />
                <SKTryDemo />
                <section className="mx-10 mt-10">
                    <h2 className="text-3xl"> What{"'"}s SciKitty? </h2>
                    <hr className="my-3" />
                    <p> {DESC} </p>
                </section>
                <section className="mx-10 mt-10">
                    <h2 className="text-3xl"> How does it work? </h2>
                    <hr className="my-3" />
                    <p> {DESC} </p>
                </section>
            </article>
        </main>
    )
}

export default SciKitty;
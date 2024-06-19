import RAGTryDemo from "@/app/components/RAGComponents/RAGTryDemo";
import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    A K-puzzle AI game.
`

const RetrAiGo = ({ }) => {
    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="RetrAiGo" description={DESC}/>
                <section className="mx-10 mt-10"> 
                    <h2 className="text-3xl"> Try Demo </h2>
                    <hr className="my-3"/>
                    <RAGTryDemo />
                </section>
            </article>
        </main>
    )
}

export default RetrAiGo;
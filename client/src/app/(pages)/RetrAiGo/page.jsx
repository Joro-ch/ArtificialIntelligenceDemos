import TopicHeader from "@/app/components/Topic/TopicHeader";

const DESC = `
    Lorem ipsum dolor sit amet consectetur, 
    adipisicing elit. Incidunt libero at nemo! 
    Dolores vel tenetur similique error, eum, libero 
    id sit accusamus maiores nulla quos consectetur fugit veniam, 
    delectus laudantium.
`

const RetrAiGo = ({ }) => {
    return (
        <main>
            <article className="text-[#ffffff] pb-10">
                <TopicHeader title="RetrAiGo" description={DESC}/>
                <section className="mx-10 mt-10"> 
                    <h2 className="text-3xl"> Try Demo </h2>
                    <hr className="my-3"/>
                    <p> {DESC} </p>
                </section>
                {/* <section className="mx-10 mt-10"> 
                    <h2 className="text-3xl"> What{"'"}s RetrAiGo? </h2>
                    <hr className="my-3"/>
                    <p> {DESC} </p>
                </section>
                <section className="mx-10 mt-10"> 
                    <h2 className="text-3xl"> How it works? </h2>
                    <hr className="my-3"/>
                    <p> {DESC} </p>
                </section> */}
            </article>
        </main>
    )
}

export default RetrAiGo;
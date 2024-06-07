import Image from "next/image";
import TopicForm from "../../Topic/TopicForm";

const DoQuestion = ({ values, questionTarget, fileName }) => {
    return (
        <section className="mt-5">
            <div className="flex gap-5">
                <Image
                    width={3840}
                    height={2160}
                    src={"/images/SciKitty.webp"}
                    alt={"SciKitty Logo"}
                    className="h-[50vh] rounded-t w-full object-cover w-[350px] bg-[#323C4F]"
                />
                <TopicForm values={values} questionTarget={questionTarget} fileName={fileName} />
            </div>
        </section>
    )
}

export default DoQuestion;
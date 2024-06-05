import ToolCard from '@/app/components/ToolCard'
import { DEMOS } from './constants/DEMOS';

export default function Home() {
  return (
    <main>
      <article className="px-10 pt-10 text-white mb-5">
        <section className="mx-10 text-white">
          <h1 className="text-7xl text-center text-title-color">
            Artificial Inteligence Demos
          </h1>
          <p className="mt-10">
            Artificial intelligence employs various techniques to achieve its goals. Below, we{"'"}ll
            explore some demo tools that teach us and facilitate understanding of AI.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 justify-around">
            {DEMOS.map((demo, index) => (
              <ToolCard name={demo.name} image={demo.image} url={demo.url} key={index} />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HeadCircuit, List } from "@phosphor-icons/react/dist/ssr";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto px-4">
      <header className="flex flex-row justify-between items-center w-full">
        <Link
          href="/dashboard"
          className="text-2xl font-bold uppercase mt-4 rounded-md text-green-700 flex gap-1"
        >
          <i>
            <HeadCircuit size={32} color="oklch(0.627 0.194 149.214)" />
          </i>
          Agenda aqui
        </Link>
        <List size={32} color="#000" />
      </header>
      <main className="flex flex-col justify-center text-xl">
        <Image
          src={"/group.png"}
          alt="Desenho de grupo de pessoas"
          width={400}
          height={300}
          className="w-full h-auto rounded-full drop-shadow-2xl shadow-black"
        />
        <article className="flex flex-col justify-center">
          <h2 className="font-semibold">O que esperar de nós?</h2>
          <p className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            deserunt necessitatibus quos harum iure, voluptates placeat nisi
            perspiciatis sint incidunt commodi, recusandae, provident blanditiis
            a. Doloremque consequuntur velit labore repudiandae?
          </p>
        </article>
      </main>
      <section className="flex flex-col items-center justify-center">
        <h3>Nossos Profissionais!</h3>
        <div className="w-full flex flex-row gap-2 overflow-x-auto">
          <div className="min-w-11/12 h-auto">
            <Image
              src={"/avatar.png"}
              alt="Foto do profissional"
              width={120}
              height={120}
            />
            <div>
              <h1>Nome da pessoa</h1>
              <h2>Trabalho dele</h2>
              <p>Bio que que ele escreveu</p>
            </div>
            <button>Ver Horários</button>
          </div>
          <div className="min-w-11/12 h-auto">
            <Image
              src={"/avatar.png"}
              alt="Foto do profissional"
              width={120}
              height={120}
            />
            <div>
              <h1>Nome da pessoa</h1>
              <h2>Trabalho dele</h2>
              <p>Bio que que ele escreveu</p>
            </div>
            <button>Ver Horários</button>
          </div>
          <div className="min-w-11/12 h-auto">
            <Image
              src={"/avatar.png"}
              alt="Foto do profissional"
              width={120}
              height={120}
            />
            <div>
              <h1>Nome da pessoa</h1>
              <h2>Trabalho dele</h2>
              <p>Bio que que ele escreveu</p>
            </div>
            <button>Ver Horários</button>
          </div>
        </div>
        <p>
          Quer fazer parte da nossa equipe? <button>Clique aqui!</button>
        </p>
      </section>
    </div>
  );
}

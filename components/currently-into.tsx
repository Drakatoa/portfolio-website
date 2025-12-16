import Image from "next/image"

export function CurrentlyInto() {
  return (
    <section className="px-6 py-20 border-t border-white/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">{"FUN STUFF"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="border border-white/20 p-6 md:p-8">
          <h3 className="text-xs text-white/60 mb-6">{"[CURRENTLY INTO]"}</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/40 text-xs mb-4 uppercase tracking-wider">{"Recent games I've been playing"}</p>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/icons/overwatch.png"
                    alt="Overwatch 2"
                    width={80}
                    height={80}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  />
                  <p className="text-xs text-white/60 text-center">{"Overwatch 2"}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/icons/the-finals.png"
                    alt="The Finals"
                    width={80}
                    height={80}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  />
                  <p className="text-xs text-white/60 text-center">{"The Finals"}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/icons/metaphor.png"
                    alt="Metaphor: ReFantazio"
                    width={80}
                    height={80}
                    className="rounded border border-white/20 hover:scale-105 transition-transform cursor-pointer"
                  />
                  <p className="text-xs text-white/60 text-center max-w-[80px]">{"Metaphor: ReFantazio"}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white/40 text-xs mb-4 uppercase tracking-wider">
                {"What I'm listening to "}
                <span className="text-white/50 normal-case italic">{"(my favorite albums)"}</span>
              </p>
              <div className="flex gap-6">
                <a
                  href="https://open.spotify.com/album/0rsCXQ9QyrLaTc2a5fvsZR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <Image
                    src="/icons/census-designated.png"
                    alt="Jane Remover - Census Designated"
                    width={80}
                    height={80}
                    className="rounded border border-white/20 group-hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <p className="text-xs text-white/80 font-medium">{"Jane Remover"}</p>
                    <p className="text-xs text-white/50">{"Census Designated"}</p>
                  </div>
                </a>
                <a
                  href="https://open.spotify.com/album/4n1tg05JN5EY0k7FRRcAir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <Image
                    src="/icons/the-fool.png"
                    alt="Bladee - The Fool"
                    width={80}
                    height={80}
                    className="rounded border border-white/20 group-hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <p className="text-xs text-white/80 font-medium">{"Bladee"}</p>
                    <p className="text-xs text-white/50">{"The Fool"}</p>
                  </div>
                </a>
                <a
                  href="https://open.spotify.com/album/0YYPOxN7WrWD3ygAP5KB50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <Image
                    src="/icons/evangelic.png"
                    alt="Yeule - Evangelic Girl is a Gun"
                    width={80}
                    height={80}
                    className="rounded border border-white/20 group-hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <p className="text-xs text-white/80 font-medium">{"Yeule"}</p>
                    <p className="text-xs text-white/50 max-w-[80px]">{"Evangelic Girl is a Gun"}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

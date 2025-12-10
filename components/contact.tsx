export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-white/20">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{"CONTACT"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[EMAIL]"}</h3>
              <a href="mailto:rajit.goel@utdallas.edu" className="text-xl hover:opacity-70 transition-opacity">
                {"rajit.goel@utdallas.edu"}
              </a>
            </div>

            <div>
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[SOCIAL]"}</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/rajitgoel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  <span>{"GitHub"}</span>
                  <span className="text-white/40">{"→"}</span>
                </a>
                <a
                  href="https://linkedin.com/in/rajitgoel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  <span>{"LinkedIn"}</span>
                  <span className="text-white/40">{"→"}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border border-white/20 p-6 md:p-8">
            <h3 className="text-xs text-white/60 mb-6 font-mono">{"[MESSAGE]"}</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="NAME"
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="MESSAGE"
                  rows={6}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-white px-4 py-3 text-sm hover:bg-white hover:text-black transition-colors"
              >
                {"SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="h-px w-24 bg-white/40" />
            <span className="text-2xl">{"✦"}</span>
            <div className="h-px w-24 bg-white/40" />
          </div>
          <p className="text-xs text-white/40 font-mono">{"© 2025 RAJIT GOEL. ALL RIGHTS RESERVED."}</p>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import type { Metadata } from "next"
import { Github, Linkedin, Mail, Gamepad2, Disc3, FileText } from "lucide-react"
import { Projects } from "@/components/projects"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollCue } from "@/components/landing/scroll-cue"
import { Sparkle } from "@/components/landing/sparkle"
import { HeroMockFigure } from "@/components/landing/hero-mock-figure"
import { Jost, Archivo } from "next/font/google"

import styles from "@/components/landing/landing.module.css"

// Persona 5 battle-menu lettering: Jost for commands, condensed heavy Archivo for subtitles
const p5Cmd = Jost({ subsets: ["latin"], weight: ["800", "900"], variable: "--p5-cmd" })
const p5Sub = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--p5-sub" })

export const metadata: Metadata = {
  title: "RAJIT✦GOEL",
  description: "My work, experiments, and other rabbit holes I've gone down.",
}

const albums = [
  { image: "/icons/census-designated.png", artist: "Jane Remover", name: "Census Designated", href: "https://open.spotify.com/album/0rsCXQ9QyrLaTc2a5fvsZR" },
  { image: "/icons/the-fool.png", artist: "Bladee", name: "The Fool", href: "https://open.spotify.com/album/4n1tg05JN5EY0k7FRRcAir" },
  { image: "/icons/evangelic.png", artist: "yeule", name: "Evangelic Girl is a Gun", href: "https://open.spotify.com/album/0YYPOxN7WrWD3ygAP5KB50" },
]

export default function Home() {
  return (
    <div className={`${styles.site} ${p5Cmd.variable} ${p5Sub.variable}`}>
      <a href="#main" className={styles.skipLink}>skip to content</a>
      <SiteHeader />

      <main id="main" className={styles.main}>
        <section className={styles.hero} aria-labelledby="intro-title">
          <div className={styles.heroCopy}>

            <p className={styles.intro}>i make games, ai systems, and<br className={styles.desktopBreak} /> things you can play with.</p>
            <div className={styles.bio}>
              <p>i’m doing my mscs at <a href="https://www.gatech.edu/"><Image className={styles.bioLogo} src="/Georgia-Tech.png" alt="" width={19} height={19} />georgia tech</a>, focused on ai, mostly building tools that make other people’s work easier.</p>
              <p>lately that’s meant <a href="https://porukana.itch.io/sonarelive"><Image className={styles.bioLogo} src="/icons/sonare-mic.png" alt="" width={96} height={96} />a rhythm game you play with your hands</a>, <a href="https://github.com/Drakatoa/Project-Pawkour"><Image className={styles.bioLogo} src="/icons/pawkour-paw.png" alt="" width={96} height={96} />a cat that can wall-run</a>, and <a href="#experience"><Gamepad2 className={styles.bioSymbol} aria-hidden="true" />an rpg i can’t say much about yet</a>.</p>
              <p>before grad school: ai systems at <a href="https://www.samsung.com/us/"><Image className={styles.bioWide} src="/icons/samsung-oval.svg" alt="" width={1000} height={332} />samsung</a>, data science at <a href="https://www.cinemark.com/"><Image className={styles.bioLogo} src="/cinemarklogo.png" alt="" width={19} height={19} />cinemark</a>, and tax software at <a href="https://www.thomsonreuters.com/"><Image className={styles.bioLogo} src="/thomsonlogo.png" alt="" width={19} height={19} />thomson reuters</a>.</p>
              <p>otherwise: games, anime, <a href="#interests"><Disc3 className={styles.bioSymbol} aria-hidden="true" />music too loud</a>, and another creative tool i’ll definitely get around to learning!</p>
            </div>
            <div className={styles.sparkleRule} aria-hidden="true"><span /><Sparkle /><span /></div>
            <div className={styles.heroLinks}>
              <div className={styles.socials}>
                <a href="https://github.com/Drakatoa"><Github size={20} aria-hidden="true" /><span>github</span></a>
                <a href="https://linkedin.com/in/ragoel"><Linkedin size={19} aria-hidden="true" /><span>linkedin</span></a>
                <a href="mailto:ragoel123@gmail.com" aria-label="email Rajit"><Mail size={20} aria-hidden="true" /><span>email</span></a>
                <a href="/rajit-goel-cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="cv (PDF)"><FileText size={20} aria-hidden="true" /><span>cv</span></a>
              </div>
            </div>
          </div>
          <HeroMockFigure />
          <ScrollCue label="take a look around" />
        </section>

        <Projects />

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <div className={styles.funHeading}><h2 id="about-title">a little more about me.</h2><Sparkle className={styles.sparkle} /></div>
          <ul className={styles.aboutList}>
            <li>before georgia tech: cs + applied experience design at <a href="https://www.utdallas.edu/"><Image className={styles.bioLogo} src="/utdlogo.png" alt="" width={19} height={19} />ut dallas</a>.</li>
            <li id="experience">currently lead programmer on an unannounced action rpg at <a href="https://www.linkedin.com/company/abnormal-latte-studio-llc/"><Image className={styles.bioLogo} src="/icons/abnormal-latte.png" alt="" width={96} height={96} />abnormal latte</a>, building the narrative systems and the dialogue tools our writers use.</li>
            <li><a href="https://devpost.com/software/ideate-mratxn"><Image className={styles.bioLogo} src="/icons/ideate-mark.png" alt="" width={96} height={96} />ideate</a> picked up an <strong>honorable mention in the NVIDIA track</strong> at HackUTD 2025. <a href="https://devpost.com/software/ink-bound"><Image className={styles.bioLogo} src="/icons/appeara-icon.png" alt="" width={96} height={96} />appeara</a> placed <strong>top 10 in the Sentry track</strong> at Hack the North 2026.</li>
            <li>at utd: cs honors, a <a href="https://www.goldmansachs.com/"><Image className={styles.bioLogo} src="/icons/goldman-sachs.svg" alt="" width={64} height={64} /><strong>Goldman Sachs Excellence in Computer Science Scholarship</strong></a>, and a <a href="https://www.capitalone.com/"><Image className={styles.bioLogo} src="/icons/caponehook.png" alt="" width={1521} height={1350} /><strong>Capital One Scholarship in Applied Experience Design and Research</strong></a>.</li>
            <li>i also helped design <a href="/case-studies/utd-csa"><Image className={styles.bioLogo} src="/icons/csa-tiger.png" alt="" width={96} height={96} />a tiger riding a chili-oil bottle</a> that ended up on shirts bought by 200+ people. probably my most wearable work.</li>
            <li>the <a href="/rajit-goel-cv.pdf"><FileText className={styles.bioSymbol} aria-hidden="true" />cv</a> has the less abbreviated version.</li>
          </ul>
        </section>

        <section id="interests" className={styles.funStuff} aria-labelledby="interests-title">
          <div className={styles.funHeading}><h2 id="interests-title">fun stuff</h2><Sparkle className={styles.sparkle} /></div>
          <div className={styles.funColumns}>
            <div><h3>currently playing</h3>
              <div className={styles.gameShelf}>
                {[{image: "overwatch.png", name: "Overwatch 2", kind: "logo"}, {image: "destiny-tricorn.svg", name: "Destiny 2", kind: "logo"}, {image: "metaphor.png", name: "Metaphor: ReFantazio", kind: "art"}].map(game => <div key={game.name} className={styles.game}><span className={styles.gameTile} data-kind={game.kind}><Image src={`/icons/${game.image}`} alt="" width={400} height={400} sizes="(max-width: 760px) 30vw, 200px" /></span><span className={styles.gameName}>{game.name}</span></div>)}
              </div>
            </div>
            <div><h3>on repeat</h3><p className={styles.recordHint}>a few favorite albums. pull one out.</p>
              <div className={styles.recordShelf}>
                {albums.map((album) => <a className={styles.record} key={album.name} href={album.href} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${album.name} by ${album.artist}`}>
                  <span className={styles.recordArt}><span className={styles.vinyl} aria-hidden="true"><Image src={album.image} alt="" width={40} height={40} /><i /></span><Image className={styles.sleeve} src={album.image} alt={`${album.name} cover`} width={400} height={400} sizes="(max-width: 760px) 30vw, 200px" /></span>
                  <span className={styles.recordArtist}>{album.artist}</span><small>{album.name}</small>
                </a>)}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}

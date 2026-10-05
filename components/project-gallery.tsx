"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryImage } from "@/lib/project-gallery"
import styles from "./project-gallery.module.css"

// Tile grid plus a native <dialog> lightbox. The dialog handles Escape; we return focus to the tile.
export function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const tiles = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [opened, setOpened] = useState(false)
  const last = useRef(0)
  const many = images.length > 1
  const current = images[index]

  useEffect(() => {
    const root = document.documentElement
    if (opened) root.style.overflow = "hidden"
    return () => { root.style.overflow = "" }
  }, [opened])

  const open = (i: number) => {
    last.current = i
    setIndex(i)
    setOpened(true)
    dialog.current?.showModal()
  }
  const step = (d: number) => {
    const next = (index + d + images.length) % images.length
    last.current = next
    setIndex(next)
  }
  const onClose = () => {
    setOpened(false)
    tiles.current[last.current]?.focus()
  }

  return (
    <section className={styles.gallery} aria-label={`${title} gallery`}>
      <ul className={styles.grid}>
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              className={styles.tile}
              ref={(el) => { tiles.current[i] = el }}
              onClick={() => open(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
            >
              <Image src={image.src} alt="" fill sizes="(max-width: 760px) 50vw, 250px" className={styles.cover} />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={`${title} image viewer`}
        onClose={onClose}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close() }}
        onKeyDown={(e) => {
          if (!many) return
          if (e.key === "ArrowRight") { e.preventDefault(); step(1) }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1) }
        }}
      >
        {opened && current && (
          <figure className={styles.figure}>
            <div className={styles.stage}>
              <Image key={current.src} src={current.src} alt="" fill sizes="(max-width: 760px) 100vw, 1100px" className={styles.full} priority />
            </div>
            <figcaption className={styles.caption} aria-live="polite">
              <span>{current.alt}</span>
              <span className={styles.credit}>{index + 1} / {images.length}</span>
              <span className={styles.credit}>Credit: {current.credit}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className={`${styles.ctl} ${styles.close}`} aria-label="Close image viewer" onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button>
        {many && <button type="button" className={`${styles.ctl} ${styles.prev}`} aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft size={26} aria-hidden="true" /></button>}
        {many && <button type="button" className={`${styles.ctl} ${styles.next}`} aria-label="Next image" onClick={() => step(1)}><ChevronRight size={26} aria-hidden="true" /></button>}
      </dialog>
    </section>
  )
}

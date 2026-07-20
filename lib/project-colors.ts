// Shared project accent colors + helpers, used by the carousel slide and grid views.

export const getProjectColor = (projectTitle: string): string => {
  const title = projectTitle.toUpperCase()
  if (title.includes("PREFACE")) return "#70587C"
  if (title.includes("AEGIS")) return "#5AD0FF"
  if (title.includes("IDEATE")) return "#5870BC"
  if (title.includes("INCLUSION") || title.includes("DESIGN FOR INCLUSION") || title.includes("DEI")) return "#400C23"
  if (title.includes("ZENZ")) return "#EC76C3"
  if (title.includes("ARC")) return "#444549"
  if (title.includes("CSA") || title.includes("UTD")) return "#455668"
  if (title.includes("DELHI") || title.includes("OLYMPICS") || title.includes("NEW DELHI")) return "#FF6B35"
  if (title.includes("SONARE")) return "#39C5BB"
  if (title.includes("ARRESTOR")) return "#E8742C"
  if (title.includes("EUKARYA")) return "#6FBF73"
  return "rgba(255, 255, 255, 0.3)" // default
}

export const brightenColor = (color: string, amount: number = 0.3): string => {
  // Handle rgba colors
  if (color.startsWith("rgba")) {
    return color.replace(/rgba?\(([^)]+)\)/, (_, values) => {
      const [r, g, b, a = 1] = values.split(",").map((v: string) => parseFloat(v.trim()))
      const brighten = (val: number) => Math.min(255, val + (255 - val) * amount)
      return `rgba(${brighten(r)}, ${brighten(g)}, ${brighten(b)}, ${a})`
    })
  }

  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.slice(1)
    const num = parseInt(hex, 16)
    const r = Math.min(255, ((num >> 16) & 0xff) + Math.floor((255 - ((num >> 16) & 0xff)) * amount))
    const g = Math.min(255, ((num >> 8) & 0xff) + Math.floor((255 - ((num >> 8) & 0xff)) * amount))
    const b = Math.min(255, (num & 0xff) + Math.floor((255 - (num & 0xff)) * amount))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
  }

  return color
}

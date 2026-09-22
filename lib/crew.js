export const crewGroups = [
  {
    id: "coreTeam",
    members: [
      { image: "malloy.png", name: "Malloy", role: "Project Creator, Owner", href: "https://malloy.vercel.app/" },
      { image: "britex.png", name: "Britex", role: "Project Lead, Owner", href: "https://x.com/ImBritex" },
    ],
  },
  {
    id: "development",
    members: [
      { image: "ryu-magucci.png", name: "Ryu MaGucci", role: "Developer", href: "https://x.com/NotMaGucci" },
      { image: "anderei.png", name: "Anderei", role: "Developer" },
      { image: "trecker.png", name: "Trecker", role: "Developer, Tester", href: "https://youtube.com/@treckeruwu" },
      { image: "ghino-rhino.png", name: "GhinoRhino", role: "Original Developer (pre-rewrite)" },
    ],
  },
  {
    id: "creative",
    members: [
      { image: "kemusaku.png", name: "Kemusaku", role: "UI Developer" },
      { image: "criscris.png", name: "Cricris", role: "UI Developer" },
      { image: "mrwarlindev.png", name: "MrWarlinDev", role: "Artist" },
      { image: "dvyn.png", name: "Dvyn", role: "Banner Artist", href: "https://www.youtube.com/channel/UCc6-8LAueIeFJwVtmOn2Oug" },
      { image: "arcad3zz.png", name: "Arcad3zz", role: "Loading Screen Artist", href: "https://x.com/Arcad3zz" },
    ],
  },
  {
    id: "voiceActing",
    members: [
      { image: "contentleaf.png", name: "ContentLeaf", role: "Boyfriend Voice Actor" },
      { image: "shhybunnz.png", name: "shhybunnz", role: "Girlfriend Voice Actor" },
    ],
  },
  {
    id: "communitySupport",
    members: [
      { image: "nezumieepy.png", name: "Nezumieepy", role: "Secondary Social Media Manager" },
      { image: "aubree.png", name: "Aubree", role: "Support" },
      { image: "saturdaynightmodding21.png", name: "SaturdayNightModding21", role: "Support", href: "https://x.com/snm21_fnf" },
    ],
  },
  {
    id: "localization",
    members: [
      { image: "raupy.png", name: "Raupy1.0", role: "German", href: "https://github.com/Raupy10" },
      { image: "trofem.png", name: "Trofem", role: "Russian", href: "https://github.com/Trofem" },
      { image: "lea.png", name: "LéaNimatics", role: "French", href: "https://leanimatics.carrd.co/" },
      { image: "merssak.png", name: "Merssak", role: "Polish" },
      { image: "cynthia.png", name: "墨玲_morlin", role: "Chinese", href: "https://space.bilibili.com/3546621581199764" },
      { image: "karusoda.png", name: "KaruSoda", role: "Brazilian Portuguese", href: "https://linktr.ee/KaruSoda" },
      { image: "oyachi.png", name: "Oyachi / Shinjou", role: "Brazilian Portuguese", href: "https://github.com/KittyCat300700" },
      { image: "sirthegamercoder.png", name: "sirthegamercoder", role: "Indonesian", href: "https://bsky.app/profile/stgmd.bsky.social" },
      { image: "sarahvista.png", name: "SarahVista", role: "Italian", href: "https://x.com/SarahVista_" },
    ],
  },
  {
    id: "testing",
    members: [
      { image: "trecker.png", name: "Trecker", role: "Tester", href: "https://youtube.com/@treckeruwu" },
      { image: "jibalex.png", name: "Jibalex", role: "Debug Tester" },
      { image: "luminercy.png", name: "Luminercy", role: "Beta Tester", href: "https://www.youtube.com/channel/UCXY-FHb2aGfI2Pd5rtnWvhw" },
      { image: "noah.png", name: "noahwrshkhy", role: "Beta Tester" },
      { image: "maskiu.png", name: "JustMaskiu", role: "Beta Tester", href: "https://www.youtube.com/channel/UCbJYJQJQwZ3kGPUYM3uwzHg" },
    ],
  },
];

export const crewMembers = crewGroups.flatMap((group) => group.members);

export const crewGroups = [
  {
    id: "core-team",
    title: "Core team",
    members: [
      {
        image: "malloy.png",
        name: "Malloy",
        role: "Lead developer",
        href: "https://malloy.vercel.app/",
      },
      {
        image: "britex.png",
        name: "Britex",
        role: "Project owner",
        href: "https://x.com/ImBritex",
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    members: [
      {
        image: "ryu-magucci.png",
        name: "Ryu MaGucci",
        role: "Developer",
        href: "https://x.com/NotMaGucci",
      },
      {
        image: "trecker.png",
        name: "Trecker",
        role: "Developer",
        href: "https://youtube.com/@treckeruwu",
      },
    ],
  },
  {
    id: "creative",
    title: "Art & design",
    members: [
      { image: "criscris.png", name: "Cricris", role: "UI Artist" },
      {
        image: "dvyn.png",
        name: "Dvyn",
        role: "Banner Artist",
        href: "https://www.youtube.com/channel/UCc6-8LAueIeFJwVtmOn2Oug",
      },
      {
        image: "arcad3zz.png",
        name: "Arcad3zz",
        role: "Loading screen art",
        href: "https://x.com/Arcad3zz",
      },
    ],
  },
  {
    id: "localization",
    title: "Localization",
    members: [
      {
        image: "raupy.png",
        name: "Raupy1.0",
        role: "German translation",
        href: "https://github.com/Raupy10",
      },
      {
        image: "trofem.png",
        name: "Trofem",
        role: "Russian translation",
      },
      {
        image: "lea.png",
        name: "LéaNimatics",
        role: "French translation",
        href: "https://leanimatics.carrd.co/",
      },
      {
        image: "karusoda.png",
        name: "KaruSoda",
        role: "Brazilian Portuguese translation",
        href: "https://linktr.ee/KaruSoda",
      },
      {
        image: "sirthegamercoder.png",
        name: "sirthegamercoder",
        role: "Indonesian translation · Discord profile design",
        href: "https://bsky.app/profile/stgmd.bsky.social",
      },
      {
        image: "sarahvista.png",
        name: "SarahVista",
        role: "Italian translation",
        href: "https://x.com/SarahVista_",
      },
      {
        image: "oyachi.png",
        name: "Oyachi / Shinjou",
        role: "Brazilian Portuguese translation",
        href: "https://github.com/KittyCat300700",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    members: [
      {
        image: "nezumieepy.png",
        name: "Nezumieepy",
        role: "Linux testing",
        href: "https://nezumieepy.straw.page/",
      },
      {
        image: "luminercy.png",
        name: "Luminercy",
        role: "Beta testing",
        href: "https://www.youtube.com/channel/UCXY-FHb2aGfI2Pd5rtnWvhw",
      },
      {
        image: "saturdaynightmodding21.png",
        name: "SaturdayNightModding21",
        role: "macOS testing",
        href: "https://x.com/snm21_fnf",
      },
      { image: "noah.png", name: "noahwrshkhy", role: "Beta testing" },
      {
        image: "maskiu.png",
        name: "JustMaskiu",
        role: "Beta testing",
        href: "https://x.com/JustMaskiu",
      },
    ],
  },
];

export const crewMembers = crewGroups.flatMap((group) => group.members);

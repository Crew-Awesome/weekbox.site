export const crewGroups = [
  {
    id: "core-team",
    title: "Core team",
    members: [
      {
        image: "malloy.png",
        name: "Malloy",
        role: "Main Owner and Coder",
        href: "https://malloy.vercel.app/",
      },
      {
        image: "britex.png",
        name: "Britex",
        role: "Owner",
        href: "https://x.com/ImBritex",
      },
    ],
  },
  {
    id: "creative",
    title: "Creative",
    members: [
      { image: "criscris.png", name: "Cricris", role: "UI Artist" },
      {
        image: "dvyn.png",
        name: "Dvyn",
        role: "Banner Artist",
        href: "https://www.youtube.com/channel/UCc6-8LAueIeFJwVtmOn2Oug",
      },
    ],
  },
  {
    id: "translation",
    title: "Translation",
    members: [
      {
        image: "raupy.png",
        name: "Raupy1.0",
        role: "German Translator",
        href: "https://github.com/Raupy10",
      },
      {
        image: "leonardo.png",
        name: "leonardo wegner",
        role: "Portuguese Translator",
        href: "https://www.youtube.com/channel/UC2R-vsUD9JqPxfCajM2scHQ",
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
        role: "Linux Tester",
        href: "https://nezumieepy.straw.page/",
      },
      {
        image: "luminercy.png",
        name: "Luminercy",
        role: "Beta Tester",
        href: "https://www.youtube.com/channel/UCXY-FHb2aGfI2Pd5rtnWvhw",
      },
      {
        image: "saturdaynightmodding21.png",
        name: "SaturdayNightModding21",
        role: "Beta Tester",
      },
      { image: "noah.png", name: "noahwrshkhy", role: "Beta Tester" },
      {
        image: "maskiu.png",
        name: "JustMaskiu",
        role: "Beta Tester",
        href: "https://x.com/JustMaskiu",
      },
    ],
  },
  {
    id: "dedication",
    title: "Special dedication",
    members: [
      {
        image: "oyachi.png",
        name: "Oyachi",
        role: "I love you silly :3",
        href: "https://x.com/itsalwayshinjou",
      },
    ],
  },
];

export const crewMembers = crewGroups
  .filter((group) => group.id !== "dedication")
  .flatMap((group) => group.members);

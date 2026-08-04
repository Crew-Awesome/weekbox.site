import Link from "next/link";

export const metadata = {
  title: "Credits | Weekbox",
  description: "Meet the WeekBox crew.",
};

const asset = (path) => `/assets/images/${path}`;

function Box({ title, children }) {
  return (
    <section className="box credits-box">
      <div className="box__header">{title}</div>
      <div className="box__content">{children}</div>
    </section>
  );
}

function Person({ image, name, role, href }) {
  const content = (
    <>
      <img
        src={asset(`awesome-crew/${image}`)}
        alt={name}
        className="credits-person__avatar"
        draggable="false"
      />
      <span className="credits-person__info">
        <span className="credits-person__name">{name}</span>
        <span className="credits-person__role">{role}</span>
      </span>
    </>
  );

  return href ? (
    <a
      className="credits-person credits-person--link"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="credits-person">{content}</div>
  );
}

export default function CreditsPage() {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <img
          src={asset("banner.webp")}
          alt="Weekbox Banner"
          className="layout-header__logo"
          draggable="false"
        />
      </header>
      <nav className="layout-nav" aria-label="Main navigation">
        <Link href="/" className="layout-nav__link">
          Home
        </Link>{" "}
        |{" "}
        <Link href="/news" className="layout-nav__link">
          News
        </Link>{" "}
        |{" "}
        <Link href="/downloads" className="layout-nav__link">
          Downloads
        </Link>{" "}
        |{" "}
        <Link href="/credits" className="layout-nav__link" aria-current="page">
          Credits
        </Link>{" "}
        |{" "}
        <a
          href="https://github.com/Crew-Awesome/Weekbox"
          target="_blank"
          rel="noreferrer"
          className="layout-nav__link"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://discord.gg/xQTtYF2Cfn"
          target="_blank"
          rel="noreferrer"
          className="layout-nav__link"
        >
          Discord
        </a>
      </nav>

      <main className="layout-content-wrapper credits-layout">
        <div className="layout-main credits-main">
          <div className="credits-grid">
            <Box title="WeekBox Crew">
              <div className="credits-groups">
                <section className="credits-group" aria-labelledby="credits-core-team">
                  <h2 className="credits-group__title" id="credits-core-team">
                    Core team
                  </h2>
                  <div className="credits-people">
                    <Person
                      image="malloy.png"
                      name="Malloy"
                      role="Main Owner and Coder"
                      href="https://malloy.vercel.app/"
                    />
                    <Person
                      image="britex.png"
                      name="Britex"
                      role="Owner"
                      href="https://x.com/ImBritex"
                    />
                  </div>
                </section>

                <section className="credits-group" aria-labelledby="credits-creative">
                  <h2 className="credits-group__title" id="credits-creative">
                    Creative
                  </h2>
                  <div className="credits-people">
                    <Person image="criscris.png" name="Cricris" role="UI Artist" />
                    <Person
                      image="dvyn.png"
                      name="Dvyn"
                      role="Banner Artist"
                      href="https://www.youtube.com/channel/UCc6-8LAueIeFJwVtmOn2Oug"
                    />
                  </div>
                </section>

                <section className="credits-group" aria-labelledby="credits-translation">
                  <h2 className="credits-group__title" id="credits-translation">
                    Translation
                  </h2>
                  <div className="credits-people">
                    <Person
                      image="raupy.png"
                      name="Raupy1.0"
                      role="German Translator"
                      href="https://github.com/Raupy10"
                    />
                    <Person
                      image="leonardo.png"
                      name="leonardo wegner"
                      role="Portuguese Translator"
                      href="https://www.youtube.com/channel/UC2R-vsUD9JqPxfCajM2scHQ"
                    />
                  </div>
                </section>

                <section className="credits-group" aria-labelledby="credits-testing">
                  <h2 className="credits-group__title" id="credits-testing">
                    Testing
                  </h2>
                  <div className="credits-people">
                    <Person
                      image="nezumieepy.png"
                      name="Nezumieepy"
                      role="Linux Tester"
                      href="https://nezumieepy.straw.page/"
                    />
                    <Person
                      image="luminercy.png"
                      name="Luminercy"
                      role="Beta Tester"
                      href="https://www.youtube.com/channel/UCXY-FHb2aGfI2Pd5rtnWvhw"
                    />
                    <Person
                      image="saturdaynightmodding21.png"
                      name="SaturdayNightModding21"
                      role="Beta Tester"
                    />
                    <Person image="noah.png" name="noahwrshkhy" role="Beta Tester" />
                  </div>
                </section>
              </div>
            </Box>
          </div>
        </div>
      </main>

      <footer className="layout-footer">
        <p className="layout-footer__text">Copyright © 2024 Awesome Crew. All rights reserved.</p>
        <p className="layout-footer__disclaimer">
          Weekbox is not related to or affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.
        </p>
      </footer>
    </div>
  );
}

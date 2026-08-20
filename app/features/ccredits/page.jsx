import { crewGroups } from "../../../lib/crew";

export const metadata = {
  title: "Credits | Weekbox",
  description: "Meet the WeekBox crew.",
};

const asset = (path) => `/assets/images/${path}`;

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
    <a className="credits-person credits-person--link" href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className="credits-person">{content}</div>
  );
}

export default function CreditsPage() {
  return (
    <div className="site-page credits-page">
      <section className="box credits-box">
        <div className="box__header">Contributors</div>
        <div className="box__content">
          <div className="credits-groups">
            {crewGroups.map((group) => (
              <section className="credits-group" aria-labelledby={`credits-${group.id}`} key={group.id}>
                <h2 className="credits-group__title" id={`credits-${group.id}`}>
                  {group.title}
                </h2>
                <div className={`credits-people${group.members.length === 1 ? " credits-people--single" : ""}`}>
                  {group.members.map((member) => <Person key={member.name} {...member} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

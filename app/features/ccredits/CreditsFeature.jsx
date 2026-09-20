'use client';

import { crewGroups } from "../../../lib/crew";
import { useTranslation } from "react-i18next";
import { sitePath } from "../../../lib/site-path";

const asset = (path) => sitePath(`/assets/images/${path}`);

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

export default function CreditsFeature() {
  const { t } = useTranslation();

  return (
    <div className="layout-content-wrapper credits-layout">
      <div className="layout-main credits-main">
        <div className="credits-grid">
          <section className="box credits-box">
            <div className="box__header">{t('credits.contributorsTitle')}</div>
            <div className="box__content">
              <div className="credits-groups">
                {crewGroups.map((group) => (
                  <section className="credits-group" aria-labelledby={`credits-${group.id}`} key={group.id}>
                    <h2 className="credits-group__title" id={`credits-${group.id}`}>
                      {t(`credits.${group.id}Title`)}
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
      </div>
    </div>
  );
}

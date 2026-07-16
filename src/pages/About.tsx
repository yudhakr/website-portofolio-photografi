import { buildSrcSet, sizedSrc } from "../utils/image";
import { useReveal } from "../utils/hooks";
import { useContent } from "../context/ContentContext";
import "./About.css";

export default function About() {
  const { content } = useContent();
  const site = content.site;
  const about = content.about;
  const bio = useReveal<HTMLDivElement>();
  const phil = useReveal<HTMLDivElement>();
  const gearRef = useReveal<HTMLDivElement>();
  const awardRef = useReveal<HTMLDivElement>();

  return (
    <div className="page about">
      {/* Intro */}
      <section className="wrap about__intro">
        <div className="about__portrait">
          <img
            src={sizedSrc(about.portrait, 1200)}
            srcSet={buildSrcSet(about.portrait)}
            sizes="(max-width: 900px) 100vw, 45vw"
            alt={`${site.name}, photographer`}
            loading="eager"
          />
        </div>
        <div className="about__lede">
          <p className="eyebrow">About — {site.name}</p>
          <h1 className="display about__title">{about.title}</h1>
          <p className="about__sub">{about.sub}</p>
        </div>
      </section>

      {/* Bio story */}
      <section className="wrap section about__story reveal" ref={bio}>
        <span className="eyebrow about__label">The story</span>
        <div className="about__prose">
          {about.storyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="wrap about__clients">
        <span className="eyebrow">Selected clients & press</span>
        <div className="about__logos">
          {about.clients.map((c) => (
            <span key={c} className="about__logo">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="about__phil reveal" ref={phil}>
        <div className="wrap">
          <blockquote className="display about__quote">
            &ldquo;{about.quote}&rdquo;
          </blockquote>
          <cite className="about__cite">— {site.name}</cite>
        </div>
      </section>

      {/* Awards + Gear */}
      <section className="wrap section about__grid">
        <div className="about__awards reveal" ref={awardRef}>
          <span className="eyebrow about__label">Awards & publications</span>
          <ul className="about__awardlist">
            {about.awards.map((a, i) => (
              <li key={i}>
                <span className="about__awardyear">{a.year}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__gear reveal" ref={gearRef}>
          <span className="eyebrow about__label">In the bag</span>
          <div className="about__gearcols">
            {about.gear.map((g) => (
              <div key={g.group} className="about__gearcol">
                <h4>{g.group}</h4>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

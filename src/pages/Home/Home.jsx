// React import not required with modern JSX transform
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import InteractiveBackground from "../../components/InteractiveBackground";

export default function Home() {
  return (
    <div className={styles.page}>
      <InteractiveBackground />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Hi — I build useful products.</h1>
            <p className={styles.lead}>
              I&#39;m Prakhar Agrawal — a Machine Learning &amp; Full-stack developer who
              builds reliable, maintainable web apps and ML prototypes. I focus on
              clean code, simple UX and measurable results.
            </p>
            <div className={styles.socials}>
              <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:you@example.com">Email</a>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}><strong>6</strong><span>Projects</span></div>
              <div className={styles.stat}><strong>2</strong><span>Internships</span></div>
              <div className={styles.stat}><strong>3</strong><span>Languages</span></div>
            </div>
            <div className={styles.ctaRow}>
              <Link to="/projects" className={styles.ctaPrimary}>
                View Projects
              </Link>
              <Link to="/contact" className={styles.ctaGhost}>
                Get in touch
              </Link>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <img
              src="/src/assets/images/hero.jpg"
              alt="hero"
              className={`${styles.heroImg} ${styles.enterUp}`}
            />
          </div>
        </div>
      </header>

      <section className={`${styles.section} ${styles.featureSection}`}>
        <h2 className={styles.sectionTitle}>Featured project</h2>
        <div className={styles.featuredCard}>
          <div className={styles.featureMedia}>
            <img src="/src/assets/images/hero.jpg" alt="featured" />
          </div>
          <div className={styles.featureBody}>
            <h3>FarmWise — Soil Nutrient Predictor</h3>
            <p>
              Deployed ML model as a Flask API, integrated with a React frontend. Uses
              data pipelines for preprocessing and a lightweight CNN for feature extraction.
            </p>
            <div className={styles.featureLinks}>
              <Link to="/projects" className={styles.cardLink}>Read more</Link>
              <a href="#" className={styles.cardLink}>Live</a>
            </div>
          </div>
        </div>
      </section>

  <section className={`${styles.section} ${styles.enterUpDelay}`}>
        <h2 className={styles.sectionTitle}>Selected skills</h2>
        <ul className={styles.skillsGrid}>
          <li className={styles.skill}>Python</li>
          <li className={styles.skill}>PyTorch / TensorFlow</li>
          <li className={styles.skill}>scikit-learn</li>
          <li className={styles.skill}>React</li>
          <li className={styles.skill}>Node.js</li>
          <li className={styles.skill}>SQL & NoSQL</li>
        </ul>
      </section>

  <section className={`${styles.sectionAlt} ${styles.enterUpDelayLong}`}>
        <h2 className={styles.sectionTitle}>Featured work</h2>
        <div className={styles.cards}>
          <article className={styles.card}>
            <h3>Movie Reservation System</h3>
            <p className={styles.cardText}>
              Full-stack booking system with payments, caching and seat locking.
            </p>
            <Link to="/projects" className={styles.cardLink}>
              Read more
            </Link>
          </article>

          <article className={styles.card}>
            <h3>FarmWise — Soil Nutrient Predictor</h3>
            <p className={styles.cardText}>
              ML model deployed as a Flask web service for live predictions.
            </p>
            <Link to="/projects" className={styles.cardLink}>
              Read more
            </Link>
          </article>

          <article className={styles.card}>
            <h3>Age & Gender Predictor</h3>
            <p className={styles.cardText}>
              Real-time CV demo using OpenCV and a compact CNN.
            </p>
            <Link to="/projects" className={styles.cardLink}>
              Read more
            </Link>
          </article>
        </div>
      </section>

  <section className={`${styles.section} ${styles.enterUpDelay}` }>
        <h2 className={styles.sectionTitle}>What people say</h2>
        <div className={styles.testimonials}>
          <blockquote className={styles.testimonial}>
            <p>
              &quot;Prakhar delivered a production-ready ML prototype on time and
              communicated every step clearly. Highly recommend.&quot;
            </p>
            <cite>— Project Lead</cite>
          </blockquote>

          <blockquote className={styles.testimonial}>
            <p>
              &quot;Great attention to detail and strong engineering discipline — the
              codebase was a pleasure to work with.&quot;
            </p>
            <cite>— Engineering Manager</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
}

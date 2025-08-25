// React import not required with modern JSX transform
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import InteractiveBackground from "../../components/InteractiveBackground";
import heroImg from "../../assets/images/hero.jpg";
import { motion } from "framer-motion";
import GitHubSVG from "../../assets/icons/github.svg";
import LinkedSVG from "../../assets/icons/linkedin.svg";
import MailSVG from "../../assets/icons/mail.svg";
import SkillCloud from "../../components/SkillCloud";

export default function Home() {
  return (
    <div className={styles.page}>
      <InteractiveBackground />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
            >
              Hi — I build useful products.
            </motion.h1>

            <motion.p
              className={styles.lead}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              I&#39;m Prakhar Agrawal — a Machine Learning &amp; Full-stack developer who
              builds reliable, maintainable web apps and ML prototypes. I focus on
              clean code, simple UX and measurable results.
            </motion.p>

            <motion.div
              className={styles.socials}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              <a href="https://github.com/prakharagrawal10" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.socialGit}`} aria-label="GitHub">
                <img src={GitHubSVG} alt="github" className={styles.socialSvg} />
              </a>
              <a href="https://www.linkedin.com/in/prakhar-agrawal-625398286" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.socialLinked}`} aria-label="LinkedIn">
                <img src={LinkedSVG} alt="linkedin" className={styles.socialSvg} />
              </a>
              <a href="mailto:prakhar.agra10@gmail.com" className={`${styles.socialIcon} ${styles.socialMail}`} aria-label="Email">
                <img src={MailSVG} alt="email" className={styles.socialSvg} />
              </a>
            </motion.div>

            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              <div className={styles.stat}><strong>10+</strong><span>Projects</span></div>
              <div className={styles.stat}><strong>2</strong><span>Internships</span></div>
            </motion.div>

            <motion.div
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.5 }}
            >
              <Link to="/projects" className={styles.ctaPrimary}>
                View Projects
              </Link>
              <Link to="/contact" className={styles.ctaGhost}>
                Get in touch
              </Link>
            </motion.div>
            <div className={styles.skillLeftWrap}>
              <SkillCloud />
            </div>
          </div>

          <div className={styles.heroMedia}>
            <motion.img
              src={heroImg}
              alt="hero"
              className={`${styles.heroImg}`}
              initial={{ opacity: 0, y: 18, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
            />
          </div>
        </div>
      </header>

      <section className={`${styles.section} ${styles.featureSection}`}>
        <h2 className={styles.sectionTitle}>Featured project</h2>
        <div className={styles.featuredCard}>
          <div className={styles.featureMedia}>
          <img src={heroImg} alt="featured" />
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

  <section className={`${styles.section} ${styles.highlightsSection}`}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <div className={styles.highlightsGrid}>
          <div className={styles.highlightCard}>
            <h4>Production ML Prototype</h4>
            <p>Delivered a model integrated with a React frontend and Flask API.</p>
          </div>
          <div className={styles.highlightCard}>
            <h4>Scalable APIs</h4>
            <p>Designed REST APIs with caching and rate limiting for real-world load.</p>
          </div>
          <div className={styles.highlightCard}>
            <h4>Data Pipelines</h4>
            <p>Built ETL pipelines for feature extraction and model training workflows.</p>
          </div>
          <div className={styles.highlightCard}>
            <h4>Realtime Demos</h4>
            <p>Computer-vision demos with OpenCV and lightweight CNNs for fast inference.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.techSection}`}>
        <h2 className={styles.sectionTitle}>Tech stack</h2>
        <div className={styles.techRow}>
          <span className={styles.techBadge}>Python</span>
          <span className={styles.techBadge}>PyTorch</span>
          <span className={styles.techBadge}>TensorFlow</span>
          <span className={styles.techBadge}>React</span>
          <span className={styles.techBadge}>Node.js</span>
          <span className={styles.techBadge}>Docker</span>
          <span className={styles.techBadge}>SQL</span>
        </div>
      </section>

      <section className={`${styles.sectionAlt} ${styles.ctaBanner}`}>
        <div className={styles.ctaInner}>
          <div>
            <h3>Ready to build something together?</h3>
            <p className={styles.cardText}>I build production-ready ML and web apps — let’s talk about your idea.</p>
          </div>
          <div>
            <Link to="/contact" className={styles.ctaPrimary}>Contact me</Link>
          </div>
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

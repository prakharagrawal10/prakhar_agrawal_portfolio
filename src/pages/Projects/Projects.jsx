import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

const projects = [
  {
    title: "Movie Reservation System",
    description:
      "MongoDB, Express.js, React.js, Node.js, Redis, Stripe, Clerk, Docker — Developed a full-stack movie booking platform with REST APIs; implemented secure authentication (JWT & Clerk), integrated Stripe for payments, used Redis for session caching and real-time seat locking to ensure booking consistency; Dockerized the backend and followed clean architecture principles.",
    src: "movie-reservation.jpg",
    link: "",
    color: "#00ADB5",
    githubLink: "https://github.com/your-github/movie-reservation",
    liveLink: "",
  },
  {
    title: "FarmWise — AI-Powered Soil Nutrient Predictor",
    description:
      "Python, Flask, TensorFlow — Web-based ML app that predicts soil nutrients to help farmers optimize crop yields (Devsoc 2024 Hackathon). Trained models (RandomForestRegressor, DecisionTreeClassifier) achieving ~92% accuracy on agricultural data; served TensorFlow models via Flask for real-time predictions.",
    src: "farmwise.jpg",
    link: "",
    color: "#2ECC71",
    githubLink: "https://github.com/your-github/farmwise",
    liveLink: "",
  },
  {
    title: "AI-ML Real-time Age & Gender Prediction",
    description:
      "Python, TensorFlow, Keras, OpenCV — Real-time computer vision system to predict age and gender from live camera feeds using a custom-trained CNN; trained on 24,000+ labeled images and optimized using MAE; integrated with OpenCV for live inference.",
    src: "age-gender.jpg",
    link: "",
    color: "#F39C12",
    githubLink: "https://github.com/your-github/age-gender-prediction",
    liveLink: "",
  },
  {
    title: "Hostel Cleaning Website",
    description:
      "Django/Flask, HTML, CSS, JS, SQLite — Full-stack platform for managing hostel cleaning schedules and requests. Features include student cleaning requests, admin task assignment and tracking, authentication, and task management.",
    src: "hostel-cleaning.jpg",
    link: "",
    color: "#8E44AD",
    githubLink: "https://github.com/your-github/hostel-cleaning",
    liveLink: "",
  },
  {
    title: "Food Delivery Website",
    description:
      "MERN, JWT Auth — Full-stack food ordering platform with restaurant listings, menu browsing, cart, checkout, order tracking, and owner dashboard.",
    src: "food-delivery.jpg",
    link: "",
    color: "#E74C3C",
    githubLink: "https://github.com/your-github/food-delivery",
    liveLink: "",
  },
  {
    title: "Digit Classifier",
    description:
      "Python, TensorFlow/Keras — CNN-based handwritten digit recognition using MNIST. Implemented preprocessing, trained a robust CNN and evaluated performance on unseen data.",
    src: "digit-classifier.jpg",
    link: "",
    color: "#3498DB",
    githubLink: "https://github.com/your-github/digit-classifier",
    liveLink: "",
  },
  {
    title: "AI-Based Traffic Management (Ongoing)",
    description:
      "Python, Google Maps API, TensorFlow (planned), OpenCV (planned) — Designing an AI-driven traffic control system for congestion management with planned features like adaptive traffic lights, priority routing for emergency/VIP vehicles, and incident detection via CCTV.",
    src: "traffic-management.jpg",
    link: "",
    color: "#16A085",
    githubLink: "https://github.com/your-github/traffic-management",
    liveLink: "",
  },
  {
    title: "YouTube Spam Classifier",
    description:
      "Python, Scikit-learn, NLTK — NLP pipeline to classify YouTube comments as spam or not; includes tokenization, stopword removal, TF-IDF vectorization, and model comparison (Logistic Regression, Naive Bayes).",
    src: "youtube-spam.jpg",
    link: "",
    color: "#9B59B6",
    githubLink: "https://github.com/your-github/youtube-spam-classifier",
    liveLink: "",
  },
  {
    title: "SQL LLM App",
    description:
      "Python, OpenAI API, Flask — AI app that converts natural language to SQL statements using an LLM API and executes them against sample databases to allow non-technical users to query data.",
    src: "sql-llm.jpg",
    link: "",
    color: "#34495E",
    githubLink: "https://github.com/your-github/sql-llm-app",
    liveLink: "",
  },
  {
    title: "Medical Chatbot",
    description:
      "Python, OpenAI API, Flask — Medical chatbot handling basic health queries using LLMs/NLP for understanding and knowledge retrieval; supports context retention and conversational flows.",
    src: "medical-chatbot.jpg",
    link: "",
    color: "#27AE60",
    githubLink: "https://github.com/your-github/medical-chatbot",
    liveLink: "",
  },
];

function Projects() {
  // Use the global viewport scroll progress from framer-motion.
  // ReactLenis (virtual scroll) can interfere with this — using native viewport scroll ensures useScroll updates.
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-20">
        {projects.map((p, i) => (
          <Card
            key={p.title}
            i={i}
            title={p.title}
            description={p.description}
            url={p.link || p.src}
            color={p.color}
            progress={scrollYProgress}
            range={[i / projects.length, (i + 1) / projects.length]}
            targetScale={0.98}
            githubLink={p.githubLink}
            liveLink={p.liveLink}
          />
        ))}
      </section>
    </main>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>
            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />
              <div className="flex items-center gap-4">
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Code
                  </span>
                </motion.a>
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Live
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object,
  range: PropTypes.array,
  targetScale: PropTypes.number,
  githubLink: PropTypes.string,
  liveLink: PropTypes.string,
};

export default Projects;

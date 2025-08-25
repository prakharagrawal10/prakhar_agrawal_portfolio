import HeroImg from "@/assets/images/hero.jpg";
// CertificateIcon removed; using ML specialization text instead
export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32 text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Full-Stack Developer, React Specialist, Problem Solver
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="developer illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hey there! I&apos;m Prakhar Agrawal - a React.js-focused full-stack
                developer passionate about building scalable and intuitive web
                applications. I&apos;m driven by a desire to simplify complex
                problems through clean UI and efficient backend logic.
              </p>
              <p className="text-white">
                  With hands-on experience in React, MongoDB, Express, and
                  Node.js, I&apos;ve worked on real-world projects like an IPO web
                application during my internship at Bluestock. I love
                transforming Figma designs into pixel-perfect interfaces and
                writing maintainable, production-ready code.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I&apos;ve solved 350+ DSA problems, specialize in Machine
                    Learning techniques and practical model deployment, and
                    actively contribute to open source. I&apos;m a creative
                    thinker who enjoys working on high-impact projects and
                    continuously learning new technologies.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Prakhar Agrawal — Machine Learning & MERN Developer
                    </cite>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

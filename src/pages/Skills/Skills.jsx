import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import { BsGrid1X2 } from "react-icons/bs";

import {
  Code2,
  Paintbrush,
  Database,
  Layout,
  Cpu,
  Cloud,
  Book,
} from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostman,
  SiMongodb,
  SiVite,
  SiRedux,
  SiFirebase,
  SiMysql,
  SiEjs,
  SiFramer,
  SiMongoose,
  SiNetlify,
  SiJest,
  SiVercel,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGithub, BsBootstrap } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <Card className="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        {
          name: "HTML",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-orange-500" />,
        },
        {
          name: "CSS",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-blue-500" />,
        },
        {
          name: "JavaScript",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-yellow-400" />,
        },
        {
          name: "React.js",
          icon: <FaReact className="w-4 h-4 text-[#61DAFB]" />,
        },
        {
          name: "Bootstrap",
          icon: <BsBootstrap className="w-4 h-4 text-[#7952B3]" />,
        },
        { name: "EJS", icon: <SiEjs className="w-4 h-4 text-yellow-500" /> },
      ],
    },
    {
      icon: Database,
      title: "Backend & Databases",
      color: "text-green-400",
      skills: [
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4 text-[#3C873A]" />,
        },
        {
          name: "Express.js",
          icon: <SiVite className="w-4 h-4 text-[#000000]" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="w-4 h-4 text-[#47A248]" />,
        },
        {
          name: "Mongoose",
          icon: <SiMongoose className="w-4 h-4 text-[#800000]" />,
        },
        { name: "MySQL", icon: <SiMysql className="w-4 h-4 text-[#00758F]" /> },
        {
          name: "REST APIs",
          icon: <SiPostman className="w-4 h-4 text-orange-500" />,
        },
      ],
    },
    {
      icon: Cloud,
      title: "Machine Learning",
      color: "text-indigo-400",
      skills: [
        { name: "Machine Learning", icon: <Code2 className="w-4 h-4 text-white" /> },
        { name: "PyTorch", icon: <Code2 className="w-4 h-4 text-white" /> },
        { name: "TensorFlow", icon: <Code2 className="w-4 h-4 text-white" /> },
        { name: "scikit-learn", icon: <Code2 className="w-4 h-4 text-white" /> },
      ],
    },
    {
      icon: Cpu,
      title: "Tools & Platforms",
      color: "text-pink-400",
      skills: [
        {
          name: "VS Code",
          icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
        },
        { name: "GitHub", icon: <BsGithub className="w-4 h-4 text-white" /> },
        {
          name: "Netlify",
          icon: <SiNetlify className="w-4 h-4 text-[#00C7B7]" />,
        },
        { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
        {
          name: "Postman",
          icon: <SiPostman className="w-4 h-4 text-orange-500" />,
        },
        {
          name: "Railway",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 100 100"
              fill="#9A66FF"
            >
              <path d="M50 10L90 90H10L50 10Z" />
            </svg>
          ),
        },
        {
          name: "Render",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 100 100"
              fill="#0099FF"
            >
              <rect x="20" y="20" width="60" height="60" rx="10" />
            </svg>
          ),
        },
      ],
    },

    {
      icon: Paintbrush,
      title: "Soft Skills & Traits",
      color: "text-yellow-400",
      skills: [
        {
          name: "Team Leadership",
          icon: <HiOutlineLightBulb className="w-4 h-4 text-yellow-400" />,
        },
        {
          name: "Initiative Taking",
          icon: <HiOutlineLightBulb className="w-4 h-4 text-orange-400" />,
        },
        {
          name: "Community Building",
          icon: <HiOutlineLightBulb className="w-4 h-4 text-green-400" />,
        },
        {
          name: "DSA (350+ problems)",
          icon: <Code2 className="w-4 h-4 text-white" />,
        },
      ],
    },
    {
      icon: Book,
      title: "Core CS Subjects",
      color: "text-yellow-400",
      skills: [
        {
          name: "Operating Systems",
          icon: <HiOutlineLightBulb className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "DBMS",
          icon: <Database className="w-4 h-4 text-[#A78BFA]" />,
        },
        {
          name: "Computer Networks",
          icon: <Cloud className="w-4 h-4 text-[#60A5FA]" />,
        },
        {
          name: "Computer Architecture",
          icon: <Cpu className="w-4 h-4 text-[#F472B6]" />,
        },
        {
          name: "OOPs Concepts",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#10B981]" />,
        },
        {
          name: "Software Engineering",
          icon: <Layout className="w-4 h-4 text-[#F59E0B]" />,
        },
      ],
    },
  ];

  return (
    <main className="pt-15 lg:pt-0 text-white min-h-screen bg-[#04081A] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <section className="container mx-auto px-4 py-11 relative z-10">
        <div className="flex justify-center items-center">
          <IconCloudDemo />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
            />
          ))}
        </div>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </main>
  );
};

export default SkillsSection;

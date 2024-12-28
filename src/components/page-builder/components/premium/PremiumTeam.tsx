import React from 'react';
import { Component } from "@/types/landing";
import { Linkedin, Twitter, Github } from "lucide-react";

interface TeamProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const PremiumTeam = ({ component, onEdit }: TeamProps) => {
  const content = component.content as {
    title: string;
    subtitle: string;
    description: string;
    members: TeamMember[];
  };

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {content.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {content.description}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {content.members.map((member) => (
            <li key={member.name}>
              <div className="group relative">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <img
                    className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-105"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-gray-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-base leading-7 text-purple-600">{member.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {member.bio}
                </p>
                {member.social && (
                  <ul role="list" className="mt-6 flex gap-x-6">
                    {Object.entries(member.social).map(
                      ([platform, url]) =>
                        url && (
                          <li key={platform}>
                            <a
                              href={url}
                              className="text-gray-400 hover:text-gray-500"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="sr-only">{platform}</span>
                              {platform in socialIcons &&
                                React.createElement(
                                  socialIcons[
                                    platform as keyof typeof socialIcons
                                  ],
                                  {
                                    className: "h-5 w-5",
                                    "aria-hidden": "true",
                                  }
                                )}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const defaultTeamContent = {
  title: "Expertos en Transformación Digital",
  subtitle: "Un equipo apasionado por la innovación",
  description:
    "Conoce a los profesionales que hacen posible el éxito de nuestros clientes. Cada miembro aporta experiencia única y visión innovadora.",
  members: [
    {
      name: "Ana Martínez",
      role: "CEO & Fundadora",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      bio: "Ex-directora de Innovación en Google, Ana lidera nuestra visión de transformar el mundo digital.",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "David Chen",
      role: "Director de Tecnología",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
      bio: "Con 15 años de experiencia en Silicon Valley, David impulsa nuestra excelencia tecnológica.",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Sofia Rodriguez",
      role: "Directora de Diseño",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
      bio: "Premiada diseñadora UX/UI, Sofia crea experiencias que cautivan y convierten.",
      social: {
        twitter: "https://twitter.com",
        github: "https://github.com",
      },
    },
  ],
};

export default PremiumTeam;

import { Component } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

interface BlogProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  link: string;
}

export default function Blog({ component, onEdit }: BlogProps) {
  const content = component.content as {
    title: string;
    subtitle: string;
    description: string;
    posts: BlogPost[];
    cta: {
      text: string;
      link: string;
    };
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {content.subtitle}
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {content.description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {content.posts.map((post) => (
            <article
              key={post.title}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="flex items-center gap-x-2">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </div>
                <div className="mx-2">·</div>
                <div className="flex items-center gap-x-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="mx-2">·</div>
                <div className="flex items-center gap-x-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.link}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <div className="mt-3 text-sm leading-6 text-gray-300">
                {post.excerpt}
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
                  {post.category}
                </span>
              </div>
            </article>
          ))}
        </div>
        {content.cta && (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => window.open(content.cta.link, "_blank")}
              className="group"
            >
              {content.cta.text}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export const defaultBlogContent = {
  title: "Insights & Tendencias",
  subtitle: "Conocimiento que Transforma",
  description:
    "Descubre las últimas tendencias, estrategias y mejores prácticas para impulsar tu presencia digital.",
  posts: [
    {
      title: "El Futuro del E-commerce: IA y Personalización",
      excerpt:
        "Descubre cómo la inteligencia artificial está revolucionando la experiencia de compra online y cómo implementarla en tu negocio.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      },
      date: "20 Dic, 2024",
      readTime: "5 min",
      category: "Innovación",
      link: "/blog/futuro-ecommerce-ia",
    },
    {
      title: "Diseño UX: Más Allá de lo Visual",
      excerpt:
        "Explora cómo el diseño centrado en el usuario puede aumentar las conversiones y mejorar la satisfacción del cliente.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop",
      author: {
        name: "Laura Chen",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      },
      date: "19 Dic, 2024",
      readTime: "4 min",
      category: "Diseño",
      link: "/blog/diseno-ux-conversion",
    },
    {
      title: "Growth Marketing: Estrategias 2024",
      excerpt:
        "Las estrategias más efectivas de growth marketing para escalar tu negocio en el competitivo mercado actual.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      author: {
        name: "Marco Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      },
      date: "18 Dic, 2024",
      readTime: "6 min",
      category: "Marketing",
      link: "/blog/growth-marketing-2024",
    },
  ],
  cta: {
    text: "Explorar Más Insights",
    link: "/blog",
  },
};

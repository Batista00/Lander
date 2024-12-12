import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight, Layout, BarChart3, Users, Check, Star } from 'lucide-react';

export function Home() {
  return (
    <div className="relative isolate">
      {/* Sección Hero */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-500 to-yellow-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                  <Rocket className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h1 className="text-6xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                LANDER
              </h1>
              <p className="text-2xl font-semibold mt-4 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
                Crea landing pages impactantes en minutos
              </p>
              <p className="mt-6 text-lg leading-8 text-blue-100 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                Construye, lanza y optimiza tus páginas de aterrizaje sin necesidad de programar. Convierte más visitantes en clientes con nuestro potente constructor de landing pages.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/register">
                  <Button variant="glow" size="lg" className="gap-2">
                    Empezar Ahora <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="glass" size="lg">
                    Ver Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Características */}
      <div className="relative bg-gradient-to-b from-violet-950 to-indigo-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-30"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-pink-500">Todo lo que necesitas</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Características poderosas para negocios modernos
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col bg-white/10 p-6 rounded-2xl backdrop-blur-lg">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Layout className="h-5 w-5 flex-none text-pink-500" />
                  Constructor de Landing Pages
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">Crea páginas profesionales con nuestro constructor drag-and-drop. Sin necesidad de código.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-white/10 p-6 rounded-2xl backdrop-blur-lg">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <BarChart3 className="h-5 w-5 flex-none text-pink-500" />
                  Análisis y Estadísticas
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">Monitorea tu rendimiento con análisis detallados y métricas de conversión.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-white/10 p-6 rounded-2xl backdrop-blur-lg">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Users className="h-5 w-5 flex-none text-pink-500" />
                  Gestión de Leads
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">Administra y nutre tus leads con nuestro sistema CRM integrado.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="bg-gradient-to-b from-violet-900 to-indigo-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-pink-500">Testimonios</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Respaldado por miles de empresas
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Testimonios cards con efecto glassmorphism */}
            <div className="flex flex-col bg-white/10 p-6 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex gap-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-7 text-blue-100">
                "Esta plataforma ha transformado la forma en que creamos landing pages. Es intuitiva, rápida y los resultados son increíbles."
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-white">María González</p>
                <p className="text-sm text-blue-200">Directora de Marketing, TechCorp</p>
              </div>
            </div>
            <div className="flex flex-col bg-white/10 p-6 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex gap-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-7 text-blue-100">
                "Las funciones de análisis son increíbles. Hemos aumentado nuestras tasas de conversión en un 150% desde que cambiamos."
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-white">Carlos Rodríguez</p>
                <p className="text-sm text-blue-200">CEO, GrowthLabs</p>
              </div>
            </div>
            <div className="flex flex-col bg-white/10 p-6 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex gap-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-7 text-blue-100">
                "El soporte al cliente es excepcional. Todas nuestras preguntas fueron respondidas de manera rápida y profesional."
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-white">Ana Martínez</p>
                <p className="text-sm text-blue-200">Fundadora, DesignPro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Precios */}
      <div className="bg-gradient-to-b from-indigo-900 to-violet-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-pink-500">Precios</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Elige el plan perfecto para tus necesidades
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Plan Gratuito */}
            <div className="flex flex-col bg-white/10 p-8 backdrop-blur-lg rounded-2xl border border-white/20">
              <h3 className="text-lg font-semibold leading-7 text-white">Gratuito</h3>
              <p className="mt-4 text-sm leading-6 text-blue-200">Perfecto para comenzar</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-sm text-blue-200">/mes</span>
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {['1 Landing Page', 'Análisis Básico', 'Soporte Comunitario'].map((feature) => (
                  <li key={feature} className="flex gap-x-3 text-blue-100">
                    <Check className="h-5 w-5 text-pink-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-8">
                <Button variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20">Comenzar Gratis</Button>
              </Link>
            </div>
            {/* Plan Pro */}
            <div className="flex flex-col bg-gradient-to-r from-pink-500 to-yellow-500 p-8 rounded-2xl shadow-xl transform scale-105">
              <h3 className="text-lg font-semibold leading-7 text-white">Pro</h3>
              <p className="mt-4 text-sm leading-6 text-white/90">Ideal para negocios en crecimiento</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-sm text-white/90">/mes</span>
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  'Landing Pages Ilimitadas',
                  'Análisis Avanzado',
                  'Soporte Prioritario',
                  'Dominios Personalizados',
                  'Pruebas A/B'
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3 text-white">
                    <Check className="h-5 w-5 text-white" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-8">
                <Button variant="secondary" className="w-full bg-white text-pink-500 hover:bg-white/90">Prueba Gratuita</Button>
              </Link>
            </div>
            {/* Plan Empresarial */}
            <div className="flex flex-col bg-white/10 p-8 backdrop-blur-lg rounded-2xl border border-white/20">
              <h3 className="text-lg font-semibold leading-7 text-white">Empresarial</h3>
              <p className="mt-4 text-sm leading-6 text-blue-200">Para grandes organizaciones</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-sm text-blue-200">/mes</span>
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  'Todo lo incluido en Pro',
                  'Gerente de Cuenta Dedicado',
                  'Soporte con SLA',
                  'Integraciones Personalizadas',
                  'Colaboración en Equipo'
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3 text-blue-100">
                    <Check className="h-5 w-5 text-pink-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-8">
                <Button variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20">Contactar Ventas</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Listo para comenzar?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
              Únete a miles de empresas que ya están creando landing pages impactantes con nuestra plataforma.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="bg-white text-pink-500 hover:bg-white/90 gap-2">
                  Comienza a Construir <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
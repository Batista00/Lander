import { Link } from 'react-router-dom';
import { 
  Twitter, Linkedin, Github, 
  Blocks, BookOpen, LifeBuoy,
  Building2, Layout, ShoppingBag,
  Palette
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/10 bg-black">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] rounded-lg blur opacity-50"></div>
                <Blocks className="w-8 h-8 text-white relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text">
                LANDER
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Plataforma líder en creación de landing pages. Diseña, publica y optimiza tus páginas sin escribir código.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "https://twitter.com/lander" },
                { icon: Linkedin, href: "https://linkedin.com/company/lander" },
                { icon: Github, href: "https://github.com/lander" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-[#00E5B0]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li><Link to="/app/builder" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <Layout className="w-4 h-4" />Constructor
              </Link></li>
              <li><Link to="/app/marketplace" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />Marketplace
              </Link></li>
              <li><Link to="/app/templates" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <Palette className="w-4 h-4" />Plantillas
              </Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" />Precios
              </Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-[#00E5B0] text-sm">Sobre Nosotros</Link></li>
              <li><Link to="/customers" className="text-gray-400 hover:text-[#00E5B0] text-sm">Clientes</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#00E5B0] text-sm">Contacto</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-[#00E5B0] text-sm">Empleo</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />Documentación
              </Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-[#00E5B0] text-sm flex items-center gap-2">
                <LifeBuoy className="w-4 h-4" />Ayuda
              </Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-[#00E5B0] text-sm">Blog</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-[#00E5B0] text-sm">Comunidad</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              {new Date().getFullYear()} LANDER. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-[#00E5B0]">Privacidad</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-[#00E5B0]">Términos</Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-[#00E5B0]">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#00E5B0]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF1F8C]/5 rounded-full filter blur-3xl"></div>
      </div>
    </footer>
  );
}

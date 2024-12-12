import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">LANDER</span>
            </Link>
            <p className="mt-4 text-blue-100">
              Crea landing pages profesionales en minutos con nuestra plataforma intuitiva.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-blue-100 hover:text-white">Marketplace</Link></li>
              <li><Link to="/templates" className="text-blue-100 hover:text-white">Templates</Link></li>
              <li><Link to="/pricing" className="text-blue-100 hover:text-white">Precios</Link></li>
              <li><Link to="/blog" className="text-blue-100 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold text-white mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-blue-100 hover:text-white">Centro de Ayuda</Link></li>
              <li><Link to="/documentation" className="text-blue-100 hover:text-white">Documentación</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contacto</Link></li>
              <li><Link to="/status" className="text-blue-100 hover:text-white">Estado del Sistema</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-blue-100 hover:text-white">Privacidad</Link></li>
              <li><Link to="/terms" className="text-blue-100 hover:text-white">Términos</Link></li>
              <li><Link to="/security" className="text-blue-100 hover:text-white">Seguridad</Link></li>
              <li><Link to="/cookies" className="text-blue-100 hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="mt-12 pt-8 border-t border-blue-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-blue-100 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
            </div>
            <p className="text-blue-100">
              {new Date().getFullYear()} LANDER. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

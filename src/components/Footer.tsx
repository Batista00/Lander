import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">KREATOSAPP</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Crea landing pages profesionales en minutos con nuestra plataforma intuitiva.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900">Precios</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Centro de Ayuda</Link></li>
              <li><Link to="/documentation" className="text-gray-600 hover:text-gray-900">Documentación</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contacto</Link></li>
              <li><Link to="/status" className="text-gray-600 hover:text-gray-900">Estado del Sistema</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacidad</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Términos</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-gray-900">Seguridad</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} KREATOSAPP. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

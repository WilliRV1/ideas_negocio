'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-neon flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">
                Wod<span className="text-neon">Match</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted">
              La red social del CrossFit. Conecta atletas, boxes y competencias en un solo lugar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/competitions" className="text-text-muted hover:text-neon transition-colors">Competencias</Link></li>
              <li><Link href="/boxes" className="text-text-muted hover:text-neon transition-colors">Boxes</Link></li>
              <li><Link href="/feed" className="text-text-muted hover:text-neon transition-colors">Feed</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Cuenta</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/register" className="text-text-muted hover:text-neon transition-colors">Registrarse</Link></li>
              <li><Link href="/auth/login" className="text-text-muted hover:text-neon transition-colors">Iniciar Sesion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-text-muted">Terminos de Servicio</span></li>
              <li><span className="text-text-muted">Politica de Privacidad</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} WodMatch. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

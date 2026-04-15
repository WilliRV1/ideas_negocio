'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, User, LogOut, Trophy, Home as HomeIcon, Newspaper, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/Button';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith('/auth');
  if (isAuthPage) return null;

  const navLinks = user
    ? [
        { href: '/feed', label: 'Feed', icon: Newspaper },
        { href: '/competitions', label: 'Competencias', icon: Trophy },
        { href: '/boxes', label: 'Boxes', icon: Dumbbell },
        { href: '/store', label: 'Tienda', icon: ShoppingBag },
        { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      ]
    : [
        { href: '/#features', label: 'Features', icon: null },
        { href: '/competitions', label: 'Competencias', icon: Trophy },
        { href: '/boxes', label: 'Boxes', icon: Dumbbell },
        { href: '/store', label: 'Tienda', icon: ShoppingBag },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-neon flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Wod<span className="text-neon">Match</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-neon bg-neon/10'
                    : 'text-text-muted hover:text-foreground hover:bg-surface-light'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-lighter border border-border flex items-center justify-center">
                    <User className="w-4 h-4 text-neon" />
                  </div>
                  <span className="text-sm font-medium">{userProfile?.displayName || 'Perfil'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-surface-light transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Iniciar Sesion</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-light transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-neon bg-neon/10'
                      : 'text-text-muted hover:text-foreground hover:bg-surface-light'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-2 border-t border-border space-y-2">
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-foreground hover:bg-surface-light">
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-surface-light cursor-pointer"
                    >
                      Cerrar Sesion
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">Iniciar Sesion</Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">Registrarse</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

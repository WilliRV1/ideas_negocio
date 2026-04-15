'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Trophy, Dumbbell, Users, Zap, ArrowRight, Shield, Globe, TrendingUp } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon/5 rounded-full blur-[120px]" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-neon/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4" />
              La comunidad CrossFit mas grande
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              Conecta. Compite.{' '}
              <span className="gradient-text">Superate.</span>
            </h1>

            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              La plataforma que une a atletas, boxes y competencias de CrossFit.
              Encuentra tu proximo desafio, conecta con tu comunidad y lleva tu rendimiento al siguiente nivel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="min-w-[200px] group">
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/competitions">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  Ver Competencias
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: '5,000+', label: 'Atletas' },
              { value: '200+', label: 'Boxes' },
              { value: '150+', label: 'Competencias' },
              { value: '10+', label: 'Paises' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <p className="text-3xl sm:text-4xl font-black text-neon">{stat.value}</p>
                <p className="text-sm text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-4">
              Todo lo que necesitas en{' '}
              <span className="gradient-text">un lugar</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-muted text-lg max-w-2xl mx-auto">
              WodMatch conecta toda la comunidad CrossFit en una plataforma unificada
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Users,
                title: 'Perfil de Atleta',
                description: 'Crea tu perfil, registra tus PRs, sigue tu progreso y conecta con otros atletas de tu nivel.',
                color: 'from-neon to-green-400',
              },
              {
                icon: Dumbbell,
                title: 'Boxes',
                description: 'Descubre boxes cerca de ti, mira sus horarios, coaches y planes. Ideal para cuando viajas.',
                color: 'from-neon to-emerald-400',
              },
              {
                icon: Trophy,
                title: 'Competencias',
                description: 'Encuentra competencias, inscribete, revisa los WODs y sigue los resultados en tiempo real.',
                color: 'from-neon to-teal-400',
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full p-8 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-text-muted leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-4">
              Un lugar para <span className="gradient-text">cada rol</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-muted text-lg max-w-2xl mx-auto">
              Ya seas atleta, dueno de box u organizador de competencias, WodMatch tiene todo para ti
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                role: 'Atleta',
                features: [
                  'Perfil personal con PRs y estadisticas',
                  'Feed social con la comunidad',
                  'Inscripcion a competencias',
                  'Busqueda de boxes',
                  'Seguir a otros atletas',
                ],
                cta: 'Crear mi perfil',
              },
              {
                icon: Dumbbell,
                role: 'Box Owner',
                features: [
                  'Pagina de tu box con toda la info',
                  'Publicar horarios y programacion',
                  'Promocionar tu box',
                  'Conectar con atletas',
                  'Panel de administracion',
                ],
                cta: 'Registrar mi box',
                featured: true,
              },
              {
                icon: Trophy,
                role: 'Organizador',
                features: [
                  'Crear y publicar competencias',
                  'Gestionar inscripciones',
                  'Publicar WODs y resultados',
                  'Llegar a mas atletas',
                  'Dashboard de eventos',
                ],
                cta: 'Publicar competencia',
              },
            ].map((type, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card
                  glow={type.featured}
                  hover={false}
                  className={`h-full p-8 ${type.featured ? 'relative scale-105' : ''}`}
                >
                  {type.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-black text-xs font-bold uppercase tracking-wider">
                      Popular
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-2xl bg-neon/10 flex items-center justify-center mb-6">
                    <type.icon className="w-7 h-7 text-neon" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{type.role}</h3>
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                        <Shield className="w-4 h-4 text-neon mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register">
                    <Button
                      variant={type.featured ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      {type.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm font-medium mb-8">
              <Globe className="w-4 h-4" />
              Disponible en toda Latinoamerica
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-6">
              Unite a la comunidad{' '}
              <span className="gradient-text">WodMatch</span>
            </h2>
            <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
              Miles de atletas ya estan conectando, compitiendo y mejorando juntos.
              No te quedes afuera.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="min-w-[220px] group">
                  <TrendingUp className="w-5 h-5 mr-2 inline" />
                  Empezar Gratis
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

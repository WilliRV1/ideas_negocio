'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Trophy, Dumbbell, Users, TrendingUp, Calendar, Plus, ArrowRight,
  CheckCircle, Clock, AlertCircle, Newspaper,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
    if (!loading && user && !userProfile?.role) {
      router.push('/auth/onboarding');
    }
  }, [user, userProfile, loading, router]);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon/30 border-t-neon rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeInUp} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">
            Hola, <span className="gradient-text">{userProfile.displayName}</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon/10 text-neon text-sm font-medium">
              {userProfile.role === 'athlete' && <><Users className="w-3.5 h-3.5" /> Atleta</>}
              {userProfile.role === 'box_owner' && <><Dumbbell className="w-3.5 h-3.5" /> Box Owner</>}
              {userProfile.role === 'competition_organizer' && <><Trophy className="w-3.5 h-3.5" /> Organizador</>}
            </span>
            {!userProfile.verified && userProfile.role !== 'athlete' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-medium">
                <Clock className="w-3.5 h-3.5" /> Verificacion pendiente
              </span>
            )}
            {userProfile.verified && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon/10 text-neon text-sm font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Verificado
              </span>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {userProfile.role === 'athlete' && (
            <>
              <motion.div variants={fadeInUp}>
                <Link href="/feed">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Feed</p>
                      <p className="text-xs text-text-muted">Ver novedades</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/competitions">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Competencias</p>
                      <p className="text-xs text-text-muted">Encontrar eventos</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/boxes">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Boxes</p>
                      <p className="text-xs text-text-muted">Explorar boxes</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/profile">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Mi Perfil</p>
                      <p className="text-xs text-text-muted">Ver estadisticas</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </>
          )}

          {userProfile.role === 'box_owner' && (
            <>
              <motion.div variants={fadeInUp}>
                <Card className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">0</p>
                    <p className="text-xs text-text-muted">Miembros</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">0</p>
                    <p className="text-xs text-text-muted">Clases esta semana</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/feed">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Publicar</p>
                      <p className="text-xs text-text-muted">Crear publicacion</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/profile">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Mi Box</p>
                      <p className="text-xs text-text-muted">Editar perfil</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </>
          )}

          {userProfile.role === 'competition_organizer' && (
            <>
              <motion.div variants={fadeInUp}>
                <Card className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">0</p>
                    <p className="text-xs text-text-muted">Eventos creados</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">0</p>
                    <p className="text-xs text-text-muted">Inscriptos totales</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/competitions">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Crear Evento</p>
                      <p className="text-xs text-text-muted">Nueva competencia</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/profile">
                  <Card className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="font-bold">Mi Perfil</p>
                      <p className="text-xs text-text-muted">Configurar</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Verification Notice for non-athletes */}
        {!userProfile.verified && userProfile.role !== 'athlete' && (
          <motion.div {...fadeInUp} className="mb-8">
            <Card hover={false} className="border-yellow-500/30 bg-yellow-500/5 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-yellow-500 mb-1">Verificacion Pendiente</h3>
                  <p className="text-sm text-text-muted">
                    Tu cuenta esta siendo verificada por nuestro equipo. Una vez verificada,
                    podras {userProfile.role === 'box_owner' ? 'publicar tu box y aparecer en las busquedas' : 'crear y publicar competencias'}.
                    Este proceso puede tomar hasta 48 horas.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Activity Placeholder */}
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Actividad Reciente</h2>
            <Link href="/feed">
              <Button variant="ghost" size="sm">
                Ver todo <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
            </Link>
          </div>

          <Card hover={false} className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-lighter flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold mb-2">Aun no hay actividad</h3>
            <p className="text-text-muted mb-6 max-w-md mx-auto">
              Empieza a seguir atletas, boxes y competencias para ver sus publicaciones aqui.
            </p>
            <Link href="/feed">
              <Button variant="secondary">Explorar Feed</Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

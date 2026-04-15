'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  User, MapPin, Calendar, Trophy, Dumbbell, Instagram,
  CheckCircle, Edit3, TrendingUp,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon/30 border-t-neon rounded-full animate-spin" />
      </div>
    );
  }

  const isAthlete = userProfile.role === 'athlete';
  const isBoxOwner = userProfile.role === 'box_owner';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card hover={false} className="relative overflow-hidden">
            {/* Banner */}
            <div className="h-32 -mx-6 -mt-6 mb-6 bg-gradient-to-r from-surface-light via-neon/5 to-surface-light" />

            <div className="flex flex-col sm:flex-row items-start gap-6 -mt-20 relative z-10">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-surface border-4 border-background flex items-center justify-center shadow-xl">
                {userProfile.photoURL ? (
                  <img src={userProfile.photoURL} alt="" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <User className="w-10 h-10 text-neon" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-black">{userProfile.displayName}</h1>
                  {userProfile.verified && (
                    <CheckCircle className="w-5 h-5 text-neon" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon/10 text-neon font-medium">
                    {isAthlete && <><User className="w-3.5 h-3.5" /> Atleta</>}
                    {isBoxOwner && <><Dumbbell className="w-3.5 h-3.5" /> Box Owner</>}
                    {userProfile.role === 'competition_organizer' && <><Trophy className="w-3.5 h-3.5" /> Organizador</>}
                  </span>
                  {String((userProfile as unknown as Record<string, unknown>).location || '') && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {String((userProfile as unknown as Record<string, unknown>).location || '')}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Miembro desde {new Date(userProfile.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>

                {userProfile.bio && <p className="text-sm text-text-muted">{userProfile.bio}</p>}
              </div>

              <Button variant="secondary" size="sm">
                <Edit3 className="w-4 h-4 mr-1 inline" />
                Editar
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats for Athletes */}
        {isAthlete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon" />
              Personal Records
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Back Squat', value: '---' },
                { label: 'Deadlift', value: '---' },
                { label: 'Clean & Jerk', value: '---' },
                { label: 'Snatch', value: '---' },
                { label: 'Fran', value: '---' },
                { label: 'Murph', value: '---' },
              ].map((pr) => (
                <Card key={pr.label} hover={false} className="text-center p-4">
                  <p className="text-2xl font-black text-neon mb-1">{pr.value}</p>
                  <p className="text-xs text-text-muted">{pr.label}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Box Info for Box Owners */}
        {isBoxOwner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-neon" />
              Informacion del Box
            </h2>
            <Card hover={false}>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-neon" />
                  <span className="font-medium">Nombre:</span>
                  <span className="text-text-muted">{String((userProfile as unknown as Record<string, unknown>).boxName || 'No especificado')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neon" />
                  <span className="font-medium">Direccion:</span>
                  <span className="text-text-muted">{String((userProfile as unknown as Record<string, unknown>).boxAddress || 'No especificado')}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Social Links */}
        {userProfile.socialLinks?.instagram && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h2 className="text-xl font-bold mb-4">Redes Sociales</h2>
            <div className="flex gap-3">
              <Card hover={false} className="inline-flex items-center gap-2 px-4 py-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                <span className="text-sm">{userProfile.socialLinks.instagram}</span>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

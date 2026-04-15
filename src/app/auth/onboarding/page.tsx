'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Dumbbell, Trophy, ArrowRight, ArrowLeft, MapPin, Phone, Globe, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

const roles = [
  {
    id: 'athlete' as UserRole,
    icon: Users,
    title: 'Atleta',
    description: 'Quiero registrar mis WODs, seguir competencias y conectar con la comunidad.',
    color: 'from-neon to-green-400',
  },
  {
    id: 'box_owner' as UserRole,
    icon: Dumbbell,
    title: 'Dueno de Box',
    description: 'Quiero promocionar mi box, publicar horarios y conectar con atletas.',
    color: 'from-neon to-emerald-400',
  },
  {
    id: 'competition_organizer' as UserRole,
    icon: Trophy,
    title: 'Organizador de Competencias',
    description: 'Quiero crear y publicar competencias, gestionar inscripciones y resultados.',
    color: 'from-neon to-teal-400',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Athlete fields
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');

  // Box owner fields
  const [boxName, setBoxName] = useState('');
  const [boxAddress, setBoxAddress] = useState('');
  const [boxPhone, setBoxPhone] = useState('');
  const [boxWebsite, setBoxWebsite] = useState('');

  // Competition organizer fields
  const [orgName, setOrgName] = useState('');
  const [orgLocation, setOrgLocation] = useState('');

  const { user, setUserRole } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleComplete = async () => {
    if (!user || !selectedRole) return;
    setLoading(true);
    setError('');

    try {
      let extraData: Record<string, unknown> = {};

      if (selectedRole === 'athlete') {
        extraData = {
          location,
          socialLinks: { instagram },
        };
      } else if (selectedRole === 'box_owner') {
        if (!boxName || !boxAddress) {
          setError('El nombre y direccion del box son obligatorios');
          setLoading(false);
          return;
        }
        extraData = {
          boxName,
          boxAddress,
          boxPhone,
          boxWebsite,
          verified: false,
        };
      } else if (selectedRole === 'competition_organizer') {
        if (!orgName) {
          setError('El nombre de la organizacion es obligatorio');
          setLoading(false);
          return;
        }
        extraData = {
          organizationName: orgName,
          location: orgLocation,
          verified: false,
        };
      }

      await setUserRole(user.uid, selectedRole, extraData);
      router.push('/dashboard');
    } catch {
      setError('Error al guardar tu perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/3 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  s <= step
                    ? 'bg-neon text-black'
                    : 'bg-surface-light text-text-muted border border-border'
                }`}
              >
                {s}
              </div>
              {s < 2 && (
                <div className={`w-20 h-0.5 transition-all duration-300 ${step >= 2 ? 'bg-neon' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">Que tipo de usuario sos?</h1>
                <p className="text-text-muted text-lg">Selecciona tu rol para personalizar tu experiencia</p>
              </div>

              <div className="grid gap-4">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedRole === role.id
                        ? 'border-neon bg-neon/5 shadow-[0_0_30px_rgba(57,255,20,0.15)]'
                        : 'border-border bg-surface hover:border-neon/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <role.icon className="w-7 h-7 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                        <p className="text-text-muted text-sm">{role.description}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                          selectedRole === role.id
                            ? 'border-neon bg-neon'
                            : 'border-border'
                        }`}
                      >
                        {selectedRole === role.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-black"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedRole}
                  size="lg"
                  className="min-w-[180px]"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">Completa tu perfil</h1>
                <p className="text-text-muted text-lg">
                  {selectedRole === 'athlete' && 'Contanos un poco mas sobre vos'}
                  {selectedRole === 'box_owner' && 'Datos de tu box para que los atletas te encuentren'}
                  {selectedRole === 'competition_organizer' && 'Informacion de tu organizacion'}
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-8 space-y-4">
                {selectedRole === 'athlete' && (
                  <>
                    <Input
                      label="Ciudad / Ubicacion"
                      placeholder="Ej: Buenos Aires, Argentina"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      icon={<MapPin className="w-4 h-4" />}
                    />
                    <Input
                      label="Instagram (opcional)"
                      placeholder="@tuusuario"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      icon={<Instagram className="w-4 h-4" />}
                    />
                  </>
                )}

                {selectedRole === 'box_owner' && (
                  <>
                    <Input
                      label="Nombre del Box *"
                      placeholder="Ej: CrossFit La Bestia"
                      value={boxName}
                      onChange={(e) => setBoxName(e.target.value)}
                      icon={<Dumbbell className="w-4 h-4" />}
                    />
                    <Input
                      label="Direccion del Box *"
                      placeholder="Calle, Numero, Ciudad"
                      value={boxAddress}
                      onChange={(e) => setBoxAddress(e.target.value)}
                      icon={<MapPin className="w-4 h-4" />}
                    />
                    <Input
                      label="Telefono (opcional)"
                      placeholder="+54 11 1234-5678"
                      value={boxPhone}
                      onChange={(e) => setBoxPhone(e.target.value)}
                      icon={<Phone className="w-4 h-4" />}
                    />
                    <Input
                      label="Sitio Web (opcional)"
                      placeholder="https://tubox.com"
                      value={boxWebsite}
                      onChange={(e) => setBoxWebsite(e.target.value)}
                      icon={<Globe className="w-4 h-4" />}
                    />
                    <p className="text-xs text-text-muted">
                      * Tu box sera verificado por nuestro equipo para asegurar la autenticidad.
                    </p>
                  </>
                )}

                {selectedRole === 'competition_organizer' && (
                  <>
                    <Input
                      label="Nombre de la Organizacion *"
                      placeholder="Ej: CrossFit Games Argentina"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      icon={<Trophy className="w-4 h-4" />}
                    />
                    <Input
                      label="Ubicacion"
                      placeholder="Ciudad, Pais"
                      value={orgLocation}
                      onChange={(e) => setOrgLocation(e.target.value)}
                      icon={<MapPin className="w-4 h-4" />}
                    />
                    <p className="text-xs text-text-muted">
                      * Tu cuenta sera verificada por nuestro equipo antes de poder publicar competencias.
                    </p>
                  </>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={handleBack} size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2 inline" />
                  Atras
                </Button>
                <Button
                  onClick={handleComplete}
                  loading={loading}
                  size="lg"
                  className="min-w-[180px]"
                >
                  Completar Registro
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

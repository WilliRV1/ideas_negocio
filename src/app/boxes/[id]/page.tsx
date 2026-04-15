'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Dumbbell, MapPin, Users, Star, Clock, CheckCircle, ArrowLeft,
  Phone, Globe, Instagram, Award, Calendar, ChevronRight, Heart,
  Zap, Shield, Coffee, Car, ShoppingBag, Stethoscope, MessageCircle,
} from 'lucide-react';

const mockBoxes: Record<string, BoxData> = {
  '1': {
    id: '1',
    name: 'CrossFit La Bestia',
    address: 'Av. Corrientes 1234, Buenos Aires, Argentina',
    city: 'Buenos Aires',
    members: 150,
    rating: 4.8,
    reviews: 64,
    coaches: 5,
    verified: true,
    monthlyPrice: 45000,
    phone: '+54 11 4567-8901',
    website: 'www.crossfitlabestia.com.ar',
    instagram: '@crossfitlabestia',
    description:
      'CrossFit La Bestia es el box de referencia en Buenos Aires. Contamos con mas de 8 anos de experiencia formando atletas de todos los niveles, desde principiantes hasta competidores de alto rendimiento. Nuestro equipo de coaches certificados te va a acompanar en cada etapa de tu camino.',
    amenities: ['Parking', 'Vestuarios', 'Open Box', 'Cafe', 'Tienda'],
    schedule: [
      { day: 'Lunes a Viernes', hours: '6:00 - 21:00' },
      { day: 'Sabado', hours: '8:00 - 14:00' },
      { day: 'Domingo', hours: 'Cerrado' },
    ],
    coaches: [
      { name: 'Matias Rodriguez', level: 'CF-L3', specialty: 'Weightlifting & Gymnastics', years: 7 },
      { name: 'Laura Gomez', level: 'CF-L2', specialty: 'Endurance & Nutrition', years: 5 },
      { name: 'Diego Torres', level: 'CF-L2', specialty: 'Olympic Lifting', years: 4 },
      { name: 'Sofia Muñoz', level: 'CF-L1', specialty: 'Mobility & Rehab', years: 2 },
      { name: 'Pablo Fernandez', level: 'CF-L1', specialty: 'Powerlifting', years: 3 },
    ],
    reviews: [
      { author: 'Juan M.', rating: 5, text: 'El mejor box de Buenos Aires sin dudas. Los coaches son increibles y la comunidad es muy unida.', date: 'Hace 2 semanas' },
      { author: 'Caro V.', rating: 5, text: 'Empece sin saber nada de CrossFit y en 6 meses cambie completamente mi condicion fisica. Muy recomendado!', date: 'Hace 1 mes' },
      { author: 'Andres P.', rating: 4, text: 'Muy buenas instalaciones y coaches muy profesionales. El precio es justo para la calidad.', date: 'Hace 1 mes' },
      { author: 'Marina L.', rating: 5, text: 'La comunidad es lo mejor. Muy buen ambiente para entrenar.', date: 'Hace 2 meses' },
    ],
    wods: [
      { name: 'WOD del Lunes', type: 'AMRAP 20 min', movements: ['21 Thrusters 43/29 kg', '21 Pull-ups', '15 Thrusters 43/29 kg', '15 Pull-ups', '9 Thrusters 43/29 kg', '9 Pull-ups'] },
      { name: 'Strength', type: 'Back Squat', movements: ['5x3 @ 85%', 'Rest 3 min entre series', 'Tempo 31X1'] },
    ],
    upcomingClasses: [
      { time: '06:00', name: 'Morning WOD', spots: 3 },
      { time: '07:00', name: 'Morning WOD', spots: 0 },
      { time: '09:00', name: 'Open Box', spots: 8 },
      { time: '12:00', name: 'Lunch WOD', spots: 5 },
      { time: '18:00', name: 'Evening WOD', spots: 2 },
      { time: '19:00', name: 'Evening WOD', spots: 7 },
    ],
  },
  '2': {
    id: '2',
    name: 'Box Guerrero Fitness',
    address: 'Calle Providencia 567, Santiago, Chile',
    city: 'Santiago',
    members: 80,
    rating: 4.6,
    reviews: 38,
    coaches: 3,
    verified: true,
    monthlyPrice: 60000,
    phone: '+56 2 2345-6789',
    website: 'www.guerrerofitness.cl',
    instagram: '@guerrerofitnesscl',
    description:
      'Box Guerrero Fitness nacio con la mision de democratizar el CrossFit en Santiago. Ofrecemos clases para todos los niveles con un ambiente familiar y motivador. Nuestros coaches estan comprometidos con tu progreso.',
    amenities: ['Vestuarios', 'Tienda'],
    schedule: [
      { day: 'Lunes a Viernes', hours: '7:00 - 20:00' },
      { day: 'Sabado', hours: '9:00 - 13:00' },
      { day: 'Domingo', hours: 'Cerrado' },
    ],
    coaches: [
      { name: 'Carlos Vera', level: 'CF-L2', specialty: 'General CrossFit', years: 6 },
      { name: 'Ana Rojas', level: 'CF-L2', specialty: 'Gymnastics', years: 4 },
      { name: 'Felipe Morales', level: 'CF-L1', specialty: 'Endurance', years: 2 },
    ],
    reviews: [
      { author: 'Rodrigo S.', rating: 5, text: 'Excelente box, muy buen ambiente y coaches comprometidos.', date: 'Hace 1 semana' },
      { author: 'Valentina C.', rating: 4, text: 'Muy buen lugar para entrenar, las instalaciones son buenas.', date: 'Hace 3 semanas' },
    ],
    wods: [
      { name: 'WOD del Dia', type: 'For Time', movements: ['400m Run', '21 KB Swings 24/16 kg', '12 Pull-ups', '400m Run', '15 KB Swings', '9 Pull-ups', '400m Run', '9 KB Swings', '6 Pull-ups'] },
    ],
    upcomingClasses: [
      { time: '07:00', name: 'Morning WOD', spots: 5 },
      { time: '09:00', name: 'Open Box', spots: 10 },
      { time: '18:00', name: 'Evening WOD', spots: 4 },
      { time: '19:00', name: 'Evening WOD', spots: 0 },
    ],
  },
};

// Fallback data for other IDs
const defaultBox: BoxData = mockBoxes['1'];

const amenityIcons: Record<string, React.ReactNode> = {
  Parking: <Car className="w-4 h-4" />,
  Vestuarios: <Shield className="w-4 h-4" />,
  'Open Box': <Zap className="w-4 h-4" />,
  Cafe: <Coffee className="w-4 h-4" />,
  Tienda: <ShoppingBag className="w-4 h-4" />,
  Fisioterapia: <Stethoscope className="w-4 h-4" />,
};

type Coach = {
  name: string;
  level: string;
  specialty: string;
  years: number;
};

type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

type ScheduleEntry = {
  day: string;
  hours: string;
};

type Wod = {
  name: string;
  type: string;
  movements: string[];
};

type ClassEntry = {
  time: string;
  name: string;
  spots: number;
};

type BoxData = {
  id: string;
  name: string;
  address: string;
  city: string;
  members: number;
  rating: number;
  reviews: number | Review[];
  coaches: number | Coach[];
  verified: boolean;
  monthlyPrice: number;
  phone: string;
  website: string;
  instagram: string;
  description: string;
  amenities: string[];
  schedule: ScheduleEntry[];
  wods: Wod[];
  upcomingClasses: ClassEntry[];
};

const tabs = ['Info', 'Coaches', 'WODs', 'Horarios', 'Resenas'];

export default function BoxDetailPage() {
  const { id } = useParams<{ id: string }>();
  const box = mockBoxes[id] ?? { ...defaultBox, id, name: 'CrossFit ' + id };
  const [activeTab, setActiveTab] = useState('Info');
  const [liked, setLiked] = useState(false);
  const reviews = Array.isArray(box.reviews) ? box.reviews : [];
  const coaches = Array.isArray(box.coaches) ? box.coaches : [];

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-surface-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-surface to-black" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(var(--color-neon) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8">
          <Link href="/boxes">
            <motion.div
              whileHover={{ x: -3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium hover:border-neon/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </motion.div>
          </Link>
        </div>

        {/* Like button */}
        <div className="absolute top-6 right-4 sm:right-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
            className="p-3 rounded-xl glass hover:border-neon/50 transition-colors cursor-pointer"
          >
            <Heart className={`w-5 h-5 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-text-muted'}`} />
          </motion.button>
        </div>

        {/* Box icon */}
        <div className="absolute bottom-8 left-4 sm:left-8 flex items-end gap-4">
          <div className="w-20 h-20 rounded-2xl gradient-neon flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.4)]">
            <Dumbbell className="w-10 h-10 text-black" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3 flex-wrap">
                {box.name}
                {box.verified && (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-neon bg-neon/10 border border-neon/30 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Verificado
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 text-text-muted mt-1">
                <MapPin className="w-4 h-4 text-neon" />
                {box.address}
              </div>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{box.rating}</span>
                  <span className="text-text-muted text-sm">({typeof box.reviews === 'number' ? box.reviews : reviews.length} resenas)</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-muted text-sm">
                  <Users className="w-4 h-4" />
                  {box.members} miembros
                </div>
                <div className="flex items-center gap-1.5 text-text-muted text-sm">
                  <Award className="w-4 h-4" />
                  {typeof box.coaches === 'number' ? box.coaches : coaches.length} coaches
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Contactar
              </Button>
              <Button variant="primary" size="sm">
                Unirme
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-1 bg-surface-light rounded-xl p-1 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-neon text-black font-bold shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                      : 'text-text-muted hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Info */}
            {activeTab === 'Info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <Card hover={false}>
                  <h2 className="text-lg font-bold mb-3">Sobre el Box</h2>
                  <p className="text-text-muted leading-relaxed">{box.description}</p>
                </Card>

                <Card hover={false}>
                  <h2 className="text-lg font-bold mb-4">Amenidades</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {box.amenities.map((a) => (
                      <div
                        key={a}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-surface-lighter border border-border"
                      >
                        <span className="text-neon">{amenityIcons[a] ?? <Zap className="w-4 h-4" />}</span>
                        <span className="text-sm font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Gallery */}
                <Card hover={false}>
                  <h2 className="text-lg font-bold mb-4">Galeria</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'from-neon/20 to-neon/5',
                      'from-purple-500/20 to-purple-500/5',
                      'from-blue-500/20 to-blue-500/5',
                      'from-orange-500/20 to-orange-500/5',
                      'from-neon/15 to-teal-500/10',
                      'from-pink-500/20 to-pink-500/5',
                    ].map((gradient, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} border border-border flex items-center justify-center`}
                      >
                        <Dumbbell className="w-8 h-8 text-text-muted/30" />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tab: Coaches */}
            {activeTab === 'Coaches' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {coaches.map((coach, i) => (
                  <Card key={i} hover={false} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon/20 to-neon/5 border border-neon/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-neon">{coach.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold">{coach.name}</h3>
                        <span className="text-xs font-bold text-neon bg-neon/10 border border-neon/30 px-2 py-0.5 rounded-full">
                          {coach.level}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mt-0.5">{coach.specialty}</p>
                      <p className="text-xs text-text-muted mt-0.5">{coach.years} anos de experiencia</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Tab: WODs */}
            {activeTab === 'WODs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {box.wods.map((wod, i) => (
                  <Card key={i} hover={false}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg">{wod.name}</h3>
                      <span className="text-xs font-bold text-neon bg-neon/10 border border-neon/30 px-3 py-1 rounded-full">
                        {wod.type}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {wod.movements.map((m, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Tab: Horarios */}
            {activeTab === 'Horarios' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <Card hover={false}>
                  <h2 className="text-lg font-bold mb-4">Horario Semanal</h2>
                  <div className="space-y-3">
                    {box.schedule.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <span className="font-medium">{s.day}</span>
                        <span className={`text-sm font-semibold ${s.hours === 'Cerrado' ? 'text-red-400' : 'text-neon'}`}>
                          {s.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card hover={false}>
                  <h2 className="text-lg font-bold mb-4">Clases de Hoy</h2>
                  <div className="space-y-3">
                    {box.upcomingClasses.map((cls, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-lighter border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 text-center">
                            <span className="text-sm font-bold text-neon">{cls.time}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{cls.name}</p>
                            <p className="text-xs text-text-muted">
                              {cls.spots === 0 ? 'Sin lugares' : `${cls.spots} lugares disponibles`}
                            </p>
                          </div>
                        </div>
                        <button
                          disabled={cls.spots === 0}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            cls.spots === 0
                              ? 'bg-surface text-text-muted cursor-not-allowed opacity-50'
                              : 'bg-neon/10 text-neon border border-neon/30 hover:bg-neon hover:text-black'
                          }`}
                        >
                          {cls.spots === 0 ? 'Lleno' : 'Reservar'}
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tab: Reseñas */}
            {activeTab === 'Resenas' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center gap-6 p-6 bg-surface-light rounded-2xl border border-border mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-black text-neon">{box.rating}</div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${s <= Math.round(box.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-border'}`} />
                      ))}
                    </div>
                    <div className="text-xs text-text-muted mt-1">{reviews.length} resenas</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => r.rating === star).length;
                      const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-4 text-text-muted">{star}</span>
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <div className="flex-1 bg-surface-lighter rounded-full h-1.5">
                            <div className="bg-neon rounded-full h-1.5 transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-4 text-text-muted">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {reviews.map((r, i) => (
                  <Card key={i} hover={false}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-neon">{r.author[0]}</span>
                        </div>
                        <span className="font-semibold">{r.author}</span>
                      </div>
                      <span className="text-xs text-text-muted">{r.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-border'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{r.text}</p>
                  </Card>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0 space-y-4">
            {/* Precio */}
            <Card hover={false} glow>
              <div className="text-center">
                <p className="text-text-muted text-sm mb-1">Membresia mensual</p>
                <p className="text-3xl font-black text-neon">
                  ${box.monthlyPrice.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted mb-4">ARS / mes</p>
                <Button variant="primary" className="w-full mb-2">
                  Unirme al Box
                </Button>
                <Button variant="secondary" className="w-full">
                  Clase de prueba gratis
                </Button>
              </div>
            </Card>

            {/* Contacto */}
            <Card hover={false}>
              <h3 className="font-bold mb-3">Contacto</h3>
              <div className="space-y-3">
                <a href={`tel:${box.phone}`} className="flex items-center gap-3 text-sm text-text-muted hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-neon flex-shrink-0" />
                  {box.phone}
                </a>
                <a href={`https://${box.website}`} className="flex items-center gap-3 text-sm text-text-muted hover:text-foreground transition-colors">
                  <Globe className="w-4 h-4 text-neon flex-shrink-0" />
                  {box.website}
                </a>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <Instagram className="w-4 h-4 text-neon flex-shrink-0" />
                  {box.instagram}
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <MapPin className="w-4 h-4 text-neon flex-shrink-0" />
                  {box.city}
                </div>
              </div>
            </Card>

            {/* Horario quick */}
            <Card hover={false}>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon" />
                Horarios
              </h3>
              <div className="space-y-2">
                {box.schedule.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-text-muted">{s.day}</span>
                    <span className={s.hours === 'Cerrado' ? 'text-red-400' : 'text-foreground font-medium'}>
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card hover={false}>
              <h3 className="font-bold mb-3">Estadisticas</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Miembros', value: box.members, icon: Users },
                  { label: 'Coaches', value: typeof box.coaches === 'number' ? box.coaches : coaches.length, icon: Award },
                  { label: 'Rating', value: box.rating, icon: Star },
                  { label: 'Resenas', value: typeof box.reviews === 'number' ? box.reviews : reviews.length, icon: MessageCircle },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-surface-lighter rounded-xl p-3 text-center border border-border">
                    <Icon className="w-4 h-4 text-neon mx-auto mb-1" />
                    <div className="font-bold text-lg">{value}</div>
                    <div className="text-xs text-text-muted">{label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

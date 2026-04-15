'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trophy, MapPin, Calendar, Users, Search, Filter, Zap } from 'lucide-react';

const mockCompetitions = [
  {
    id: '1',
    name: 'WodMatch Open 2026',
    date: '15 Abril, 2026',
    location: 'Buenos Aires, Argentina',
    category: 'RX / Scaled',
    participants: 120,
    maxParticipants: 200,
    price: 50,
    status: 'upcoming' as const,
    image: null,
  },
  {
    id: '2',
    name: 'CrossFit Challenge Series',
    date: '22 Mayo, 2026',
    location: 'Santiago, Chile',
    category: 'Elite / Teams',
    participants: 80,
    maxParticipants: 100,
    price: 75,
    status: 'upcoming' as const,
    image: null,
  },
  {
    id: '3',
    name: 'Throwdown del Sur',
    date: '10 Junio, 2026',
    location: 'Montevideo, Uruguay',
    category: 'RX',
    participants: 60,
    maxParticipants: 80,
    price: 40,
    status: 'upcoming' as const,
    image: null,
  },
  {
    id: '4',
    name: 'Andes Invitational',
    date: '5 Julio, 2026',
    location: 'Bogota, Colombia',
    category: 'Elite',
    participants: 45,
    maxParticipants: 50,
    price: 100,
    status: 'upcoming' as const,
    image: null,
  },
];

export default function CompetitionsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'rx', 'scaled', 'elite', 'teams'];

  const filtered = mockCompetitions.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || c.category.toLowerCase().includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Competencias</span>
          </h1>
          <p className="text-text-muted text-lg">Encuentra tu proximo desafio y demuestra de que estas hecho</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <Input
              placeholder="Buscar competencias..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'bg-neon text-black'
                    : 'bg-surface border border-border text-text-muted hover:text-foreground hover:border-neon/30'
                }`}
              >
                {f === 'all' ? 'Todas' : f.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Competition Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((comp) => (
            <motion.div
              key={comp.id}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
            >
              <Card className="overflow-hidden p-0">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-surface-light to-surface-lighter flex items-center justify-center relative">
                  <Trophy className="w-16 h-16 text-neon/20" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-neon/10 text-neon text-xs font-bold border border-neon/20">
                      {comp.category}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-surface/80 text-foreground text-xs font-bold backdrop-blur-sm">
                      ${comp.price} USD
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{comp.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Calendar className="w-4 h-4 text-neon" />
                      {comp.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="w-4 h-4 text-neon" />
                      {comp.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Users className="w-4 h-4 text-neon" />
                      {comp.participants}/{comp.maxParticipants} inscriptos
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-surface-lighter rounded-full h-2 mb-4">
                    <div
                      className="gradient-neon rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(comp.participants / comp.maxParticipants) * 100}%` }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Zap className="w-4 h-4 mr-1 inline" />
                      Inscribirme
                    </Button>
                    <Button variant="secondary" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No se encontraron competencias</h3>
            <p className="text-text-muted">Intenta con otros filtros o terminos de busqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

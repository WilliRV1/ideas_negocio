'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Dumbbell, MapPin, Users, Search, Star, Clock, CheckCircle, Filter } from 'lucide-react';

const mockBoxes = [
  {
    id: '1',
    name: 'CrossFit La Bestia',
    address: 'Av. Corrientes 1234, Buenos Aires',
    members: 150,
    rating: 4.8,
    coaches: 5,
    verified: true,
    amenities: ['Parking', 'Vestuarios', 'Open Box'],
    schedule: 'Lun-Vie 6:00-21:00 | Sab 8:00-14:00',
  },
  {
    id: '2',
    name: 'Box Guerrero Fitness',
    address: 'Calle Providencia 567, Santiago',
    members: 80,
    rating: 4.6,
    coaches: 3,
    verified: true,
    amenities: ['Vestuarios', 'Tienda'],
    schedule: 'Lun-Vie 7:00-20:00 | Sab 9:00-13:00',
  },
  {
    id: '3',
    name: 'CrossFit Titan',
    address: 'Rambla Sur 890, Montevideo',
    members: 120,
    rating: 4.9,
    coaches: 4,
    verified: true,
    amenities: ['Parking', 'Vestuarios', 'Cafe'],
    schedule: 'Lun-Sab 6:00-22:00',
  },
  {
    id: '4',
    name: 'WOD House Colombia',
    address: 'Carrera 15 #45-12, Bogota',
    members: 95,
    rating: 4.7,
    coaches: 4,
    verified: false,
    amenities: ['Vestuarios', 'Open Box', 'Fisioterapia'],
    schedule: 'Lun-Vie 5:30-21:00 | Sab 7:00-15:00',
  },
  {
    id: '5',
    name: 'CrossFit Fuego',
    address: 'Av. Libertador 2345, Lima',
    members: 110,
    rating: 4.5,
    coaches: 6,
    verified: true,
    amenities: ['Parking', 'Vestuarios', 'Tienda', 'Cafe'],
    schedule: 'Lun-Vie 6:00-21:00 | Sab 8:00-14:00',
  },
  {
    id: '6',
    name: 'The Garage Box',
    address: 'Calle 50 #8-90, Medellin',
    members: 65,
    rating: 4.8,
    coaches: 3,
    verified: true,
    amenities: ['Vestuarios', 'Open Box'],
    schedule: 'Lun-Vie 6:00-20:00 | Sab 8:00-12:00',
  },
];

export default function BoxesPage() {
  const [search, setSearch] = useState('');

  const filtered = mockBoxes.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Boxes</span>
          </h1>
          <p className="text-text-muted text-lg">Descubri boxes de CrossFit en toda Latinoamerica</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-xl"
        >
          <Input
            placeholder="Buscar boxes por nombre o ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </motion.div>

        {/* Box Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((box) => (
            <motion.div
              key={box.id}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                        {box.name}
                        {box.verified && <CheckCircle className="w-4 h-4 text-neon" />}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-text-muted">
                        <MapPin className="w-3 h-3" />
                        {box.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-foreground">{box.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Users className="w-4 h-4" />
                    {box.members} miembros
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Users className="w-4 h-4" />
                    {box.coaches} coaches
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
                  <Clock className="w-4 h-4 text-neon" />
                  {box.schedule}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {box.amenities.map((a) => (
                    <span
                      key={a}
                      className="px-2.5 py-1 rounded-lg bg-surface-lighter text-xs text-text-muted border border-border"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto flex gap-3">
                  <Link href={`/boxes/${box.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Ver Box
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm">
                    Contactar
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No se encontraron boxes</h3>
            <p className="text-text-muted">Intenta con otros terminos de busqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

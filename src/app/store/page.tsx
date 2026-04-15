'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Zap, ShoppingBag, Gift, Award, Star, CheckCircle, X,
  Shirt, Dumbbell, Coffee, Trophy, Ticket, Package,
  TrendingUp, Users, Calendar, Heart,
} from 'lucide-react';

const mockPoints = 1250;

type Category = 'Todos' | 'Ropa' | 'Suplementos' | 'Accesorios' | 'Experiencias';

type Product = {
  id: string;
  name: string;
  description: string;
  points: number;
  category: Exclude<Category, 'Todos'>;
  stock: number;
  popular?: boolean;
  gradient: string;
  icon: React.ElementType;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Remera WodMatch',
    description: 'Remera oficial de WodMatch. Dry-fit, talle unisex. Perfecta para entrenar.',
    points: 800,
    category: 'Ropa',
    stock: 15,
    popular: true,
    gradient: 'from-neon/20 to-teal-500/10',
    icon: Shirt,
  },
  {
    id: '2',
    name: 'Musculosa de Competencia',
    description: 'Musculosa premium con tecnologia de absorcion de humedad. Incluye logo WodMatch.',
    points: 600,
    category: 'Ropa',
    stock: 8,
    gradient: 'from-purple-500/20 to-purple-500/5',
    icon: Shirt,
  },
  {
    id: '3',
    name: 'Shorts de Entrenamiento',
    description: 'Short ligero con bolsillo y cintura elastica. Ideal para WODs intensos.',
    points: 750,
    category: 'Ropa',
    stock: 0,
    gradient: 'from-blue-500/20 to-blue-500/5',
    icon: Shirt,
  },
  {
    id: '4',
    name: 'Proteina Whey 1kg',
    description: 'Proteina de suero de leche de alta calidad. Sabor chocolate. 30g de proteina por servicio.',
    points: 1500,
    category: 'Suplementos',
    stock: 5,
    popular: true,
    gradient: 'from-orange-500/20 to-orange-500/5',
    icon: Package,
  },
  {
    id: '5',
    name: 'Creatina 300g',
    description: 'Creatina monohidrato pura. Sin aditivos. Mejora el rendimiento y la recuperacion.',
    points: 900,
    category: 'Suplementos',
    stock: 10,
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    icon: Package,
  },
  {
    id: '6',
    name: 'Pre-workout 30 servicios',
    description: 'Formula de pre-entreno con beta-alanina, cafeina y citrulina. Sabor watermelon.',
    points: 1100,
    category: 'Suplementos',
    stock: 7,
    gradient: 'from-red-500/20 to-red-500/5',
    icon: Zap,
  },
  {
    id: '7',
    name: 'Jump Rope Speed',
    description: 'Soga de salto de velocidad con cables intercambiables. Ideal para doble unders.',
    points: 700,
    category: 'Accesorios',
    stock: 12,
    popular: true,
    gradient: 'from-neon/15 to-neon/5',
    icon: Dumbbell,
  },
  {
    id: '8',
    name: 'Grips de Gimnasia',
    description: 'Grips de cuero genuino para barras. Proteccion total para tus manos.',
    points: 500,
    category: 'Accesorios',
    stock: 20,
    gradient: 'from-amber-500/20 to-amber-500/5',
    icon: Dumbbell,
  },
  {
    id: '9',
    name: 'Botella Termo 750ml',
    description: 'Botella termo con logo WodMatch. Mantiene frio 24hs y calor 12hs.',
    points: 650,
    category: 'Accesorios',
    stock: 18,
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    icon: Coffee,
  },
  {
    id: '10',
    name: 'Entrada a Competencia Regional',
    description: 'Acceso VIP para 1 persona a cualquier competencia regional de WodMatch del proximo mes.',
    points: 2000,
    category: 'Experiencias',
    stock: 3,
    popular: true,
    gradient: 'from-neon/30 to-teal-400/20',
    icon: Trophy,
  },
  {
    id: '11',
    name: 'Clase con Coach Elite',
    description: 'Sesion privada de 1 hora con un coach certificado CF-L3 de tu eleccion.',
    points: 1800,
    category: 'Experiencias',
    stock: 6,
    gradient: 'from-violet-500/20 to-violet-500/5',
    icon: Award,
  },
  {
    id: '12',
    name: 'Mes Gratis en Box Partner',
    description: 'Un mes de membresia gratis en cualquier box verificado de la red WodMatch.',
    points: 3000,
    category: 'Experiencias',
    stock: 2,
    gradient: 'from-pink-500/20 to-pink-500/5',
    icon: Ticket,
  },
];

const howToEarn = [
  { icon: Calendar, label: 'Completar WODs', points: '+50 pts', desc: 'Por cada WOD registrado' },
  { icon: Users, label: 'Invitar amigos', points: '+200 pts', desc: 'Por cada amigo que se registre' },
  { icon: Trophy, label: 'Participar en competencias', points: '+500 pts', desc: 'Por competencia completada' },
  { icon: TrendingUp, label: 'Streak semanal', points: '+100 pts', desc: '5 WODs en una semana' },
  { icon: Heart, label: 'Dejar una reseña', points: '+30 pts', desc: 'Por resena verificada' },
  { icon: Star, label: 'Perfil completo', points: '+150 pts', desc: 'Una sola vez' },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [redeeming, setRedeeming] = useState<Product | null>(null);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [points, setPoints] = useState(mockPoints);

  const categories: Category[] = ['Todos', 'Ropa', 'Suplementos', 'Accesorios', 'Experiencias'];

  const filtered = activeCategory === 'Todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  function handleRedeem(product: Product) {
    if (points < product.points || product.stock === 0 || redeemed.includes(product.id)) return;
    setRedeeming(product);
  }

  function confirmRedeem() {
    if (!redeeming) return;
    setPoints((p) => p - redeeming.points);
    setRedeemed((prev) => [...prev, redeeming.id]);
    setRedeeming(null);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black mb-2">
            <span className="gradient-text">Tienda</span>
          </h1>
          <p className="text-text-muted text-lg">Redimi tus puntos por premios exclusivos</p>
        </motion.div>

        {/* Points banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-neon/30 bg-gradient-to-r from-neon/10 via-surface to-surface p-6">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-neon) 0%, transparent 50%)',
            }} />
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-text-muted text-sm mb-1">Tus puntos disponibles</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-neon text-glow">{points.toLocaleString()}</span>
                  <span className="text-xl text-text-muted mb-1">pts</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-neon/10 border border-neon/30 rounded-xl">
                <Zap className="w-5 h-5 text-neon" />
                <span className="text-sm font-semibold">Nivel: <span className="text-neon">RX Athlete</span></span>
              </div>
            </div>
            {/* Progress to next level */}
            <div className="relative mt-4">
              <div className="flex justify-between text-xs text-text-muted mb-1.5">
                <span>Progreso al siguiente nivel (Elite)</span>
                <span>{points} / 2000 pts</span>
              </div>
              <div className="h-2 bg-surface-lighter rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((points / 2000) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-neon to-teal-400 shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]'
                  : 'bg-surface-light text-text-muted border border-border hover:border-neon/50 hover:text-foreground'
              }`}
            >
              {cat === 'Ropa' && <Shirt className="w-4 h-4" />}
              {cat === 'Suplementos' && <Package className="w-4 h-4" />}
              {cat === 'Accesorios' && <Dumbbell className="w-4 h-4" />}
              {cat === 'Experiencias' && <Trophy className="w-4 h-4" />}
              {cat === 'Todos' && <Gift className="w-4 h-4" />}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div
          key={activeCategory}
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16"
        >
          {filtered.map((product) => {
            const alreadyRedeemed = redeemed.includes(product.id);
            const canRedeem = points >= product.points && product.stock > 0 && !alreadyRedeemed;
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
              >
                <Card className="h-full flex flex-col relative overflow-hidden" hover={!alreadyRedeemed}>
                  {product.popular && !alreadyRedeemed && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-xs font-bold text-black bg-neon px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Popular
                      </span>
                    </div>
                  )}
                  {alreadyRedeemed && (
                    <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
                      <CheckCircle className="w-10 h-10 text-neon mb-2" />
                      <span className="font-bold text-neon">Canjeado!</span>
                    </div>
                  )}

                  {/* Image placeholder */}
                  <div className={`aspect-video rounded-xl bg-gradient-to-br ${product.gradient} border border-border flex items-center justify-center mb-4`}>
                    <Icon className="w-12 h-12 text-text-muted/40" />
                  </div>

                  {/* Category badge */}
                  <span className="text-xs font-medium text-text-muted bg-surface-lighter border border-border px-2 py-0.5 rounded-full self-start mb-2">
                    {product.category}
                  </span>

                  <h3 className="font-bold text-base mb-1">{product.name}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{product.description}</p>

                  {/* Stock */}
                  {product.stock > 0 && product.stock <= 5 && (
                    <p className="text-xs text-orange-400 mb-2 font-medium">
                      Solo quedan {product.stock} unidades
                    </p>
                  )}
                  {product.stock === 0 && (
                    <p className="text-xs text-red-400 mb-2 font-medium">Sin stock</p>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-neon" />
                      <span className="font-black text-lg text-neon">{product.points.toLocaleString()}</span>
                      <span className="text-xs text-text-muted">pts</span>
                    </div>
                    <button
                      onClick={() => handleRedeem(product)}
                      disabled={!canRedeem}
                      className={`text-sm font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                        alreadyRedeemed
                          ? 'bg-neon/10 text-neon cursor-default'
                          : product.stock === 0
                          ? 'bg-surface-lighter text-text-muted cursor-not-allowed opacity-50'
                          : !canRedeem
                          ? 'bg-surface-lighter text-text-muted cursor-not-allowed opacity-50'
                          : 'bg-neon text-black hover:bg-neon-dark shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]'
                      }`}
                    >
                      {alreadyRedeemed ? 'Canjeado' : product.stock === 0 ? 'Sin stock' : !canRedeem ? 'Puntos insuf.' : 'Canjear'}
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How to earn points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-neon" />
            </div>
            <h2 className="text-2xl font-black">Como ganar puntos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {howToEarn.map(({ icon: Icon, label, points: pts, desc }) => (
              <Card key={label} hover={false} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-sm">{label}</h3>
                    <span className="text-xs font-black text-neon">{pts}</span>
                  </div>
                  <p className="text-xs text-text-muted">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Redemption Modal */}
      <AnimatePresence>
        {redeeming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setRedeeming(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-neon/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(57,255,20,0.15)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-lg">Confirmar canje</h3>
                <button
                  onClick={() => setRedeeming(null)}
                  className="p-1.5 rounded-lg hover:bg-surface-light transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className={`aspect-video rounded-xl bg-gradient-to-br ${redeeming.gradient} border border-border flex items-center justify-center mb-4`}>
                <redeeming.icon className="w-16 h-16 text-text-muted/40" />
              </div>

              <h4 className="font-bold text-base mb-1">{redeeming.name}</h4>
              <p className="text-sm text-text-muted mb-5">{redeeming.description}</p>

              <div className="bg-surface-light rounded-xl p-4 mb-5 border border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Puntos actuales</span>
                  <span className="font-bold text-neon">{points.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Costo del canje</span>
                  <span className="font-bold text-red-400">-{redeeming.points.toLocaleString()} pts</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
                  <span className="text-text-muted">Puntos restantes</span>
                  <span className="font-black">{(points - redeeming.points).toLocaleString()} pts</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setRedeeming(null)}>
                  Cancelar
                </Button>
                <Button variant="primary" className="flex-1" onClick={confirmRedeem}>
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  Confirmar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

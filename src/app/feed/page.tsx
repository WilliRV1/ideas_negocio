'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Heart, MessageCircle, Share2, Send, Image as ImageIcon,
  User, Trophy, Dumbbell, TrendingUp, MoreHorizontal,
} from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    author: 'Maria Gonzalez',
    role: 'athlete',
    time: 'Hace 2 horas',
    content: 'PR en Clean & Jerk! 85kg. Meses de trabajo dieron fruto. Gracias a mi coach y a todo el box por el apoyo.',
    likes: 45,
    comments: 12,
    type: 'wod_result',
  },
  {
    id: '2',
    author: 'CrossFit La Bestia',
    role: 'box_owner',
    time: 'Hace 4 horas',
    content: 'WOD del dia: "Fran" 21-15-9 Thrusters (43/30kg) + Pull-ups. Vengan a darlo todo! Clase de las 18:00 esta completa, quedan lugares para las 19:30.',
    likes: 32,
    comments: 8,
    type: 'announcement',
  },
  {
    id: '3',
    author: 'WodMatch Open 2026',
    role: 'competition_organizer',
    time: 'Hace 6 horas',
    content: 'Se abrieron las inscripciones para el WodMatch Open 2026! Categorias RX y Scaled. Cupos limitados. Early bird hasta el 1 de Abril.',
    likes: 128,
    comments: 34,
    type: 'competition_update',
  },
  {
    id: '4',
    author: 'Carlos Rodriguez',
    role: 'athlete',
    time: 'Hace 8 horas',
    content: 'Primer Murph sub-40 minutos! 38:22. Meta cumplida para este trimestre. El siguiente objetivo: sub-35.',
    likes: 67,
    comments: 15,
    type: 'wod_result',
  },
  {
    id: '5',
    author: 'Box Guerrero Fitness',
    role: 'box_owner',
    time: 'Ayer',
    content: 'Nuevo equipamiento! Llegaron las Assault Bikes y Concept2 SkiErg. Los esperamos para probarlas manana en el WOD matutino.',
    likes: 54,
    comments: 9,
    type: 'announcement',
  },
];

const roleIcons: Record<string, typeof User> = {
  athlete: User,
  box_owner: Dumbbell,
  competition_organizer: Trophy,
};

const roleColors: Record<string, string> = {
  athlete: 'bg-blue-500/10 text-blue-400',
  box_owner: 'bg-neon/10 text-neon',
  competition_organizer: 'bg-purple-500/10 text-purple-400',
};

const roleLabels: Record<string, string> = {
  athlete: 'Atleta',
  box_owner: 'Box',
  competition_organizer: 'Organizador',
};

export default function FeedPage() {
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black mb-3">
            <span className="gradient-text">Feed</span>
          </h1>
          <p className="text-text-muted">Lo ultimo de la comunidad WodMatch</p>
        </motion.div>

        {/* New Post */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card hover={false}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-neon" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Que estas entrenando hoy?"
                  className="w-full bg-transparent border-none resize-none text-foreground placeholder-text-muted focus:outline-none min-h-[80px]"
                />
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface-light text-text-muted hover:text-neon transition-colors cursor-pointer">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-light text-text-muted hover:text-neon transition-colors cursor-pointer">
                      <TrendingUp className="w-5 h-5" />
                    </button>
                  </div>
                  <Button size="sm" disabled={!newPost.trim()}>
                    <Send className="w-4 h-4 mr-1 inline" />
                    Publicar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Posts */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-4"
        >
          {mockPosts.map((post) => {
            const RoleIcon = roleIcons[post.role];
            const isLiked = likedPosts.has(post.id);

            return (
              <motion.div
                key={post.id}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card hover={false}>
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-lighter flex items-center justify-center">
                        <RoleIcon className="w-5 h-5 text-neon" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{post.author}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${roleColors[post.role]}`}>
                            {roleLabels[post.role]}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted">{post.time}</span>
                      </div>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-surface-light text-text-muted cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm leading-relaxed mb-4">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-1 pt-3 border-t border-border">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                        isLiked
                          ? 'text-red-400 bg-red-400/10'
                          : 'text-text-muted hover:text-red-400 hover:bg-surface-light'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-400' : ''}`} />
                      {post.likes + (isLiked ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-neon hover:bg-surface-light transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-neon hover:bg-surface-light transition-colors cursor-pointer">
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

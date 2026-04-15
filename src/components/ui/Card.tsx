'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, glow = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      onClick={onClick}
      className={`bg-surface border border-border rounded-2xl p-6 transition-all duration-300 ${hover ? 'cursor-pointer hover:border-neon/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]' : ''} ${glow ? 'neon-border glow-pulse' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Star, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ItemType = "movie" | "book" | "repo" | "product";

export interface ItemProps {
  id: string | number;
  type: ItemType;
  title: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  tags?: string[];
  link?: string;
  similarity?: number;
}

export function ItemCard({
  id,
  type,
  title,
  description,
  imageUrl,
  rating,
  tags,
  similarity,
  link,
}: ItemProps) {
  const isExternal = link?.startsWith("http");

  return (
    <motion.a
      href={link || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl overflow-hidden flex flex-col group cursor-pointer border border-white/5 hover:border-primary/50 hover:neon-glow transition-all duration-300 h-full"
    >
      {imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      ) : (
        <div className="relative h-48 w-full bg-secondary/50 flex items-center justify-center">
          <span className="text-muted-foreground font-medium uppercase tracking-widest">{type}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col mt-[-2rem] z-10 relative">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/10 text-xs font-semibold capitalize text-primary">
            {type}
          </Badge>
          {similarity && (
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/20 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {Math.round(similarity * 100)}% Match
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          {rating ? (
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          ) : <div />}

          <button className="text-gray-500 hover:text-pink-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.a>
  );
}

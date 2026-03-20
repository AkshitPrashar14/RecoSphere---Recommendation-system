"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Film, Book, Github, ShoppingBag, Home, Compass } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies", href: "/movies", icon: Film },
  { name: "Books", href: "/books", icon: Book },
  { name: "Repositories", href: "/repos", icon: Github },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Trending", href: "/trending", icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col border-r border-white/10 glass bg-black/20 text-white fixed top-0 left-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient tracking-tight">RecoSphere<span className="text-primary">Lite</span></h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="block relative group">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white group-hover:bg-white/5'}`}>
                <Icon size={20} className={isActive ? "text-primary neon-glow rounded-full" : ""} />
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 m-4 rounded-xl bg-white/5 blur-backdrop">
        <p className="text-xs text-gray-400 text-center">AI Powered Recommendations</p>
      </div>
    </aside>
  );
}

"use client";

import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="h-20 border-b border-white/10 glass bg-black/20 sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5 text-gray-400" />
        </Button>
        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI recommendations..." 
            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary text-white rounded-full transition-all focus-visible:neon-glow"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full neon-glow"></span>
        </Button>
        <Avatar className="w-9 h-9 border border-primary/50 cursor-pointer hover:neon-glow transition-all">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}


import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface BlogPost {
  id: number | string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string; 
  imageUrl: string;
  imagePosX?: number; // Porcentagem X (0-100)
  imagePosY?: number; // Porcentagem Y (0-100)
  additionalImages?: string[]; 
  readTime: string;
}

export interface Resource {
  id: number;
  title: string;
  type: string;
  description: string;
  icon: React.ReactNode;
}

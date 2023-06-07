// components/Section.tsx
import React, { ReactNode } from "react";
import "./section.module.css";

interface SectionProps {
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => (
  <section className="vh-100 gradient-custom">{children}</section>
);

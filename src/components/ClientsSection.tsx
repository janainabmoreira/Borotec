"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

import logoPetrobras from '@/assets/logo-petrobras.webp';
import logoVale from '@/assets/logo-vale.webp';
import logoEmbraer from '@/assets/logo-embraer.webp';
import logoBasf from '@/assets/logo-basf.webp';
import logoAmbev from '@/assets/logo-ambev.webp';
import logoBraskem from '@/assets/logo-braskem.webp';
import logoGerdau from '@/assets/logo-gerdau.webp';
import logoCsn from '@/assets/logo-csn.webp';
import logoUsiminas from '@/assets/logo-usiminas.webp';
import logoWeg from '@/assets/logo-weg.webp';

interface Logo {
  id: string;
  description: string;
  image: string;
}

const logos: Logo[] = [
  {
    id: "logo-petrobras",
    description: "Petrobras",
    image: logoPetrobras,
  },
  {
    id: "logo-vale",
    description: "Vale",
    image: logoVale,
  },
  {
    id: "logo-embraer",
    description: "Embraer",
    image: logoEmbraer,
  },
  {
    id: "logo-basf",
    description: "BASF",
    image: logoBasf,
  },
  {
    id: "logo-ambev",
    description: "Ambev",
    image: logoAmbev,
  },
  {
    id: "logo-braskem",
    description: "Braskem",
    image: logoBraskem,
  },
  {
    id: "logo-gerdau",
    description: "Gerdau",
    image: logoGerdau,
  },
  {
    id: "logo-csn",
    description: "CSN",
    image: logoCsn,
  },
  {
    id: "logo-usiminas",
    description: "Usiminas",
    image: logoUsiminas,
  },
  {
    id: "logo-weg",
    description: "WEG",
    image: logoWeg,
  },
];

const ClientsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-col items-center gap-6">
            <p className="font-heading text-sm font-semibold text-muted-foreground text-center uppercase tracking-wider">
              Empresas que confiam na BOROTEC
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-in" delay={200}>
          <div className="pt-10 md:pt-16">
            <div className="relative mx-auto flex items-center">
              <Carousel
                opts={{ loop: true }}
                plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {logos.map((logo) => (
                    <CarouselItem
                      key={logo.id}
                      className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4"
                    >
                      <div className="flex items-center justify-center h-24 md:h-28 p-4 transition-all duration-300 hover:scale-110">
                        <img
                          src={logo.image}
                          alt={logo.description}
                          loading="eager"
                          className="h-16 md:h-20 w-auto object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ClientsSection;

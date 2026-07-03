"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#timeline' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

export function HeroSection() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const sections = ["home", "about", "skills", "projects", "timeline", "certificates", "education", "contact"];
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 180;
            
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial call
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            window.scrollTo({
                top: el.offsetTop - offset,
                behavior: "smooth",
            });
        }
    };

    // Typewriter effect rotating roles
    const words = ['Software Engineer', 'Flutter Developer', 'AI Automation Specialist', 'Chatbot Architect', 'Creative Leader'];
    const [typedText, setTypedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setTypedText(currentWord.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
            }, 60);
        } else {
            timer = setTimeout(() => {
                setTypedText(currentWord.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
            }, 110);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            timer = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setWordIndex(prev => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex]);

    return (
        <>
            <HeroHeader activeSection={activeSection} />
            <main className="overflow-hidden bg-soft-black">
                {/* Background layout blur effects */}
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.04)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.03)_0,hsla(0,0%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
                </div>
                <section id="home">
                    <div className="relative pt-28 md:pt-36">
                        {/* Background Graphic */}
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    {/* Status Badge - Available for Internship */}
                                    <div className="hover:bg-stone-gray/30 bg-stone-gray/10 group mx-auto flex w-fit items-center gap-3.5 rounded-full border border-white/5 p-1 pl-4 pr-5 shadow-md transition-all duration-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <span className="text-warm-white text-[10px] tracking-widest uppercase font-semibold">Available for Internship</span>
                                    </div>
                        
                                    {/* Headline */}
                                    <h1
                                        className="mt-8 max-w-5xl mx-auto text-balance text-5xl md:text-7xl lg:mt-12 xl:text-[5.5rem] font-display font-bold leading-[1.05] tracking-tight text-warm-white">
                                        Hi, I'm <br/>
                                        <span className="text-primary">Divyanshu Kushwaha</span> 👋
                                    </h1>
                                    
                                    {/* Recruiter aligned Subtitle text */}
                                    <p className="mx-auto mt-6 max-w-3xl text-balance text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-semibold leading-relaxed">
                                        Diploma CSE Student • Flutter Developer • AI & Vibe Coding Enthusiast
                                    </p>

                                    <p className="mx-auto mt-3 max-w-xl text-[11px] sm:text-xs text-muted-gray">
                                        Currently building <span className="text-primary font-bold">{typedText}</span><span className="text-primary animate-pulse ml-0.5">|</span>
                                    </p>

                                    {/* Description */}
                                    <p
                                        className="mx-auto mt-6 max-w-xl text-balance text-xs sm:text-sm text-soft-gray leading-relaxed">
                                        CSE student at Amity University, Greater Noida — passionate about software development, AI chatbot automations, leadership, and building real solutions that make an impact.
                                    </p>
                                </AnimatedGroup>

                                {/* Action Buttons */}
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <div className="rounded-[14px]">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-6 text-xs uppercase tracking-wider font-semibold cursor-none">
                                            <Link href="#projects" onClick={(e) => handleScrollTo(e, "projects")}>
                                                <span className="text-nowrap">View My Work</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="h-12 rounded-xl px-6 text-xs uppercase tracking-wider font-semibold border-white/10 hover:bg-white/5 hover:border-white/20 cursor-none">
                                        <a href="/assets/resume_original.jpg" download="Divyanshu_Resume.jpg">
                                            <span className="text-nowrap">Download Resume</span>
                                        </a>
                                    </Button>
                                </AnimatedGroup>

                                {/* Social Links below buttons */}
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    delayChildren: 0.85,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-8 flex items-center justify-center gap-6">
                                    <a
                                        href="https://www.linkedin.com/in/mr-divyanshu-314572242"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-gray hover:text-primary transition-all scale-100 hover:scale-115 duration-300 cursor-none"
                                        aria-label="LinkedIn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                    </a>
                                    <a
                                        href="https://github.com/Divyanshukushwaha"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-gray hover:text-primary transition-all scale-100 hover:scale-115 duration-300 cursor-none"
                                        aria-label="GitHub"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/divyan_shu_kushwaha"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-gray hover:text-primary transition-all scale-100 hover:scale-115 duration-300 cursor-none"
                                        aria-label="Instagram"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                    </a>
                                    <a
                                        href="mailto:divyanshukushawha39@gmail.com"
                                        className="text-muted-gray hover:text-primary transition-all scale-100 hover:scale-115 duration-300 cursor-none"
                                        aria-label="Email"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    </a>
                                </AnimatedGroup>

                                {/* Stats Block */}
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    delayChildren: 0.9,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-10 flex justify-center gap-12 border-t border-white/5 pt-8 max-w-sm mx-auto">
                                    <div className="text-center">
                                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary block leading-none">4+</span>
                                        <span className="text-[9px] uppercase tracking-widest font-semibold text-muted-gray mt-1 block">Certificates</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary block leading-none">1</span>
                                        <span className="text-[9px] uppercase tracking-widest font-semibold text-muted-gray mt-1 block">Live App</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary block leading-none">2</span>
                                        <span className="text-[9px] uppercase tracking-widest font-semibold text-muted-gray mt-1 block">Events</span>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Showcase Visual */}
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-6 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-soft-black absolute inset-0 z-10 from-transparent from-45%"
                                />
                                <div className="bg-stone-gray/10 relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/5 p-4 shadow-2xl">
                                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                                        <Image
                                            className="object-cover object-[center_35%] scale-102 hover:scale-105 transition-transform duration-1000"
                                            src="/assets/divyanshu_mountain.jpg"
                                            alt="Divyanshu Kushwaha in Mountains"
                                            fill
                                            priority
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

                {/* Tech logo grid */}
                <section className="bg-transparent pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100 pointer-events-none">
                            <span className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold">
                                Technologies & Stacks
                            </span>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-6 transition-all duration-500 items-center justify-items-center opacity-60">
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Flutter
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Firebase
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Dart
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Python
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                HTML & CSS
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Generative AI
                            </div>
                            <div className="text-center font-display font-bold uppercase tracking-wider text-muted-gray text-xs">
                                Azure AI Services
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

const HeroHeader = ({ activeSection }: { activeSection: string }) => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        setMenuState(false);
        if (element) {
            const offset = 80;
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group mt-2">
                <div className={cn('mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12 rounded-2xl border border-white/5 bg-soft-black/20 backdrop-blur-md', isScrolled && 'bg-soft-black/60 max-w-5xl border-white/10 shadow-lg')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a
                                href="#home"
                                onClick={(e) => handleNavClick(e, "#home")}
                                aria-label="home"
                                className="flex items-center space-x-2 font-display uppercase tracking-widest text-sm font-bold text-warm-white hover-target cursor-none">
                                <span>Divyanshu</span><span className="text-accent-terracotta">.</span>
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-none p-2.5 lg:hidden text-warm-white">
                                {menuState ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>

                        {/* Middle Links on desktop with Active Highlights */}
                        <div className="absolute inset-x-0 mx-auto hidden size-fit lg:block">
                            <ul className="flex gap-6 text-[10px] uppercase tracking-wider font-semibold">
                                {menuItems.map((item, index) => {
                                    const sectionId = item.href.replace("#", "");
                                    const isActive = activeSection === sectionId;
                                    return (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                className={cn(
                                                    "text-muted-gray hover:text-warm-white block duration-150 cursor-none relative py-1",
                                                    isActive && "text-primary font-bold"
                                                )}
                                            >
                                                <span>{item.name}</span>
                                                {isActive && (
                                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Right Buttons - Connect & Resume */}
                        <div className="bg-soft-black group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/5 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden w-full">
                                <ul className="space-y-6 text-sm uppercase tracking-wider font-semibold">
                                    {menuItems.map((item, index) => {
                                        const sectionId = item.href.replace("#", "");
                                        const isActive = activeSection === sectionId;
                                        return (
                                            <li key={index}>
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => handleNavClick(e, item.href)}
                                                    className={cn(
                                                        "text-muted-gray hover:text-warm-white block duration-150 cursor-none",
                                                        isActive && "text-primary font-bold"
                                                    )}
                                                >
                                                    <span>{item.name}</span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit items-center">
                                {/* Resume CTA */}
                                <a
                                    href="/assets/resume_original.jpg"
                                    download="Divyanshu_Resume.jpg"
                                    className="text-xs uppercase tracking-wider font-semibold text-muted-gray hover:text-warm-white cursor-none flex items-center gap-1.5 px-3 py-1.5"
                                >
                                    <Download size={13} className="text-primary" />
                                    <span>Resume</span>
                                </a>
                                
                                <Button
                                    asChild
                                    size="sm"
                                    className="rounded-full px-5 text-xs font-semibold uppercase tracking-wider cursor-none shadow-md hover:shadow-accent-terracotta/20">
                                    <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                                        <span>Connect</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

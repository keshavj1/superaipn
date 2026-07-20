import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Globe2, CheckCircle2, PlayCircle, ArrowRight,
    Sparkles, Code, Target, BookOpen, BrainCircuit,
    MessageSquare, UserCircle, ShieldCheck, Microscope,
    Bot, Car, GitMerge, LayoutGrid, MonitorPlay, BookMarked, Eye
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/education.css';
// Served from public/videos — not bundled, so large media never enters the build.
const EndToEndLabsVideo = '/videos/End_to_End_Labs_PP.mp4';
const AITeacherTrainingVideo = '/videos/AI_Teacher_Training_PP.mp4';
const HigherEducationVideo = '/videos/Higher_Education_PP.mp4';
const K12LearningPlatformVideo = '/videos/K12_Learning_Platform_PP.mp4';
const AIRoboticsBooksVideo = '/videos/AI_Robotics_Books_Class_1_12_PP.mp4';


const useReveal = () => {
    const revealRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealRefs.current.forEach(ref => observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    return addToRefs;
};

// --- DATA ---
const stats = [
    { value: 500, suffix: "K+", label: "Students Trained" },
    { value: 10, suffix: "K+", label: "Teachers Certified" },
    { value: 14, suffix: "+", label: "Countries Reached" }
];

const countries = [
    "India", "Mexico", "United States", "Canada", "Italy", "Ghana", "Oman",
    "Bahrain", "Sri Lanka", "Malaysia", "United Kingdom", "Caribbean Islands",
    "South Africa", "United Arab Emirates"
];

const k12Ages = [
    { label: "Grade 1–5", active: true },
    { label: "Grade 6–8", active: false },
    { label: "Grade 9–12", active: false }
];

const k12Capabilities = [
    { icon: Sparkles, iconColor: "white", title: "AI Foundations & Generative AI", desc: "Students explore AI basics, generative AI concepts, and real-life applications building intuition for the technology shaping their future." },
    { icon: Target, iconColor: "white", title: "Interactive STEM Integration", desc: "AI-powered interactive tools for Mathematics, Science, and Languages making abstract concepts tangible and engaging." },
    { icon: Code, iconColor: "white", title: "Coding for Every Level", desc: "Block-based coding for early learners, Python for advanced grades — a progressive coding journey that grows with the student." },
    { icon: Microscope, iconColor: "white", title: "Project-Based AI Learning", desc: "AI-integrated project modules where students build, test, and present real solutions — not just learn theory." }
];

const higherEdCapabilities = [
    { icon: BrainCircuit, iconColor: "white", title: "AI & Machine Learning Foundations", desc: "Structured curriculum covering core AI/ML concepts — from supervised learning to neural networks — designed for non-CS and CS students." },
    { icon: LayoutGrid, iconColor: "white", title: "AI in Business & Analytics", desc: "Applied modules for Business, Marketing, Finance, and Analytics — enabling every graduate to leverage AI in their domain." },
    { icon: MessageSquare, iconColor: "white", title: "Generative AI, Chatbots & LLMs", desc: "Hands-on exposure to the tools reshaping industries — ChatGPT, LLM frameworks, chatbot development, and prompt engineering." },
    { icon: CheckCircle2, iconColor: "white", title: "Capstone Projects & Industry Exposure", desc: "Real-world capstone projects, internships, and placement support — connecting learning to livelihood." }
];

const teacherTrainingCapabilities = [
    { icon: BookOpen, iconColor: "white", title: "AI Basics for Educators", desc: "A jargon-free introduction to AI concepts tailored for teachers — building confidence before capability." },
    { icon: MonitorPlay, iconColor: "white", title: "AI Tools for the Classroom", desc: "Hands-on training with student-facing AI tools — lesson planners, assessment generators, and content creators." },
    { icon: ShieldCheck, iconColor: "white", title: "Ethics, Bias & Responsible AI", desc: "Equipping teachers to navigate and teach AI responsibly — covering bias, fairness, privacy, and digital citizenship." },
    { icon: GitMerge, iconColor: "white", title: "Subject-Integrated AI Lesson Planning", desc: "Practical modules for integrating AI into Science, Mathematics, Languages, and Social Studies curricula." }
];

const equipmentList = [
    { icon: Bot, iconColor: "white", title: "AI Dog Robot", desc: "A four-legged smart robot with gesture and voice control — bringing AI in motion and human-machine interaction to life for students." },
    { icon: Car, iconColor: "white", title: "Self-Driving Car Kits", desc: "Mini autonomous vehicles with sensors and vision AI — teaching object detection, path planning, and real-world autonomous systems." },
    { icon: Code, iconColor: "white", title: "Modular Robot Kits", desc: "Build-your-own robotic arms, obstacle-avoiders, and line-followers — accessible for all skill levels from beginner to advanced." },
    { icon: Sparkles, iconColor: "white", title: "Generative AI Stations", desc: "LLM-based workstations for creating chatbots, AI art, and personal AI assistants — making cutting-edge GenAI tangible for students." },
    { icon: Eye, iconColor: "white", title: "Vision & Edge AI Tools", desc: "Face recognition, object tracking, IoT-based control systems, and automation projects — bridging software intelligence with physical output." },
    { icon: Target, iconColor: "white", title: "Real-World Application Projects", desc: "Students build smart waste sorters, emotion detectors, crop monitoring tools, robotic assistants, and disaster-response bots." }
];

const booksData = [
    {
        class: 1,
        title: "Class 1 — AI & Coding for Young Learners",
        image: "/assets/images/book_cover_class1.png",
        desc: "A carefully crafted introduction to AI and coding for young students — using relatable characters, age-appropriate examples, and interactive exercises to build digital confidence.",
        topics: ["Introduction to computers", "Understanding how computers work", "Mouse and keyboard skills"]
    },
    {
        class: 6,
        title: "Class 6 — Application & Pattern Recognition",
        image: "/assets/images/book_cover_class6.png",
        desc: "Deeper block coding, introduction to data, pattern recognition, and tools for creativity. Students explore how AI can assist in art, music, and storytelling.",
        topics: ["Pattern recognition", "Advanced block coding", "AI creative tools"]
    },
    {
        class: 10,
        title: "Class 10 — Innovation & Data Science",
        image: "/assets/images/book_cover_class10.png",
        desc: "Advanced Python, data science fundamentals, computer vision basics, chatbot building, and AI ethics — preparing for board-level and competitive contexts.",
        topics: ["Advanced Python & Data Science", "Computer vision basics", "Chatbot building & AI Ethics"]
    }
];

const gradeTimeline = [
    { range: "Class 1–2", title: "Discovery", desc: "Intro to computers & software navigation with playful exercises." },
    { range: "Class 3–4", title: "Exploration", desc: "Algorithms, block coding, and basic AI concepts." },
    { range: "Class 5–6", title: "Application", desc: "Data patterns & AI tools for creativity." },
    { range: "Class 7–8", title: "Creation", desc: "Python basics, ML concepts, and robotics." },
    { range: "Class 9–10", title: "Innovation", desc: "Advanced Python, Chatbots, and AI Ethics." },
    { range: "Class 11–12", title: "Mastery", desc: "Full AI/ML projects and LLM exploration." }
];

const AnimatedCounter = ({ endValue, suffix }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = parseInt(endValue);
                if (isNaN(end)) return;
                const duration = 2000;
                const increment = end / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.ceil(start));
                    }
                }, 16);
                observer.unobserve(counterRef.current);
            }
        }, { threshold: 0.1 });

        if (counterRef.current) observer.observe(counterRef.current);
        return () => observer.disconnect();
    }, [endValue]);

    return <span ref={counterRef}>{count}{suffix}</span>;
};

const Education = () => {
    const addToRefs = useReveal();

    useEffect(() => {
        const handlePlay = (e) => {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach(video => {
                if (video !== e.target) {
                    video.pause();
                }
            });
        };

        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('play', handlePlay);
        });

        return () => {
            videos.forEach(video => {
                video.removeEventListener('play', handlePlay);
            });
        };
    }, []);

    return (
        <div className="education-page">

            {/* 1. HERO INTRO */}
            <section className="edu-hero reveal-fade-up" ref={addToRefs}>
                <h1 className="hero-title about-hero-title">
                    Education <br className="hidden md:block" />
                    <span className="hero-title-highlight">
                        AI Solutions
                    </span>
                </h1>
                <p className="section-intro">
                    Super AIP supports educational transformation across K-12, higher education, and skill development ecosystems.
                    We empower institutions to deliver personalized, tech-enabled learning while reducing administrative burden.
                </p>

                <div className="stats-row">
                    {stats.map((s, i) => (
                        <div key={i} className="stat-block">
                            <h3 className="gradient-text-teal">
                                <AnimatedCounter endValue={s.value} suffix={s.suffix} />
                            </h3>
                            <p>{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="presence-map">
                    {/* Abstract node map image representation */}
                    {/* <img src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80" alt="Global Presence Map" style={{ borderRadius: '20px' }} /> */}
                    <br />
                </div>

                <p style={{ color: '#00d2ff', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Our Global Network</p>
                <div className="country-pills">
                    {countries.map((c, i) => (
                        <span key={i} className="country-pill">{c}</span>
                    ))}
                </div>
            </section>

            {/* 2. K-12 AI LEARNING PLATFORM */}
            <section id="k12" className="k12-section reveal-fade-up" ref={addToRefs}>
                <div className="header-badges">
                    <div className="badge"><CheckCircle2 size={16} /> NEP 2020 Aligned</div>
                    <div className="badge"><ShieldCheck size={16} /> Global AI Ethics</div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p className="section-tagline" style={{ color: '#00d2ff' }}>Inspiring young innovators. From Grade 1 to 12.</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>K-12 AI Learning Platform</h2>
                    <p className="section-intro" style={{ margin: '0 auto', color: '#cbd5e1' }}>
                        Super AIP's K-12 AI Learning Platform introduces students to Artificial Intelligence through hands-on learning,
                        coding, simulations, and real-world problem-solving.
                    </p>
                    <div className="edge-media" style={{ margin: '90px 0px', borderRadius: '43px' }}>
                        <div className="video-wrapper" style={{ borderRadius: '43px' }}>
                            <video
                                src={K12LearningPlatformVideo}
                                controls
                                muted
                                className="media-content"
                                style={{
                                    borderRadius: '43px',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="age-selectors">
                    {k12Ages.map((age, i) => (
                        <div key={i} className={`age-sel ${age.active ? 'active' : ''}`}>
                            <div className="icon-wrap"><UserCircle size={28} /></div>
                            <span>{age.label}</span>
                        </div>
                    ))}
                </div>

                <div className="k12-grid">
                    {k12Capabilities.map((cap, i) => (
                        <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                            <cap.icon size={36} color={cap.iconColor || "#00d2ff"} style={{ marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{cap.title}</h4>
                            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{cap.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="outcome-box">
                    <p><strong>Outcome:</strong> Future-ready students equipped with 21st-century skills — creativity, critical thinking, collaboration, and problem-solving — ready for a world where AI is everywhere.</p>
                </div>

                <div className="section-cta" style={{ marginTop: '3rem' }}>
                    <Link to="/Education#k12" className="btn-primary" style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', color: '#fff' }}>
                        <PlayCircle size={18} /> Watch Product Demo
                    </Link>
                    <Link to="/Contact#request-demo" className="btn-outline">Request a School Demo</Link>
                </div>
            </section>

            {/* 3. HIGHER ED & TEACHER TRAINING */}
            <section id="higher-ed" className="higher-ed-section reveal-fade-up" ref={addToRefs}>
                <div className="split-layout">
                    {/* Panel A: Higher Ed */}
                    <div className="split-panel panel-blue">
                        <p className="section-tagline gradient-text-teal" style={{ margin: 0 }}>Bridging the gap</p>
                        <h2 style={{ fontSize: '1.72rem', margin: '0.5rem 0 1rem' }}>Higher Education AI Skill Development</h2>
                        <p style={{ color: '#94a3b8' }}>Modules purpose-built for colleges and universities — delivering industry-integrated AI skills for BCA, B.Sc, B.Tech, BBA, and MBA programs.</p>
                        <div className="edge-media" style={{ margin: '10px 0px', borderRadius: '43px' }}>
                            <div className="video-wrapper" style={{ borderRadius: '43px' }}>
                                <video
                                    src={HigherEducationVideo}
                                    controls
                                    muted
                                    className="media-content"
                                    style={{
                                        borderRadius: '43px',
                                    }}

                                />
                            </div>
                        </div>
                        <div className="split-features">
                            {higherEdCapabilities.map((feat, idx) => (
                                <div key={idx} className="split-feature">
                                    <feat.icon size={24} color={feat.iconColor || "#3a7bd5"} className={feat.iconColor ? "" : "icon-blue"} />
                                    <div>
                                        <h5>{feat.title}</h5>
                                        <p>{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/Contact#contact-us" className="btn-primary" style={{ marginTop: '3rem', width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)', color: '#fff' }}>
                            Explore Higher Ed Programs
                        </Link>
                    </div>

                    {/* Panel B: Teacher Training */}
                    <div className="split-panel panel-gold">

                        <p className="section-tagline gradient-text-gold" style={{ margin: 0 }}>Empowering educators</p>
                        <h2 style={{ fontSize: '1.72rem', margin: '0.5rem 0 1rem' }}>AI Teacher Training</h2>
                        <p style={{ color: '#94a3b8' }}>Super AIP equips teachers with the skills, tools, and confidence to integrate AI meaningfully into their teaching practice.</p>
                        <div className="edge-media" style={{ margin: '10px 0px', borderRadius: '43px' }}>
                            <div className="video-wrapper" style={{ borderRadius: '43px' }}>
                                <video
                                    src={AITeacherTrainingVideo}
                                    controls
                                    muted
                                    className="media-content"
                                    style={{ borderRadius: '43px' }}
                                />
                            </div>
                        </div>
                        <div className="split-features">
                            {teacherTrainingCapabilities.map((feat, idx) => (
                                <div key={idx} className="split-feature">
                                    <feat.icon size={24} color={feat.iconColor || "#f6d365"} className={feat.iconColor ? "" : "icon-gold"} />
                                    <div>
                                        <h5>{feat.title}</h5>
                                        <p>{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/Contact#contact-us" className="btn-primary" style={{ marginTop: '3rem', width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', color: '#000' }}>
                            Register for Teacher Training
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. END-TO-END AI LABS */}
            <section id="ai-labs" className="labs-section reveal-fade-up" ref={addToRefs}>
                <p className="section-tagline gradient-text-teal">Where students build the future. Today.</p>
                <h2 style={{ fontSize: '3rem', margin: '0.5rem 0 1.5rem' }}>End-to-End AI Labs</h2>
                <p className="section-intro" style={{ margin: '0 auto 2rem' }}>
                    The Super AI Lab is an innovation space that immerses students in AI, Robotics, and Automation through project-based learning.
                </p>

                {/* <img
                    src="/assets/images/education_ailab.png"
                    alt="Super AI Educational Lab"
                    className="labs-hero-image"
                /> */}
                <div className="edge-media" style={{ margin: '90px 0px', borderRadius: '43px' }}>
                    <div className="video-wrapper" style={{ borderRadius: '43px' }}>
                        <video
                            src={EndToEndLabsVideo}
                            controls
                            muted
                            className="media-content"
                            style={{ borderRadius: '43px' }}
                        />
                    </div>
                </div>

                <div className="equipment-grid">
                    {equipmentList.map((eq, idx) => (
                        <div key={idx} className="equipment-card glass-card">
                            <eq.icon size={40} color={eq.iconColor || "#00d2ff"} />
                            <h4>{eq.title}</h4>
                            <p>{eq.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="section-cta">
                    <Link to="/Education#ai-labs" className="btn-primary" style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', color: '#fff' }}>
                        <PlayCircle size={18} /> Watch Lab Tour
                    </Link>
                    <Link to="/Contact#contact-us" className="btn-outline">Request Lab Setup</Link>
                </div>
            </section>

            {/* 5. AI & ROBOTICS BOOKS */}
            <section id="books" className="books-section reveal-fade-up" ref={addToRefs}>
                <div style={{ textAlign: 'center' }}>
                    <p className="section-tagline" style={{ color: '#f6d365' }}>Every concept. Every class.</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI & Robotics Books (Class 1–12)</h2>
                    <p className="section-intro" style={{ margin: '90px auto' }}>
                        Super AI Polaris publishes a complete series of AI & Robotics textbooks aligned with CBSE, ICSE, and NEP 2020.
                    </p>
                    <div className="edge-media" style={{ margin: '10px 0px', borderRadius: '43px' }}>
                        <div className="video-wrapper" style={{ borderRadius: '43px' }}>
                            <video
                                src={AIRoboticsBooksVideo}
                                controls
                                muted
                                className="media-content"
                                style={{ borderRadius: '43px' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bookshelf-swiper-container" style={{ padding: '2rem 0 4rem', marginTop: '2rem' }}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                            1024: { slidesPerView: 2, spaceBetween: 40 }
                        }}
                        className="books-swiper"
                        style={{ paddingBottom: '3rem' }}
                    >
                        {booksData.map((book, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="book-card" style={{ height: '100%' }}>
                                    <div className="book-cover">
                                        <img src={book.image} alt={book.title} />
                                    </div>
                                    <div className="book-info">
                                        <h3>{book.title}</h3>
                                        <div className="boards">Board: CBSE · ICSE · NEP 2020 Aligned</div>
                                        <p>{book.desc}</p>
                                        <div className="book-topics">
                                            <h5>What Students Learn:</h5>
                                            <ul>
                                                {book.topics.map((t, i) => <li key={i}>{t}</li>)}
                                            </ul>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                            <Link to="/Contact#contact-us" className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Preview</Link>
                                            <Link to="/Contact#contact-us" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', background: '#3b82f6', color: '#fff' }}>Enquire Order</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grade-timeline reveal-fade-up" ref={addToRefs}>
                    {gradeTimeline.map((step, idx) => (
                        <div key={idx} className="timeline-step">
                            <div className="step-dot">{idx + 1}</div>
                            <h5>{step.range} - {step.title}</h5>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="section-cta" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
                    <Link to="/Contact#contact-us" className="btn-primary" style={{ background: '#3b82f6', color: '#fff' }}>Explore Completed Series <ArrowRight size={18} /></Link>
                </div>
            </section>

        </div>
    );
};

export default Education;

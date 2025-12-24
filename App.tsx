
import React, { useState, useEffect, useCallback } from 'react';
import SlideLayout from './components/SlideLayout';

/**
 * EXACT LOGO RECREATION
 * Mimics the uploaded image: 
 * - Disintegrated pixels on the left
 * - Geometric frame with diverging light/sound beams on the right
 * - Specific typography and tagline
 */
const EncoderLogo: React.FC<{ scale?: number; light?: boolean }> = ({ scale = 1, light = false }) => {
  return (
    <div className="flex flex-col items-center" style={{ transform: `scale(${scale})` }}>
      <div className="flex items-center gap-0">
        {/* Pixel Disintegration Part */}
        <div className="grid grid-cols-4 gap-1 w-20 h-24 p-2">
          {[...Array(16)].map((_, i) => {
            const opacity = Math.random() > 0.4 ? 1 : 0;
            const color = i % 3 === 0 ? '#4c1d95' : i % 3 === 1 ? '#7c3aed' : '#db2777';
            return (
              <div 
                key={i} 
                className="w-3 h-3 rounded-sm transition-opacity duration-1000"
                style={{ 
                  backgroundColor: color,
                  opacity: opacity,
                  animation: `pixel-pulse 3s infinite ${Math.random() * 2}s`
                }}
              ></div>
            );
          })}
        </div>
        
        {/* The "E" / Projector Frame Part */}
        <div className="relative w-40 h-32 border-[6px] border-[#4c1d95] bg-white flex items-center justify-center">
          <div className="absolute left-4 w-0 h-0 border-y-[30px] border-y-transparent border-l-[60px] border-l-[#4c1d95]/10"></div>
          {/* Three diverging beams */}
          <div className="relative flex flex-col gap-2 w-full pl-8 items-start">
             <div className="h-4 w-28 bg-gradient-to-r from-[#4c1d95] to-[#db2777] clip-beam-top transform -rotate-[15deg] origin-left shadow-lg"></div>
             <div className="h-4 w-32 bg-gradient-to-r from-[#4c1d95] to-[#db2777] clip-beam-mid shadow-lg"></div>
             <div className="h-4 w-28 bg-gradient-to-r from-[#4c1d95] to-[#db2777] clip-beam-bot transform rotate-[15deg] origin-left shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Typography */}
      <div className="mt-4 text-center">
        <h1 className="text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-[#4c1d95] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
          ENCODER
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px w-4 bg-[#db2777]"></div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#db2777]">
            Innovation. Excellence. Celebration.
          </p>
          <div className="h-px w-4 bg-[#db2777]"></div>
        </div>
      </div>

      <style>{`
        .clip-beam-top { clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%); }
        .clip-beam-mid { clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%); }
        .clip-beam-bot { clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%); }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 20;

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES), []);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slides = [
    // Slide 1: Cover
    { id: 0, content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-slide-up">
        <EncoderLogo scale={1.2} />
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-light text-gray-400 tracking-[0.3em] uppercase">
            Corporate Profile 2025
          </p>
          <div className="h-1 w-24 bg-[#db2777] mx-auto rounded-full"></div>
        </div>
      </div>
    )},
    // Slide 2: About Us
    { id: 1, content: (
      <div className="grid md:grid-cols-2 gap-16 items-center h-full">
        <div className="space-y-8">
          <h2 className="text-5xl font-black italic gradient-text">Beyond Production</h2>
          <p className="text-2xl text-gray-300 leading-relaxed font-light">
            Encoder CSO is a premier event technology firm based in Dubai, specializing in large-scale conference and seminar production.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We bridge the gap between imagination and execution. Our mission is to provide world-class technical infrastructure that empowers speakers and engages audiences globally.
          </p>
          <div className="pt-4 flex gap-8">
            <div className="text-center">
              <span className="block text-3xl font-black text-purple-500">10+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Years Exp</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-black text-pink-500">500+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Events Yearly</span>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-[40px]">
           <img src="https://images.unsplash.com/photo-1505373630103-f21ee09d779d?auto=format&fit=crop&q=80&w=800" alt="Event Hall" className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-tr from-[#4c1d95]/40 to-transparent"></div>
        </div>
      </div>
    )},
    // Slide 3: Service: Audio
    { id: 2, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="relative h-[500px] overflow-hidden rounded-3xl">
           <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" alt="Audio Production" className="w-full h-full object-cover" />
           <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
              <h4 className="text-purple-400 font-bold uppercase text-xs">High-Fidelity Audio</h4>
              <p className="text-xs text-gray-300">LD Systems & Shure Axient Digital</p>
           </div>
        </div>
        <div className="space-y-6">
          <span className="text-[#db2777] font-bold text-sm tracking-widest uppercase">Expertise: Audio</span>
          <h2 className="text-5xl font-black italic">Acoustic Engineering</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            From whispering keynote speeches to thunderous awards ceremonies, our audio solutions guarantee 100% clarity.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
             <li className="flex gap-3 items-center"><i className="fa-solid fa-check text-purple-500"></i> Line Array & Column Systems</li>
             <li className="flex gap-3 items-center"><i className="fa-solid fa-check text-purple-500"></i> Multi-zone Delay Management</li>
             <li className="flex gap-3 items-center"><i className="fa-solid fa-check text-purple-500"></i> Digital Wireless Ecosystems</li>
          </ul>
        </div>
      </div>
    )},
    // Slide 4: Service: Visual
    { id: 3, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6 order-2 md:order-1">
          <span className="text-[#db2777] font-bold text-sm tracking-widest uppercase">Expertise: Visual</span>
          <h2 className="text-5xl font-black italic">Immersive Displays</h2>
          <p className="text-gray-400 text-lg">
            Pixels that pop. We provide the latest LED technology (1.9mm - 4.8mm) to create massive, seamless backdrops.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-purple-400 font-bold block">UHD / 4K</span>
                <span className="text-[10px] text-gray-500 uppercase">Resolution Ready</span>
             </div>
             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-purple-400 font-bold block">Curved LED</span>
                <span className="text-[10px] text-gray-500 uppercase">Flex Installations</span>
             </div>
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-3xl order-1 md:order-2">
           <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" alt="Visual Tech" className="w-full h-full object-cover" />
           <div className="absolute top-6 right-6 p-4 bg-purple-600 rounded-full shadow-2xl animate-pulse">
              <i className="fa-solid fa-display text-white text-xl"></i>
           </div>
        </div>
      </div>
    )},
    // Slide 5: Service: Lighting
    { id: 4, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="relative h-[500px] overflow-hidden rounded-3xl">
           <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" alt="Stage Lighting" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="space-y-6">
          <span className="text-[#db2777] font-bold text-sm tracking-widest uppercase">Expertise: Lighting</span>
          <h2 className="text-5xl font-black italic">Atmospheric Design</h2>
          <p className="text-gray-400 text-lg">
            Painting with light. Our B-EYE moving heads and IP65 wash lights transform empty halls into dynamic environments.
          </p>
          <div className="space-y-4">
             {['B-EYE 760 IP Moving Heads', 'Battery Powered Uplighting', 'Avolites Quartz Control'].map(t => (
               <div key={t} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-purple-500">
                     <i className="fa-solid fa-bolt text-xs text-purple-400"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-300">{t}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    )},
    // Slide 6: Service: Aluminium Truss
    { id: 5, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6">
          <span className="text-[#db2777] font-bold text-sm tracking-widest uppercase">Expertise: Infrastructure</span>
          <h2 className="text-5xl font-black italic">Aluminium Trussing</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            The backbone of every production. We use high-grade aluminium trussing for safe, heavy-duty rigging of lights, audio, and LED screens.
          </p>
          <div className="p-6 bg-[#1a1a1f] border-l-4 border-purple-600 rounded-xl">
             <h4 className="font-bold mb-2">Safety First Rigging</h4>
             <p className="text-sm text-gray-500">TUV Certified components and load-tested motors ensure zero-risk overhead installations.</p>
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-3xl">
           <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" alt="Trussing" className="w-full h-full object-cover" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <i className="fa-solid fa-layer-group text-9xl text-white/5 rotate-12"></i>
           </div>
        </div>
      </div>
    )},
    // Slide 7: Technical Ecosystem
    { id: 6, content: (
      <div className="h-full flex flex-col justify-center space-y-12">
        <div className="text-center space-y-4">
           <h2 className="text-4xl font-black italic">Signal Processing Mastery</h2>
           <p className="text-gray-400 max-w-2xl mx-auto">We deploy industry-standard processing layers to ensure flawless 24/7 operation.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: 'NovaStar H-Series', category: 'LED Control', desc: 'Seamless multi-screen management.' },
             { title: 'MIG Seamless Switch', category: 'Vision Mixing', desc: 'Zero-latency source switching.' },
             { title: 'Behringer X32', category: 'Audio Console', desc: 'High-density digital signal flow.' }
           ].map((item, i) => (
             <div key={i} className="bg-white/5 p-8 rounded-[30px] border border-white/10 hover:border-purple-500/50 transition-colors group">
                <i className="fa-solid fa-microchip text-3xl text-purple-500 mb-6 group-hover:rotate-45 transition-transform"></i>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-[10px] uppercase tracking-widest text-pink-500 font-bold mb-4">{item.category}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    )},
    // Slide 8: Conference Excellence
    { id: 7, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-8">
          <h2 className="text-5xl font-black italic gradient-text">Conference Specialists</h2>
          <div className="space-y-4">
             <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shrink-0"><i className="fa-solid fa-headset text-white"></i></div>
                <div><h5 className="font-bold">Interpretation Systems</h5><p className="text-xs text-gray-500">Simultaneous multi-language support.</p></div>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center shrink-0"><i className="fa-solid fa-podcast text-white"></i></div>
                <div><h5 className="font-bold">Keynote Audio</h5><p className="text-xs text-gray-500">Redundant lapel & headset wireless kits.</p></div>
             </div>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden shadow-2xl">
           <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Conference" />
        </div>
      </div>
    )},
    // Slide 9: Seminar Integration
    { id: 8, content: (
      <div className="h-full flex flex-col justify-center text-center space-y-10">
         <h2 className="text-5xl font-black italic">Interactive Seminars</h2>
         <p className="text-gray-400 max-w-2xl mx-auto text-lg">Workshops and seminars require intimate yet powerful tech setups. We provide interactive Q&A systems and seamless presentation switching.</p>
         <div className="flex flex-wrap justify-center gap-6">
            {['Catchbox Mics', 'Live Polling Integration', 'Stage Monitoring', 'Comfort Monitors'].map(feat => (
              <span key={feat} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:text-purple-400 transition-colors">
                 {feat}
              </span>
            ))}
         </div>
         <div className="pt-8">
            <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200" alt="Seminar Hall" className="w-full h-48 object-cover rounded-3xl opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
         </div>
      </div>
    )},
    // Slide 10: Logistics & Support
    { id: 9, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="relative h-full flex items-center justify-center">
           <i className="fa-solid fa-truck-fast text-[200px] text-white/5 absolute"></i>
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="w-32 h-32 bg-purple-600 rounded-3xl flex items-center justify-center"><i className="fa-solid fa-clock text-4xl"></i></div>
              <div className="w-32 h-32 bg-pink-600 rounded-3xl mt-8 flex items-center justify-center"><i className="fa-solid fa-warehouse text-4xl"></i></div>
           </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">In-House Logistics</h2>
          <p className="text-gray-400">Our own fleet of vehicles and dedicated warehouse team ensure prompt delivery and setup across the UAE and GCC region.</p>
          <div className="space-y-4">
             <div className="flex gap-4 items-center"><i className="fa-solid fa-shield-heart text-purple-500"></i> <span>Certified On-Site Engineers</span></div>
             <div className="flex gap-4 items-center"><i className="fa-solid fa-shield-heart text-purple-500"></i> <span>24/7 Technical Standby</span></div>
             <div className="flex gap-4 items-center"><i className="fa-solid fa-shield-heart text-purple-500"></i> <span>Equipment Redundancy Policy</span></div>
          </div>
        </div>
      </div>
    )},
    // Slide 11: Hybrid Events
    { id: 10, content: (
      <div className="h-full flex flex-col justify-center space-y-12">
        <h2 className="text-4xl font-black italic text-center">The Hybrid Future</h2>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="p-8 bg-[#1a1a1f] rounded-3xl space-y-4">
              <h4 className="text-2xl font-bold text-purple-400">Live Streaming</h4>
              <p className="text-sm text-gray-500">Multi-camera 4K production for Zoom, YouTube, or custom platforms.</p>
           </div>
           <div className="p-8 bg-[#1a1a1f] rounded-3xl space-y-4">
              <h4 className="text-2xl font-bold text-pink-400">Remote Connectivity</h4>
              <p className="text-sm text-gray-500">Bringing remote speakers into your physical venue with zero lag.</p>
           </div>
        </div>
        <img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=1200" className="h-40 w-full object-cover rounded-3xl opacity-30" />
      </div>
    )},
    // Slide 12: Stage Design (Pre-Viz)
    { id: 11, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">3D Pre-Visualization</h2>
          <p className="text-gray-400">We don't just talk tech; we show it. Our design team creates full 3D renders of your stage and event hall before we even move a single case.</p>
          <button className="px-6 py-3 border border-purple-500 text-purple-400 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all">View Our Portfolio</button>
        </div>
        <div className="aspect-video bg-black/50 border border-white/5 rounded-3xl flex items-center justify-center overflow-hidden">
           <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60" />
        </div>
      </div>
    )},
    // Slide 13: Core Values
    { id: 12, content: (
      <div className="h-full flex flex-col justify-center items-center text-center space-y-12">
         <h2 className="text-5xl font-black italic gradient-text">Our Philosophy</h2>
         <div className="grid grid-cols-3 gap-12">
            <div><i className="fa-solid fa-microchip text-4xl text-purple-500 mb-4"></i><h5 className="font-bold">Innovation</h5></div>
            <div><i className="fa-solid fa-crown text-4xl text-purple-500 mb-4"></i><h5 className="font-bold">Excellence</h5></div>
            <div><i className="fa-solid fa-glass-cheers text-4xl text-purple-500 mb-4"></i><h5 className="font-bold">Celebration</h5></div>
         </div>
      </div>
    )},
    // Slide 14: Portfolio Grid
    { id: 13, content: (
      <div className="h-full flex flex-col justify-center space-y-8">
         <h2 className="text-3xl font-bold">Featured Projects</h2>
         <div className="grid grid-cols-4 gap-4 h-[300px]">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                 <img src={`https://picsum.photos/seed/event${i}/400/600`} className="w-full h-full object-cover" />
              </div>
            ))}
         </div>
      </div>
    )},
    // Slide 15: LED Pitch Guide
    { id: 14, content: (
      <div className="h-full flex flex-col justify-center text-center space-y-10">
         <h2 className="text-4xl font-bold italic">LED Pixel Precision</h2>
         <div className="flex justify-center gap-4">
            {['1.9mm', '2.6mm', '2.9mm', '3.9mm', '4.8mm'].map(p => (
              <div key={p} className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-purple-500 hover:border-purple-500 transition-all cursor-default">{p}</div>
            ))}
         </div>
         <p className="text-sm text-gray-500 italic max-w-xl mx-auto font-light">Fine pitch for indoor conferences, high brightness for outdoor expos.</p>
      </div>
    )},
    // Slide 16: Project Management
    { id: 15, content: (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full">
         <div className="space-y-6">
            <h2 className="text-4xl font-bold">Step-by-Step Excellence</h2>
            <div className="space-y-4">
               {['Initial Site Survey', 'Custom Tech Solution', '3D Stage Rendering', 'Execution & Live Ops'].map((step, idx) => (
                 <div key={step} className="flex gap-4 items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-xs">{idx + 1}</span>
                    <span className="text-gray-300 font-medium">{step}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-white/5 p-8 rounded-3xl border border-white/10 italic text-sm text-gray-500 leading-relaxed">
            "At Encoder, we don't just show up. We integrate with your team to ensure the technical layer of your event is a seamless extensions of your vision."
         </div>
      </div>
    )},
    // Slide 17: Client Focus
    { id: 16, content: (
      <div className="h-full flex flex-col justify-center items-center space-y-8">
         <h2 className="text-4xl font-black italic">Trusted Partners</h2>
         <div className="grid grid-cols-4 gap-12 opacity-40">
            {[...Array(8)].map((_, i) => (
              <i key={i} className={`fa-solid ${['fa-building', 'fa-city', 'fa-landmark', 'fa-industry'][i%4]} text-5xl hover:opacity-100 cursor-pointer transition-opacity`}></i>
            ))}
         </div>
      </div>
    )},
    // Slide 18: Quality Control
    { id: 17, content: (
      <div className="h-full flex flex-col justify-center space-y-12">
         <h2 className="text-4xl font-bold text-center">Quality & Maintenance</h2>
         <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-[#1a1a1f] rounded-2xl border border-white/5">
               <i className="fa-solid fa-toolbox text-purple-500 text-2xl"></i>
               <p className="text-sm text-gray-400">Regular equipment servicing and software updates across all consoles and processors.</p>
            </div>
            <div className="flex gap-4 p-6 bg-[#1a1a1f] rounded-2xl border border-white/5">
               <i className="fa-solid fa-certificate text-pink-500 text-2xl"></i>
               <p className="text-sm text-gray-400">Compliance with local and international event safety and electrical standards.</p>
            </div>
         </div>
      </div>
    )},
    // Slide 19: Global Vision
    { id: 18, content: (
      <div className="h-full flex flex-col justify-center items-center text-center space-y-12">
         <h2 className="text-5xl font-black italic gradient-text">Global Reach</h2>
         <div className="relative w-full h-64 bg-white/5 rounded-3xl flex items-center justify-center">
            <i className="fa-solid fa-earth-africa text-9xl text-white/5 animate-spin-slow"></i>
            <p className="absolute text-xl font-light text-gray-300 italic">"Delivering Excellence across the Middle East & Europe."</p>
         </div>
      </div>
    )},
    // Slide 20: Final Closing
    { id: 19, content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
        <EncoderLogo scale={1} />
        <div className="space-y-4">
          <h2 className="text-4xl font-black italic gradient-text">LET'S TRANSFORM YOUR EVENT</h2>
          <p className="text-gray-400">Contact us today for a bespoke technical proposal.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl text-left">
           <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-4 text-purple-400"><i className="fa-solid fa-user"></i><span className="font-bold text-white uppercase">ASHWIN S</span></div>
              <div className="flex items-center gap-4 text-sm text-gray-400"><i className="fa-solid fa-phone"></i><span>+971 50 267 2795</span></div>
              <div className="flex items-center gap-4 text-sm text-gray-400"><i className="fa-solid fa-envelope"></i><span>info@encoderav.com</span></div>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-pink-400"><i className="fa-solid fa-globe"></i><span className="font-bold text-white uppercase">encoderav.com</span></div>
              <p className="text-[10px] text-gray-600 italic mt-2 uppercase tracking-widest">Innovation • Excellence • Celebration</p>
           </div>
        </div>
      </div>
    )}
  ];

  return (
    <div className="w-full h-screen relative bg-[#050507] text-white selection:bg-purple-500/30 overflow-hidden font-['Plus_Jakarta_Sans']">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="flex flex-wrap gap-6">
          {[...Array(300)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-purple-500 rounded-sm"></div>
          ))}
        </div>
      </div>
      
      <main className="relative w-full h-full">
        {slides.map((slide, index) => (
          <SlideLayout key={slide.id} active={currentSlide === index}>
            {slide.content}
          </SlideLayout>
        ))}
      </main>

      {/* Persistent Navigation */}
      <div className="fixed bottom-8 left-0 w-full px-12 flex justify-between items-center z-50">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === i ? 'w-10 bg-purple-600' : 'w-2 bg-white/10'}`} />
          ))}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-md"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="px-10 h-14 rounded-full bg-gradient-to-r from-purple-600 to-[#db2777] hover:brightness-110 transition-all flex items-center justify-center gap-3 font-bold shadow-2xl shadow-purple-600/30"
          >
            <span className="text-xs uppercase tracking-widest">{currentSlide === TOTAL_SLIDES - 1 ? 'RESTART' : 'NEXT SLIDE'}</span>
            <i className="fa-solid fa-arrow-right-long text-xs"></i>
          </button>
        </div>
      </div>

      <div className="fixed top-12 left-12 z-50 opacity-50 cursor-pointer" onClick={() => setCurrentSlide(0)}>
         <span className="font-black italic tracking-tighter text-xl text-purple-400">ENCODER CSO</span>
      </div>
      
      <div className="fixed top-12 right-12 z-50 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black tracking-widest text-purple-500 uppercase">
        Slide {String(currentSlide + 1).padStart(2, '0')}
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;

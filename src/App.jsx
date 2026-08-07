import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { Hero } from './components/Hero';
import { HumanRole } from './components/HumanRole';
import { PromptBridge } from './components/PromptBridge';
import { AIEngine } from './components/AIEngine';
import { TechStack } from './components/TechStack';
import { Ensemble } from './components/Ensemble';
import { WhatYouCanBuild } from './components/WhatYouCanBuild';
import { AppGallery } from './components/AppGallery';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900 text-slate-100 antialiased">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <Ensemble />
        <HumanRole />
        <PromptBridge />
        <AIEngine />
        <TechStack />
        <WhatYouCanBuild />
        <AppGallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;

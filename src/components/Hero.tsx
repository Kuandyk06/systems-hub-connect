import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Headphones } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Профессиональный IT-сервис</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Техническая</span>
            <br />
            <span className="gradient-text">поддержка</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Быстрое решение любых технических проблем. Удалённая помощь через AnyDesk и TeamViewer — ваш компьютер в надёжных руках.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group"
            >
              Получить помощь
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6"
            >
              Наши услуги
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Безопасность</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-foreground">15 мин</div>
                <div className="text-sm text-muted-foreground">Время отклика</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

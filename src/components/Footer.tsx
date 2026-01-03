import logoDark from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoDark} alt="SYSTEMS HUB" className="h-12 w-auto" />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Услуги
            </a>
            <a href="#remote" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Удалённая помощь
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Контакты
            </a>
          </nav>

          <p className="text-muted-foreground text-sm">
            © 2024 SYSTEMS HUB. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

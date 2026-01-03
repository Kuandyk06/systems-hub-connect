import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Телефон",
      value: "8 776 005 66 06",
      href: "tel:+77760056606"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@systemshub.kz",
      href: "mailto:info@systemshub.kz"
    },
    {
      icon: Clock,
      label: "Режим работы",
      value: "Тех. поддержка 24/7"
    },
    {
      icon: MapPin,
      label: "Адрес",
      value: "г. Атырау, Азаттык 71"
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Свяжитесь </span>
            <span className="gradient-text">с нами</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Оставьте заявку и мы перезвоним вам в течение 15 минут
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">
              Контактная информация
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div 
                  key={item.label}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                Срочная помощь?
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Позвоните нам прямо сейчас и получите консультацию бесплатно
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" />
                Позвонить
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Оставить заявку
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Ваше имя *
                </label>
                <Input
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Телефон *
                </label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Опишите проблему
                </label>
                <Textarea
                  placeholder="Расскажите, с чем нужна помощь..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground min-h-[120px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Send className="mr-2 h-4 w-4" />
                Отправить заявку
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

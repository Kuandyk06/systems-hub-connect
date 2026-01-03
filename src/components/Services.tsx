import { 
  Monitor, 
  Wifi, 
  HardDrive, 
  Shield, 
  Settings, 
  Smartphone,
  Server,
  Printer
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Ремонт компьютеров",
    description: "Диагностика и ремонт ПК любой сложности. Замена комплектующих, модернизация."
  },
  {
    icon: Wifi,
    title: "Настройка сети",
    description: "Настройка Wi-Fi, роутеров, локальных сетей для дома и офиса."
  },
  {
    icon: HardDrive,
    title: "Восстановление данных",
    description: "Восстановление файлов с повреждённых носителей. Резервное копирование."
  },
  {
    icon: Shield,
    title: "Удаление вирусов",
    description: "Полная очистка системы от вредоносного ПО. Установка антивирусов."
  },
  {
    icon: Settings,
    title: "Установка ПО",
    description: "Установка и настройка Windows, драйверов, офисных программ."
  },
  {
    icon: Smartphone,
    title: "Помощь с гаджетами",
    description: "Настройка смартфонов, планшетов, синхронизация устройств."
  },
  {
    icon: Server,
    title: "Серверное обслуживание",
    description: "Настройка и администрирование серверов для малого бизнеса."
  },
  {
    icon: Printer,
    title: "Периферийные устройства",
    description: "Подключение и настройка принтеров, сканеров, веб-камер."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Наши </span>
            <span className="gradient-text">услуги</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Полный спектр IT-услуг для частных клиентов и бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

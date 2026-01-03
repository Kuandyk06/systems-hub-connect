import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  MonitorSmartphone, 
  CheckCircle,
  ExternalLink,
  Copy
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RemoteSupport = () => {
  const [clientId, setClientId] = useState("");
  const [programType, setProgramType] = useState<"anydesk" | "teamviewer">("anydesk");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ID подключения",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "ID отправлен!",
      description: `Мы получили ваш ${programType === "anydesk" ? "AnyDesk" : "TeamViewer"} ID. Скоро свяжемся с вами.`,
    });
    setClientId("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: "Ссылка скопирована в буфер обмена",
    });
  };

  const programs = [
    {
      id: "anydesk" as const,
      name: "AnyDesk",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/AnyDesk_logo.svg/200px-AnyDesk_logo.svg.png",
      downloadUrl: "https://anydesk.com/ru/downloads",
      steps: [
        "Перейдите на сайт anydesk.com/ru/downloads",
        "Скачайте версию для вашей ОС (Windows/Mac/Linux)",
        "Запустите скачанный файл",
        "Скопируйте 9-значный ID из окна программы",
        "Отправьте нам ID через форму ниже"
      ]
    },
    {
      id: "teamviewer" as const,
      name: "TeamViewer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/TeamViewer_logo.svg/200px-TeamViewer_logo.svg.png",
      downloadUrl: "https://www.teamviewer.com/ru/скачать/",
      steps: [
        "Перейдите на сайт teamviewer.com/ru/скачать",
        "Скачайте TeamViewer QuickSupport",
        "Запустите скачанный файл (установка не требуется)",
        "Скопируйте ID и пароль из окна программы",
        "Отправьте нам ID через форму ниже"
      ]
    }
  ];

  return (
    <section id="remote" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Удалённая </span>
            <span className="gradient-text">помощь</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Получите помощь не выходя из дома. Установите одну из программ и отправьте нам ID для подключения.
          </p>
        </div>

        {/* Program Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => setProgramType(program.id)}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                programType === program.id
                  ? "bg-card border-primary glow-border"
                  : "bg-card/50 border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center p-2">
                  <MonitorSmartphone className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {program.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Программа для удалённого доступа</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {program.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-border hover:border-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(program.downloadUrl, "_blank");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Скачать
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(program.downloadUrl);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* ID Submit Form */}
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="font-display text-xl font-bold text-foreground text-center mb-2">
              Отправьте ваш ID
            </h3>
            <p className="text-muted-foreground text-center text-sm mb-6">
              После установки программы, введите полученный ID
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setProgramType("anydesk")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    programType === "anydesk"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AnyDesk
                </button>
                <button
                  type="button"
                  onClick={() => setProgramType("teamviewer")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    programType === "teamviewer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  TeamViewer
                </button>
              </div>

              <Input
                type="text"
                placeholder={programType === "anydesk" ? "Введите AnyDesk ID (например: 123 456 789)" : "Введите TeamViewer ID"}
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
              />

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Отправить ID
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              После отправки ID наш специалист свяжется с вами для подтверждения подключения
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoteSupport;

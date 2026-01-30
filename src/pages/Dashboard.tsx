import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, MessageSquare, Clock, LogOut, Plus, Send } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  created_at: string;
}

interface ChatMessage {
  id: string;
  message: string;
  is_support_reply: boolean;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchTickets();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);

      const channel = supabase
        .channel(`messages-${selectedTicket.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `ticket_id=eq.${selectedTicket.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as ChatMessage]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedTicket]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTickets(data);
    }
  };

  const fetchMessages = async (ticketId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const createTicket = async () => {
    if (!newTicketSubject.trim()) return;

    const { data, error } = await supabase
      .from("support_tickets")
      .insert({ user_id: user!.id, subject: newTicketSubject })
      .select()
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось создать обращение",
      });
    } else {
      setTickets([data, ...tickets]);
      setNewTicketSubject("");
      toast({
        title: "Обращение создано",
        description: "Ваше обращение успешно отправлено",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const { error } = await supabase.from("chat_messages").insert({
      ticket_id: selectedTicket.id,
      user_id: user!.id,
      message: newMessage,
      is_support_reply: false,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
      });
    } else {
      setNewMessage("");
    }
  };

  const updateProfile = async (field: string, value: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("user_id", user!.id);

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, [field]: value } : null));
      toast({
        title: "Профиль обновлён",
        description: "Изменения сохранены",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      open: "default",
      in_progress: "secondary",
      resolved: "outline",
      closed: "destructive",
    };
    const labels: Record<string, string> = {
      open: "Открыто",
      in_progress: "В работе",
      resolved: "Решено",
      closed: "Закрыто",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logoDark} alt="SYSTEMS HUB" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Обращения
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Новое обращение</CardTitle>
                <CardDescription>
                  Опишите вашу проблему или вопрос
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Тема обращения..."
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createTicket()}
                  />
                  <Button onClick={createTicket}>
                    <Plus className="h-4 w-4 mr-2" />
                    Создать
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    История обращений
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tickets.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      У вас пока нет обращений
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {tickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedTicket?.id === ticket.id
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{ticket.subject}</span>
                            {getStatusBadge(ticket.status)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(ticket.created_at).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Чат с поддержкой
                  </CardTitle>
                  <CardDescription>
                    {selectedTicket
                      ? selectedTicket.subject
                      : "Выберите обращение для просмотра чата"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTicket ? (
                    <div className="space-y-4">
                      <div className="h-64 overflow-y-auto space-y-2 p-3 bg-muted/30 rounded-lg">
                        {messages.length === 0 ? (
                          <p className="text-muted-foreground text-center py-8 text-sm">
                            Сообщений пока нет. Напишите первым!
                          </p>
                        ) : (
                          messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-2 rounded-lg max-w-[80%] ${
                                msg.is_support_reply
                                  ? "bg-secondary mr-auto"
                                  : "bg-primary text-primary-foreground ml-auto"
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <span className="text-xs opacity-70">
                                {new Date(msg.created_at).toLocaleTimeString(
                                  "ru-RU",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Введите сообщение..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Выберите обращение слева для просмотра чата
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Данные профиля</CardTitle>
                <CardDescription>
                  Управляйте информацией вашего аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Полное имя</label>
                  <Input
                    value={profile?.full_name || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, full_name: e.target.value } : null
                      )
                    }
                    onBlur={(e) => updateProfile("full_name", e.target.value)}
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input
                    value={profile?.phone || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, phone: e.target.value } : null
                      )
                    }
                    onBlur={(e) => updateProfile("phone", e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

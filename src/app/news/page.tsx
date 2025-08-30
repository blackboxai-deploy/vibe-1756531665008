"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  priority: "high" | "normal" | "low";
  views: number;
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Симуляция загрузки новостей
    setNews([
      {
        id: 1,
        title: "Открылась новая станция метро 'Парковая'",
        content: "Сегодня состоялось торжественное открытие новой станции метро 'Парковая'. Это значительно улучшит транспортную доступность района...",
        category: "Транспорт",
        author: "Городские новости",
        publishedAt: "2024-12-21T10:30:00",
        imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/da3a35ad-2b30-4c38-8a37-3af3d83bff70.png",
        priority: "high",
        views: 1250
      },
      {
        id: 2,
        title: "Фестиваль зимних видов спорта в городском парке",
        content: "В эти выходные в городском парке пройдет традиционный фестиваль зимних видов спорта. Ожидается участие более 500 спортсменов...",
        category: "События",
        author: "Спортивный комитет",
        publishedAt: "2024-12-21T09:15:00",
        imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e1ebcdcd-71d4-4da0-b16f-5d73cf197a4e.png",
        priority: "normal",
        views: 890
      },
      {
        id: 3,
        title: "Изменения в работе общественного транспорта",
        content: "С понедельника вводятся изменения в расписание движения автобусов маршрутов №12 и №34. Новое расписание доступно на сайте...",
        category: "Транспорт",
        author: "Транспортная компания",
        publishedAt: "2024-12-20T16:45:00",
        priority: "high",
        views: 2100
      },
      {
        id: 4,
        title: "Реконструкция центральной площади завершена",
        content: "Завершились работы по реконструкции центральной площади города. Обновлена пешеходная зона, установлены новые скамейки и освещение...",
        category: "Благоустройство",
        author: "Мэрия города",
        publishedAt: "2024-12-20T14:20:00",
        imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bb4e21f2-e68b-44ee-93ff-3753e9ae5f52.png",
        priority: "normal",
        views: 670
      },
      {
        id: 5,
        title: "Новые меры поддержки малого бизнеса",
        content: "Администрация города объявила о запуске новой программы поддержки малого и среднего бизнеса. Размер субсидий увеличен на 20%...",
        category: "Экономика",
        author: "Департамент экономики",
        publishedAt: "2024-12-20T11:10:00",
        priority: "normal",
        views: 445
      },
      {
        id: 6,
        title: "Концерт филармонии в честь Нового года",
        content: "29 декабря в городской филармонии состоится праздничный концерт, посвященный наступающему Новому году. Билеты уже в продаже...",
        category: "Культура",
        author: "Филармония",
        publishedAt: "2024-12-19T18:30:00",
        imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c0cf0351-fdd0-42c2-a6a9-8480a919e9f4.png",
        priority: "normal",
        views: 320
      },
      {
        id: 7,
        title: "Экстренное предупреждение: сильные морозы",
        content: "По данным метеослужбы, в ближайшие дни ожидается значительное понижение температуры до -25°C. Рекомендуется соблюдать меры безопасности...",
        category: "Экстренные",
        author: "МЧС",
        publishedAt: "2024-12-19T07:00:00",
        priority: "high",
        views: 3200
      },
      {
        id: 8,
        title: "Открытие нового детского сада",
        content: "В микрорайоне 'Солнечный' открылся новый детский сад на 240 мест. Современное оснащение и квалифицированные педагоги...",
        category: "Образование",
        author: "Департамент образования",
        publishedAt: "2024-12-18T13:45:00",
        imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aead8cfa-7e48-4bca-9053-a1f4bf4c0541.png",
        priority: "normal",
        views: 580
      }
    ]);
  }, []);

  const categories = ["all", "Транспорт", "События", "Экстренные", "Благоустройство", "Экономика", "Культура", "Образование"];

  const filteredNews = news.filter(item => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Только что";
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays < 7) return `${diffDays} дн назад`;
    
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
      case "normal": return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200";
      case "low": return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      "Транспорт": "🚌",
      "События": "🎉",
      "Экстренные": "🚨",
      "Благоустройство": "🏗️",
      "Экономика": "💼",
      "Культура": "🎭",
      "Образование": "📚"
    };
    return icons[category] || "📰";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📰 Новости города
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            placeholder="Поиск новостей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background text-foreground border-0 h-12 text-base"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4 h-auto p-1 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex items-center gap-1 text-xs px-3 py-2"
                >
                  {category !== "all" && (
                    <span className="text-sm">{getCategoryIcon(category)}</span>
                  )}
                  {category === "all" ? "Все" : category}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {filteredNews.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-muted-foreground">Новостей не найдено</p>
                </div>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    Найдено новостей: {filteredNews.length}
                  </div>
                  
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="hover:bg-accent/50 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="secondary"
                                className={getPriorityColor(item.priority)}
                              >
                                {getCategoryIcon(item.category)} {item.category}
                              </Badge>
                              {item.priority === "high" && (
                                <Badge variant="destructive" className="text-xs">
                                  Важно
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg leading-tight">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {formatDate(item.publishedAt)} • {item.author} • {item.views} просмотров
                            </CardDescription>
                          </div>
                          {item.imageUrl && (
                            <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {item.content}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7">
                              👍 Нравится
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7">
                              📤 Поделиться
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-7">
                            Читать полностью
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Breaking News Banner */}
        {filteredNews.some(item => item.priority === "high") && (
          <Card className="mt-6 border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-pulse">🚨</span>
                <div>
                  <h3 className="font-medium text-red-800 dark:text-red-200">
                    Важные новости
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    В городе есть важные обновления, требующие вашего внимания
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
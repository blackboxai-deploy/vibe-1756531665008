"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
}

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Симуляция данных о погоде
    setWeather({
      temperature: -5,
      condition: "Снег",
      icon: "❄️"
    });

    // Симуляция новостей
    setNews([
      { id: 1, title: "Открылась новая станция метро", category: "Транспорт", time: "10:30" },
      { id: 2, title: "Концерт в городском парке", category: "События", time: "09:15" },
      { id: 3, title: "Изменения в маршрутах автобусов", category: "Транспорт", time: "08:45" },
    ]);

    // Обновление времени
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
            <p className="text-primary-foreground/80 text-sm">
              {currentTime.toLocaleDateString('ru-RU', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-primary-foreground/60 text-sm">
              {currentTime.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          {weather && (
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{weather.icon}</span>
                <span className="text-2xl font-bold">{weather.temperature}°</span>
              </div>
              <p className="text-sm text-primary-foreground/80">{weather.condition}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/map">
                <Button variant="outline" className="w-full h-auto p-4 flex-col gap-2">
                  <span className="text-2xl">🗺️</span>
                  <span className="text-sm">Найти маршрут</span>
                </Button>
              </Link>
              <Link href="/transport">
                <Button variant="outline" className="w-full h-auto p-4 flex-col gap-2">
                  <span className="text-2xl">🚌</span>
                  <span className="text-sm">Транспорт</span>
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="w-full h-auto p-4 flex-col gap-2">
                  <span className="text-2xl">🏢</span>
                  <span className="text-sm">Услуги</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-auto p-4 flex-col gap-2">
                <span className="text-2xl">🚨</span>
                <span className="text-sm">Экстренные службы</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              📰 Последние новости
            </CardTitle>
            <Link href="/news">
              <Button variant="ghost" size="sm">Все новости</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {news.map((item) => (
              <div key={item.id} className="flex justify-between items-start gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-tight">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* City Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏛️ Городские сервисы
            </CardTitle>
            <CardDescription>
              Быстрый доступ к городским услугам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Button variant="ghost" className="justify-start h-auto p-3">
                <span className="mr-3">💧</span>
                <div className="text-left">
                  <div className="font-medium">Коммунальные услуги</div>
                  <div className="text-xs text-muted-foreground">Передать показания счетчиков</div>
                </div>
              </Button>
              <Button variant="ghost" className="justify-start h-auto p-3">
                <span className="mr-3">🏥</span>
                <div className="text-left">
                  <div className="font-medium">Запись к врачу</div>
                  <div className="text-xs text-muted-foreground">Онлайн запись в поликлинику</div>
                </div>
              </Button>
              <Button variant="ghost" className="justify-start h-auto p-3">
                <span className="mr-3">📄</span>
                <div className="text-left">
                  <div className="font-medium">Госуслуги</div>
                  <div className="text-xs text-muted-foreground">Получение справок и документов</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
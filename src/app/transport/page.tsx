"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface BusRoute {
  id: string;
  name: string;
  description: string;
  color: string;
  stops: string[];
  schedule: {
    weekdays: string[];
    weekends: string[];
  };
  nextArrival?: string;
}

interface BusStop {
  id: string;
  name: string;
  address: string;
  routes: string[];
  nextBuses: {
    route: string;
    arrival: string;
    minutes: number;
  }[];
}

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState("routes");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSelectedRoute] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновляем время каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const busRoutes: BusRoute[] = [
    {
      id: "12",
      name: "Маршрут №12",
      description: "Центр - Железнодорожный вокзал",
      color: "bg-blue-500",
      stops: ["Центральная площадь", "Городская больница", "Торговый центр", "Железнодорожный вокзал"],
      schedule: {
        weekdays: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30"],
        weekends: ["07:00", "07:45", "08:30", "09:15", "10:00"]
      },
      nextArrival: "2 мин"
    },
    {
      id: "34",
      name: "Маршрут №34",
      description: "Жилой район - Торговый центр",
      color: "bg-green-500",
      stops: ["Жилой квартал", "Школа №5", "Парк культуры", "Торговый центр"],
      schedule: {
        weekdays: ["06:15", "07:00", "07:45", "08:30", "09:15"],
        weekends: ["08:00", "09:00", "10:00", "11:00"]
      },
      nextArrival: "5 мин"
    },
    {
      id: "56",
      name: "Маршрут №56",
      description: "Больница - Университет",
      color: "bg-red-500",
      stops: ["Городская больница", "Центральная площадь", "Библиотека", "Университет"],
      schedule: {
        weekdays: ["06:30", "07:15", "08:00", "08:45", "09:30"],
        weekends: ["08:30", "09:30", "10:30", "11:30"]
      },
      nextArrival: "8 мин"
    },
    {
      id: "78",
      name: "Маршрут №78",
      description: "Городской парк - Аэропорт",
      color: "bg-yellow-500",
      stops: ["Городской парк", "Спортивный комплекс", "Автовокзал", "Аэропорт"],
      schedule: {
        weekdays: ["05:30", "06:30", "07:30", "08:30", "09:30"],
        weekends: ["07:00", "08:30", "10:00", "11:30"]
      },
      nextArrival: "12 мин"
    }
  ];

  const busStops: BusStop[] = [
    {
      id: "stop1",
      name: "Центральная площадь",
      address: "ул. Центральная, 1",
      routes: ["12", "56"],
      nextBuses: [
        { route: "12", arrival: "14:25", minutes: 2 },
        { route: "56", arrival: "14:32", minutes: 8 },
        { route: "12", arrival: "14:55", minutes: 32 }
      ]
    },
    {
      id: "stop2",
      name: "Торговый центр",
      address: "пр. Мира, 25",
      routes: ["12", "34"],
      nextBuses: [
        { route: "34", arrival: "14:28", minutes: 5 },
        { route: "12", arrival: "14:30", minutes: 7 },
        { route: "34", arrival: "15:13", minutes: 50 }
      ]
    },
    {
      id: "stop3",
      name: "Городская больница",
      address: "ул. Медицинская, 15",
      routes: ["12", "56"],
      nextBuses: [
        { route: "56", arrival: "14:31", minutes: 8 },
        { route: "12", arrival: "14:45", minutes: 22 }
      ]
    },
    {
      id: "stop4",
      name: "Университет",
      address: "ул. Студенческая, 10",
      routes: ["56"],
      nextBuses: [
        { route: "56", arrival: "14:40", minutes: 17 },
        { route: "56", arrival: "15:25", minutes: 62 }
      ]
    }
  ];

  const filteredRoutes = busRoutes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStops = busStops.filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🚌 Общественный транспорт
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-2">
          <Input
            placeholder="Поиск маршрутов и остановок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background text-foreground border-0 h-12 text-base"
          />
        </div>
        
        {/* Current Time */}
        <div className="text-primary-foreground/80 text-sm">
          Текущее время: {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="routes">Маршруты</TabsTrigger>
            <TabsTrigger value="stops">Остановки</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
          </TabsList>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Всего маршрутов: {filteredRoutes.length}
            </div>
            
            {filteredRoutes.map((route) => (
              <Card key={route.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${route.color} flex items-center justify-center text-white text-lg font-bold`}>
                        {route.id}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                        <CardDescription>{route.description}</CardDescription>
                      </div>
                    </div>
                    {route.nextArrival && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Через {route.nextArrival}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Остановки маршрута:</h4>
                      <div className="flex flex-wrap gap-1">
                        {route.stops.map((stop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {stop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        Интервал движения: 15-30 мин
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRoute(route.id)}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Stops Tab */}
          <TabsContent value="stops" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Остановок найдено: {filteredStops.length}
            </div>
            
            {filteredStops.map((stop) => (
              <Card key={stop.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{stop.name}</CardTitle>
                      <CardDescription>{stop.address}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Маршруты:</div>
                      <div className="flex gap-1 mt-1">
                        {stop.routes.map(route => (
                          <Badge key={route} variant="secondary" className="text-xs">
                            {route}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Ближайшие автобусы:</h4>
                    {stop.nextBuses.map((bus, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-accent/30 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">№{bus.route}</Badge>
                          <span className="text-sm">прибытие в {bus.arrival}</span>
                        </div>
                        <div className={`text-sm font-medium ${bus.minutes <= 5 ? 'text-green-600' : bus.minutes <= 15 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          {bus.minutes} мин
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📅 Расписание движения
                </CardTitle>
                <CardDescription>
                  Время отправления с начальной остановки
                </CardDescription>
              </CardHeader>
              <CardContent>
                {busRoutes.map((route) => (
                  <div key={route.id} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full ${route.color} flex items-center justify-center text-white text-sm font-bold`}>
                        {route.id}
                      </div>
                      <h3 className="font-medium">{route.name}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 ml-11">
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-blue-600">Будни</h4>
                        <div className="flex flex-wrap gap-2">
                          {route.schedule.weekdays.map((time, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-orange-600">Выходные</h4>
                        <div className="flex flex-wrap gap-2">
                          {route.schedule.weekends.map((time, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Additional Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <h3 className="font-medium">Полезная информация</h3>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <p>• Оплата: наличные, транспортная карта, мобильное приложение</p>
                      <p>• Льготы: дети до 7 лет, пенсионеры, студенты</p>
                      <p>• Справочная служба: 8 (800) 123-45-67</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
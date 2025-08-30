"use client";

import { YandexMap } from "@/components/YandexMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SearchResult {
  id: number;
  name: string;
  address: string;
  type: string;
  coordinates: [number, number];
  distance?: string;
}

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [activeTab, setActiveTab] = useState("search");

  // Симуляция поиска
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Имитация результатов поиска
    const mockResults: SearchResult[] = [
      {
        id: 1,
        name: "Центральная площадь",
        address: "ул. Центральная, 1",
        type: "Площадь",
        coordinates: [55.754, 37.622] as [number, number],
        distance: "0.5 км"
      },
      {
        id: 2,
        name: "Городская больница №1",
        address: "ул. Медицинская, 15",
        type: "Больница",
        coordinates: [55.750, 37.618] as [number, number],
        distance: "1.2 км"
      },
      {
        id: 3,
        name: "Торговый центр 'Европа'",
        address: "пр. Мира, 25",
        type: "ТЦ",
        coordinates: [55.757, 37.620] as [number, number],
        distance: "0.8 км"
      },
      {
        id: 4,
        name: "Городской парк",
        address: "ул. Парковая, 5",
        type: "Парк",
        coordinates: [55.751, 37.625] as [number, number],
        distance: "1.5 км"
      }
    ].filter(result => 
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.address.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
  };

  const busRoutes = [
    { id: "12", name: "Маршрут 12", description: "Центр - Вокзал", color: "bg-blue-500" },
    { id: "34", name: "Маршрут 34", description: "Жилой район - ТЦ", color: "bg-green-500" },
    { id: "56", name: "Маршрут 56", description: "Больница - Университет", color: "bg-red-500" },
    { id: "78", name: "Маршрут 78", description: "Парк - Аэропорт", color: "bg-yellow-500" },
  ];

  const nearbyPlaces = [
    { id: 1, name: "Кафе 'Старый город'", type: "Кафе", rating: 4.5, distance: "200 м", icon: "☕" },
    { id: 2, name: "Аптека 'Здоровье'", type: "Аптека", rating: 4.2, distance: "350 м", icon: "💊" },
    { id: 3, name: "Банк 'Сбербанк'", type: "Банк", rating: 4.0, distance: "450 м", icon: "🏦" },
    { id: 4, name: "Спортзал 'Атлас'", type: "Спорт", rating: 4.7, distance: "600 м", icon: "🏋️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🗺️ Карта города
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Поиск мест, адресов..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="bg-background text-foreground border-0 h-12 text-base"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)]">
        {/* Map Container */}
        <div className="flex-1 relative">
          <YandexMap 
            className="w-full h-full"
            center={selectedLocation || [55.753994, 37.622093]}
            zoom={selectedLocation ? 15 : 12}
            onLocationFound={(coords) => setSelectedLocation(coords)}
          />
        </div>

        {/* Side Panel */}
        <div className="lg:w-96 bg-background border-t lg:border-t-0 lg:border-l border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3 m-2 mb-0">
              <TabsTrigger value="search">Поиск</TabsTrigger>
              <TabsTrigger value="transport">Транспорт</TabsTrigger>
              <TabsTrigger value="nearby">Рядом</TabsTrigger>
            </TabsList>

            {/* Search Results */}
            <TabsContent value="search" className="p-2 space-y-2 h-full overflow-y-auto">
              {searchQuery && (
                <div className="text-sm text-muted-foreground mb-2">
                  Найдено результатов: {searchResults.length}
                </div>
              )}
              
              {searchResults.map((result) => (
                <Card key={result.id} className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => setSelectedLocation(result.coordinates)}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{result.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{result.address}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{result.type}</Badge>
                          {result.distance && (
                            <span className="text-xs text-muted-foreground">{result.distance}</span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2 text-xs px-2 py-1">
                        Показать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {!searchQuery && (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <span className="text-4xl mb-2">🔍</span>
                  <p className="text-sm text-muted-foreground">
                    Введите запрос для поиска
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Transport Routes */}
            <TabsContent value="transport" className="p-2 space-y-2 h-full overflow-y-auto">
              <div className="mb-3">
                <h3 className="font-semibold text-sm mb-2">Автобусные маршруты</h3>
              </div>
              
              {busRoutes.map((route) => (
                <Card key={route.id} className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${route.color} flex items-center justify-center text-white text-sm font-bold`}>
                        {route.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{route.name}</h4>
                        <p className="text-xs text-muted-foreground">{route.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                        Маршрут
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-accent/30">
                <CardContent className="p-3 text-center">
                  <div className="text-2xl mb-2">🚌</div>
                  <p className="text-sm font-medium">Онлайн-отслеживание</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Следите за движением автобусов в режиме реального времени
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nearby Places */}
            <TabsContent value="nearby" className="p-2 space-y-2 h-full overflow-y-auto">
              <div className="mb-3">
                <h3 className="font-semibold text-sm mb-2">Рядом с вами</h3>
              </div>
              
              {nearbyPlaces.map((place) => (
                <Card key={place.id} className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{place.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{place.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{place.type}</Badge>
                          <span className="text-xs text-muted-foreground">{place.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500 text-sm">★</span>
                          <span className="text-xs text-muted-foreground">{place.rating}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                        Перейти
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
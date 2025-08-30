"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

declare global {
  interface Window {
    ymaps3: any;
  }
}

interface MapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  onLocationFound?: (coordinates: [number, number]) => void;
}

export function YandexMap({ 
  className = "w-full h-full", 
  center = [55.753994, 37.622093], // Москва по умолчанию
  zoom = 10,
  onLocationFound 
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Симуляция данных о транспорте
  const busStops = [
    { id: 1, name: "Центральная площадь", coordinates: [55.754, 37.622], routes: ["12", "34", "56"] },
    { id: 2, name: "Городской парк", coordinates: [55.751, 37.625], routes: ["12", "78"] },
    { id: 3, name: "Торговый центр", coordinates: [55.757, 37.620], routes: ["34", "56", "90"] },
    { id: 4, name: "Больница", coordinates: [55.750, 37.618], routes: ["78", "90"] },
    { id: 5, name: "Университет", coordinates: [55.756, 37.628], routes: ["12", "90"] },
  ];

  const pointsOfInterest = [
    { id: 1, name: "Городская библиотека", coordinates: [55.753, 37.624], type: "library", icon: "📚" },
    { id: 2, name: "Спортивный комплекс", coordinates: [55.752, 37.619], type: "sports", icon: "🏊" },
    { id: 3, name: "Музей истории города", coordinates: [55.755, 37.623], type: "museum", icon: "🏛️" },
    { id: 4, name: "Ресторан 'У дома'", coordinates: [55.754, 37.621], type: "restaurant", icon: "🍽️" },
    { id: 5, name: "Аптека 24/7", coordinates: [55.751, 37.626], type: "pharmacy", icon: "💊" },
  ];

  useEffect(() => {
    const initMap = async () => {
      try {
        // Ждем загрузки Yandex Maps API
        if (!window.ymaps3) {
          // Если API не загружен, показываем симулированную карту
          setError("Карта временно недоступна. Показана демонстрационная версия.");
          setIsLoading(false);
          return;
        }

        await window.ymaps3.ready;
        
        if (mapContainer.current && !map) {
          const mapInstance = new window.ymaps3.YMap(mapContainer.current, {
            location: {
              center: center,
              zoom: zoom
            }
          });

          // Добавляем базовый слой карты
          mapInstance.addChild(new window.ymaps3.YMapDefaultSchemeLayer());
          
          // Добавляем элементы управления
          mapInstance.addChild(new window.ymaps3.YMapDefaultFeaturesLayer());

          // Добавляем маркеры остановок
          busStops.forEach(stop => {
            const marker = new window.ymaps3.YMapMarker(
              { 
                coordinates: stop.coordinates,
                draggable: false
              },
              document.createElement('div')
            );
            
            marker.element.innerHTML = `
              <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer" title="${stop.name}">
                🚌
              </div>
            `;
            
            mapInstance.addChild(marker);
          });

          // Добавляем маркеры достопримечательностей
          pointsOfInterest.forEach(poi => {
            const marker = new window.ymaps3.YMapMarker(
              { 
                coordinates: poi.coordinates,
                draggable: false
              },
              document.createElement('div')
            );
            
            marker.element.innerHTML = `
              <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg cursor-pointer" title="${poi.name}">
                ${poi.icon}
              </div>
            `;
            
            mapInstance.addChild(marker);
          });

          setMap(mapInstance);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка инициализации карты:', err);
        setError("Не удалось загрузить карту");
        setIsLoading(false);
      }
    };

    initMap();
  }, [center, zoom, map]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setUserLocation(coords);
        if (onLocationFound) {
          onLocationFound(coords);
        }
        
        // Перемещаем карту к местоположению пользователя
        if (map) {
          map.setLocation({
            center: coords,
            zoom: 15
          });
        }
      },
      (error) => {
        setError("Не удалось определить местоположение");
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  if (error && !map) {
    return (
      <div className={`${className} relative bg-gray-100 dark:bg-gray-800 rounded-lg`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-center text-muted-foreground mb-4">{error}</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {busStops.slice(0, 4).map(stop => (
              <Card key={stop.id} className="p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚌</span>
                  <div>
                    <p className="text-sm font-medium">{stop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Маршруты: {stop.routes.join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">🗺️</div>
            <p className="text-sm text-muted-foreground">Загрузка карты...</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Кнопка определения местоположения */}
      <Button
        onClick={getCurrentLocation}
        className="absolute top-4 right-4 z-10 w-12 h-12 p-0"
        variant="secondary"
        size="icon"
        title="Определить местоположение"
      >
        📍
      </Button>

      {/* Легенда */}
      <Card className="absolute bottom-4 left-4 z-10 max-w-xs">
        <CardContent className="p-3">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🚌</span>
              <span>Автобусные остановки</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">📚</span>
              <span>Достопримечательности</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Ваше местоположение</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
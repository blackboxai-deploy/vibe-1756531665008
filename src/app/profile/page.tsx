"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  favoriteRoutes: string[];
  notifications: {
    news: boolean;
    transport: boolean;
    emergency: boolean;
    weather: boolean;
  };
  theme: "light" | "dark" | "system";
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Иван Петров",
    email: "ivan.petrov@email.com", 
    phone: "+7 (900) 123-45-67",
    address: "ул. Центральная, д. 15, кв. 25",
    favoriteRoutes: ["12", "34"],
    notifications: {
      news: true,
      transport: true,
      emergency: true,
      weather: false
    },
    theme: "system"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [stats] = useState({
    newsRead: 47,
    routesUsed: 12,
    servicesUsed: 8,
    daysActive: 15
  });

  useEffect(() => {
    // Загрузка профиля из локального хранилища
    const savedProfile = localStorage.getItem('cityAppProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('cityAppProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const toggleNotification = (key: keyof typeof profile.notifications) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const removeFavoriteRoute = (routeId: string) => {
    setProfile(prev => ({
      ...prev,
      favoriteRoutes: prev.favoriteRoutes.filter(id => id !== routeId)
    }));
  };

  const achievements = [
    { id: 1, name: "Активный читатель", description: "Прочитано 50+ новостей", earned: false, icon: "📚" },
    { id: 2, name: "Путешественник", description: "Использовано 10+ маршрутов", earned: true, icon: "🚌" },
    { id: 3, name: "Горожанин", description: "Активность 30+ дней", earned: false, icon: "🏙️" },
    { id: 4, name: "Помощник", description: "Оценено 5+ услуг", earned: false, icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Профиль</h1>
            <p className="text-primary-foreground/80 text-sm">
              Управление аккаунтом и настройками
            </p>
          </div>
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>
                Основные данные вашего профиля
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
            >
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-20">Имя:</span>
                  <span className="font-medium">{profile.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-20">Email:</span>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-20">Телефон:</span>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-20">Адрес:</span>
                  <span className="text-sm">{profile.address}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Статистика использования
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.newsRead}</div>
                <div className="text-xs text-muted-foreground">Новостей прочитано</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.routesUsed}</div>
                <div className="text-xs text-muted-foreground">Маршрутов использовано</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.servicesUsed}</div>
                <div className="text-xs text-muted-foreground">Услуг использовано</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.daysActive}</div>
                <div className="text-xs text-muted-foreground">Дней активности</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⭐ Избранные маршруты
            </CardTitle>
            <CardDescription>
              Ваши часто используемые маршруты
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile.favoriteRoutes.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Нет избранных маршрутов
              </p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {profile.favoriteRoutes.map(routeId => (
                  <Badge 
                    key={routeId} 
                    variant="secondary" 
                    className="flex items-center gap-1"
                  >
                    🚌 Маршрут {routeId}
                    <button
                      onClick={() => removeFavoriteRoute(routeId)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔔 Уведомления
            </CardTitle>
            <CardDescription>
              Настройте получение уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Новости города</div>
                <div className="text-sm text-muted-foreground">
                  Важные новости и объявления
                </div>
              </div>
              <Switch
                checked={profile.notifications.news}
                onCheckedChange={() => toggleNotification('news')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Транспорт</div>
                <div className="text-sm text-muted-foreground">
                  Изменения в расписании и маршрутах
                </div>
              </div>
              <Switch
                checked={profile.notifications.transport}
                onCheckedChange={() => toggleNotification('transport')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Экстренные сообщения</div>
                <div className="text-sm text-muted-foreground">
                  Важные уведомления от городских служб
                </div>
              </div>
              <Switch
                checked={profile.notifications.emergency}
                onCheckedChange={() => toggleNotification('emergency')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Погода</div>
                <div className="text-sm text-muted-foreground">
                  Прогноз погоды и предупреждения
                </div>
              </div>
              <Switch
                checked={profile.notifications.weather}
                onCheckedChange={() => toggleNotification('weather')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏆 Достижения
            </CardTitle>
            <CardDescription>
              Ваши успехи в использовании приложения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.earned 
                      ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                      : "bg-muted/50 border-muted"
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.earned ? "text-green-800 dark:text-green-200" : ""}`}>
                      {achievement.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-green-600 text-white">
                      Получено
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Настройки приложения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              🌓 Тема оформления
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🗣️ Язык интерфейса
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📱 О приложении
            </Button>
            <Separator />
            <Button variant="destructive" className="w-full">
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
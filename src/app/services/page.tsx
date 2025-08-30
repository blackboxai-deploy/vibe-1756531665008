"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  address?: string;
  workingHours: string;
  website?: string;
  isEmergency?: boolean;
  rating?: number;
  icon: string;
}

interface Utility {
  id: string;
  name: string;
  description: string;
  phone: string;
  emergencyPhone?: string;
  website: string;
  icon: string;
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("services");
  const [searchQuery, setSearchQuery] = useState("");

  const services: Service[] = [
    {
      id: "medical1",
      name: "Городская поликлиника №1",
      description: "Многопрофильная поликлиника с современным оборудованием",
      category: "Здравоохранение",
      phone: "+7 (800) 123-45-01",
      address: "ул. Медицинская, 15",
      workingHours: "Пн-Пт: 8:00-20:00, Сб: 9:00-15:00",
      website: "https://hospital1.example.com",
      rating: 4.3,
      icon: "🏥"
    },
    {
      id: "education1",
      name: "Школа №5",
      description: "Общеобразовательная школа с углубленным изучением математики",
      category: "Образование",
      phone: "+7 (800) 123-45-05",
      address: "ул. Школьная, 10",
      workingHours: "Пн-Пт: 8:00-17:00",
      rating: 4.6,
      icon: "🏫"
    },
    {
      id: "gov1",
      name: "МФЦ 'Мои документы'",
      description: "Получение государственных услуг в одном месте",
      category: "Государственные услуги",
      phone: "+7 (800) 123-45-10",
      address: "пр. Центральный, 25",
      workingHours: "Пн-Сб: 8:00-20:00",
      website: "https://mfc.example.com",
      rating: 4.1,
      icon: "🏛️"
    },
    {
      id: "bank1",
      name: "Отделение Сбербанка",
      description: "Банковские услуги и консультации",
      category: "Банковские услуги",
      phone: "+7 (800) 123-45-15",
      address: "ул. Финансовая, 8",
      workingHours: "Пн-Пт: 9:00-19:00, Сб: 9:00-16:00",
      rating: 4.0,
      icon: "🏦"
    },
    {
      id: "post1",
      name: "Почта России",
      description: "Почтовые услуги и доставка",
      category: "Почтовые услуги",
      phone: "+7 (800) 123-45-20",
      address: "ул. Почтовая, 3",
      workingHours: "Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-18:00",
      rating: 3.8,
      icon: "📮"
    }
  ];

  const utilities: Utility[] = [
    {
      id: "water",
      name: "Водоканал",
      description: "Водоснабжение и водоотведение",
      phone: "+7 (800) 123-46-01",
      emergencyPhone: "+7 (800) 123-46-99",
      website: "https://water.example.com",
      icon: "💧"
    },
    {
      id: "gas",
      name: "Газовая служба",
      description: "Газоснабжение и обслуживание газового оборудования",
      phone: "+7 (800) 123-47-01",
      emergencyPhone: "104",
      website: "https://gas.example.com",
      icon: "⚡"
    },
    {
      id: "electric",
      name: "Электросети",
      description: "Электроснабжение и обслуживание электросетей",
      phone: "+7 (800) 123-48-01",
      emergencyPhone: "+7 (800) 123-48-99",
      website: "https://electric.example.com",
      icon: "🔌"
    },
    {
      id: "heating",
      name: "Теплосети",
      description: "Теплоснабжение и отопление",
      phone: "+7 (800) 123-49-01",
      emergencyPhone: "+7 (800) 123-49-99",
      website: "https://heating.example.com",
      icon: "🔥"
    }
  ];

  const emergencyServices = [
    { name: "Пожарная служба", phone: "101", icon: "🚒", color: "text-red-600" },
    { name: "Полиция", phone: "102", icon: "👮", color: "text-blue-600" },
    { name: "Скорая помощь", phone: "103", icon: "🚑", color: "text-green-600" },
    { name: "Газовая служба", phone: "104", icon: "⚡", color: "text-yellow-600" },
    { name: "Единая служба спасения", phone: "112", icon: "🆘", color: "text-red-600" }
  ];



  const filteredServices = services.filter(service => {
    const matchesCategory = activeTab === "services" || service.category === activeTab.replace("services-", "");
    const matchesSearch = searchQuery === "" || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const makePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const openWebsite = (website: string) => {
    window.open(website, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🏢 Городские услуги
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            placeholder="Поиск услуг и организаций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background text-foreground border-0 h-12 text-base"
          />
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="services">Учреждения</TabsTrigger>
            <TabsTrigger value="utilities">ЖКХ</TabsTrigger>
            <TabsTrigger value="emergency">Экстренные</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Найдено учреждений: {filteredServices.length}
            </div>
            
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {service.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{service.category}</Badge>
                          {service.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-xs text-muted-foreground">{service.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span>📞</span>
                      <span className="text-muted-foreground">Телефон:</span>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => makePhoneCall(service.phone)}
                      >
                        {service.phone}
                      </Button>
                    </div>
                    
                    {service.address && (
                      <div className="flex items-center gap-2 text-sm">
                        <span>📍</span>
                        <span className="text-muted-foreground">Адрес:</span>
                        <span>{service.address}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span>🕐</span>
                      <span className="text-muted-foreground">Режим работы:</span>
                      <span>{service.workingHours}</span>
                    </div>
                    
                    {service.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <span>🌐</span>
                        <span className="text-muted-foreground">Сайт:</span>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:text-blue-800"
                          onClick={() => openWebsite(service.website!)}
                        >
                          Перейти на сайт
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      size="sm" 
                      onClick={() => makePhoneCall(service.phone)}
                      className="flex-1"
                    >
                      📞 Позвонить
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      📍 Маршрут
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Utilities Tab */}
          <TabsContent value="utilities" className="space-y-4">
            <Alert>
              <AlertDescription>
                💡 Для экстренных ситуаций используйте специальные номера или обращайтесь в службу 112
              </AlertDescription>
            </Alert>
            
            {utilities.map((utility) => (
              <Card key={utility.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{utility.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{utility.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {utility.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span>📞</span>
                      <span className="text-muted-foreground">Справочная:</span>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => makePhoneCall(utility.phone)}
                      >
                        {utility.phone}
                      </Button>
                    </div>
                    
                    {utility.emergencyPhone && (
                      <div className="flex items-center gap-2 text-sm">
                        <span>🚨</span>
                        <span className="text-muted-foreground">Аварийная служба:</span>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-red-600 hover:text-red-800 font-medium"
                          onClick={() => makePhoneCall(utility.emergencyPhone!)}
                        >
                          {utility.emergencyPhone}
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span>🌐</span>
                      <span className="text-muted-foreground">Сайт:</span>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => openWebsite(utility.website)}
                      >
                        Перейти на сайт
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      size="sm" 
                      onClick={() => makePhoneCall(utility.phone)}
                      className="flex-1"
                    >
                      📞 Справочная
                    </Button>
                    {utility.emergencyPhone && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => makePhoneCall(utility.emergencyPhone!)}
                        className="flex-1"
                      >
                        🚨 Авария
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-4">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertDescription className="text-red-800 dark:text-red-200">
                🚨 В экстренных ситуациях звоните по указанным номерам. Все вызовы бесплатные.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-3">
              {emergencyServices.map((service, index) => (
                <Card key={index} className="hover:bg-accent/50 transition-colors border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{service.icon}</span>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className={`text-2xl font-bold ${service.color}`}>
                            {service.phone}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        variant="destructive"
                        onClick={() => makePhoneCall(service.phone)}
                        className="min-w-[100px]"
                      >
                        Вызвать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Emergency Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  ℹ️ Полезная информация
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• При вызове экстренных служб четко назовите адрес и характер происшествия</p>
                  <p>• Все номера экстренных служб работают круглосуточно</p>
                  <p>• Вызовы с мобильных и стационарных телефонов бесплатны</p>
                  <p>• Номер 112 работает даже при заблокированной SIM-карте</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
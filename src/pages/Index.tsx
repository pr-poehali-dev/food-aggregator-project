import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Пицца Маргарита', price: 599, quantity: 1, restaurant: 'Додо Пицца' },
    { id: 2, name: 'Ролл Филадельфия', price: 320, quantity: 2, restaurant: 'Суши Мастер' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Пицца', emoji: '🍕', count: 120 },
    { name: 'Суши', emoji: '🍣', count: 85 },
    { name: 'Бургеры', emoji: '🍔', count: 95 },
    { name: 'Салаты', emoji: '🥗', count: 60 },
    { name: 'Десерты', emoji: '🍰', count: 45 },
    { name: 'Пиво', emoji: '🍺', count: 30 }
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Додо Пицца',
      cuisine: 'Пицца, Итальянская',
      rating: 4.5,
      deliveryTime: '25-35 мин',
      deliveryPrice: 199,
      image: '/img/52e85de7-de44-41fd-bdab-b046fe969742.jpg',
      tags: ['Популярное', 'Быстрая доставка'],
      discount: '20% на первый заказ'
    },
    {
      id: 2,
      name: 'Суши Мастер',
      cuisine: 'Суши, Японская',
      rating: 4.8,
      deliveryTime: '30-45 мин',
      deliveryPrice: 0,
      image: '/img/7dbbd138-6551-482a-86cb-dba9978afc2f.jpg',
      tags: ['Премиум', 'Бесплатная доставка'],
      discount: null
    },
    {
      id: 3,
      name: 'Burger Club',
      cuisine: 'Бургеры, Американская',
      rating: 4.3,
      deliveryTime: '20-30 мин',
      deliveryPrice: 150,
      image: '/img/7ab6137d-97cc-45d5-9c86-7ee85524285b.jpg',
      tags: ['Новинка'],
      discount: 'Скидка 15%'
    }
  ];

  const stories = [
    { id: 1, name: 'Dodо', avatar: '🍕', active: true },
    { id: 2, name: 'Суши', avatar: '🍣', active: true },
    { id: 3, name: 'KFC', avatar: '🍗', active: false },
    { id: 4, name: 'Макдак', avatar: '🍟', active: true }
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (item: any) => {
    setCartItems(prev => [...prev, { ...item, id: Date.now(), quantity: 1 }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn.poehali.dev/files/f22d51be-4de6-4f55-b0ac-23d642ad8792.png" 
                alt="На Обед" 
                className="h-10"
              />
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="MapPin" size={16} />
                <span>Москва, ул. Тверская 12</span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Поиск по ресторанам, кухне или блюдам"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={20} />
                <span className="hidden md:inline ml-2">Избранное</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="User" size={20} />
                <span className="hidden md:inline ml-2">Войти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
                    СТ
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Стас</CardTitle>
                <CardDescription>Новичок на 1 539 ₽</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Бонусы</span>
                  <span className="font-semibold">159 ₽</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <Icon name="Truck" size={16} className="mr-2" />
                  Доставка
                </Button>
                <Button variant="outline" className="w-full">
                  Самовывоз
                </Button>
                <div className="pt-3 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="MapPin" size={16} className="text-gray-400" />
                      <span>Киров, 25а</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Римская пицца с креветками
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-6">
            {/* Stories */}
            <div className="mb-6">
              <div className="flex space-x-4 pb-4 overflow-x-auto">
                {stories.map((story) => (
                  <div key={story.id} className="flex flex-col items-center space-y-2 min-w-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer hover-scale ${
                      story.active 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-600 ring-2 ring-orange-300' 
                        : 'bg-gray-200'
                    }`}>
                      {story.avatar}
                    </div>
                    <span className="text-xs font-medium text-center truncate w-16">
                      {story.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Banner */}
            <Card className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">✨ Новинки и скидки</h2>
                    <p className="text-orange-100 mb-4">Оповещать вас о выгодных акциях в ресторанах?</p>
                    <div className="flex space-x-3">
                      <Button variant="secondary" size="sm">Да</Button>
                      <Button variant="ghost" size="sm" className="text-white hover:text-orange-600">Нет</Button>
                    </div>
                  </div>
                  <div className="text-6xl opacity-20">🍕</div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.name} className="cursor-pointer hover-scale transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{category.emoji}</div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.count} заведений</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">В Новокузнецке {restaurants.length} заведения</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Все
                  </Button>
                  <Button variant="outline" size="sm">Доставка еды</Button>
                  <Button variant="outline" size="sm">Рестораны</Button>
                </div>
              </div>

              <div className="space-y-4">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-32 h-24 relative overflow-hidden rounded-l-lg">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          {restaurant.discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                              {restaurant.discount}
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                              <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                              <span className="font-semibold">{restaurant.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={14} />
                                <span>{restaurant.deliveryTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Truck" size={14} />
                                <span>{restaurant.deliveryPrice > 0 ? `${restaurant.deliveryPrice} ₽` : 'Бесплатно'}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {restaurant.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Cart */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Корзина</span>
                  <Badge variant="secondary">{cartItems.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{item.name}</h5>
                          <p className="text-xs text-gray-500">{item.restaurant}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" className="h-6 w-6 p-0">-</Button>
                              <span className="text-sm font-medium">{item.quantity}</span>
                              <Button size="sm" variant="outline" className="h-6 w-6 p-0">+</Button>
                            </div>
                            <span className="font-semibold text-sm">{item.price * item.quantity} ₽</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">Итого:</span>
                        <span className="font-bold text-lg">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Оформить заказ
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Мин. сумма заказа:</span>
                        <span>600 ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Доставка:</span>
                        <span>199 ₽</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Корзина пуста</p>
                    <p className="text-sm text-gray-400">Добавьте блюда из ресторанов</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Пицца Маргарита', price: 599, quantity: 1, restaurant: 'Додо Пицца', restaurantId: 1 },
    { id: 2, name: 'Ролл Филадельфия', price: 320, quantity: 2, restaurant: 'Суши Мастер', restaurantId: 2 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  // Расширенные данные ресторанов с меню
  const restaurantsData = [
    {
      id: 1,
      name: 'Додо Пицца',
      cuisine: 'Пицца, Итальянская',
      rating: 4.5,
      deliveryTime: '25-35 мин',
      deliveryPrice: 199,
      image: '/img/52e85de7-de44-41fd-bdab-b046fe969742.jpg',
      tags: ['Популярное', 'Быстрая доставка'],
      discount: '20% на первый заказ',
      category: 'pizza',
      menu: [
        { id: 1, name: 'Пицца Маргарита', price: 599, description: 'Томатный соус, сыр моцарелла, базилик', image: '/img/52e85de7-de44-41fd-bdab-b046fe969742.jpg' },
        { id: 2, name: 'Пицца Пепперони', price: 699, description: 'Томатный соус, сыр моцарелла, пепперони', image: '/img/52e85de7-de44-41fd-bdab-b046fe969742.jpg' },
        { id: 3, name: 'Пицца 4 сыра', price: 799, description: 'Моцарелла, пармезан, дор блю, чеддер', image: '/img/52e85de7-de44-41fd-bdab-b046fe969742.jpg' }
      ]
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
      discount: null,
      category: 'sushi',
      menu: [
        { id: 4, name: 'Ролл Филадельфия', price: 320, description: 'Лосось, огурец, сливочный сыр', image: '/img/7dbbd138-6551-482a-86cb-dba9978afc2f.jpg' },
        { id: 5, name: 'Ролл Калифорния', price: 290, description: 'Краб, авокадо, огурец, икра тобико', image: '/img/7dbbd138-6551-482a-86cb-dba9978afc2f.jpg' },
        { id: 6, name: 'Сашими лосось', price: 450, description: 'Свежий лосось 6 кусочков', image: '/img/7dbbd138-6551-482a-86cb-dba9978afc2f.jpg' }
      ]
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
      discount: 'Скидка 15%',
      category: 'burgers',
      menu: [
        { id: 7, name: 'Чизбургер', price: 390, description: 'Говяжья котлета, сыр чеддер, соус', image: '/img/7ab6137d-97cc-45d5-9c86-7ee85524285b.jpg' },
        { id: 8, name: 'Биг Бургер', price: 490, description: 'Двойная котлета, бекон, сыр, овощи', image: '/img/7ab6137d-97cc-45d5-9c86-7ee85524285b.jpg' },
        { id: 9, name: 'Картофель фри', price: 150, description: 'Хрустящий картофель с соусом', image: '/img/7ab6137d-97cc-45d5-9c86-7ee85524285b.jpg' }
      ]
    }
  ];

  // Фильтрация ресторанов
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantsData;
    
    if (searchQuery) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.menu.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(restaurant => restaurant.category === selectedCategory);
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 199;
  const finalPrice = totalPrice + deliveryFee;

  // Функции управления корзиной
  const addToCart = (menuItem, restaurant) => {
    const existingItem = cartItems.find(item => item.id === menuItem.id);
    
    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        restaurant: restaurant.name,
        restaurantId: restaurant.id
      }]);
    }
    
    toast({
      title: 'Добавлено в корзину',
      description: `${menuItem.name} добавлен в корзину`,
    });
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Удалено из корзины',
      description: 'Товар удален из корзины',
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: 'Корзина очищена',
      description: 'Все товары удалены из корзины',
    });
  };

  // Функции для сторис
  const openStory = (story) => {
    setCurrentStory(story);
    setShowStoryModal(true);
  };

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  const categories = [
    { name: 'Все', emoji: '🍽️', count: restaurantsData.length, key: 'all' },
    { name: 'Пицца', emoji: '🍕', count: restaurantsData.filter(r => r.category === 'pizza').length, key: 'pizza' },
    { name: 'Суши', emoji: '🍣', count: restaurantsData.filter(r => r.category === 'sushi').length, key: 'sushi' },
    { name: 'Бургеры', emoji: '🍔', count: restaurantsData.filter(r => r.category === 'burgers').length, key: 'burgers' },
    { name: 'Салаты', emoji: '🥗', count: 0, key: 'salads' },
    { name: 'Десерты', emoji: '🍰', count: 0, key: 'desserts' }
  ];

  const stories = [
    { id: 1, name: 'Dodо', avatar: '🍕', active: true, content: 'Новая пицца с трюфелями! Попробуйте уже сегодня со скидкой 25%' },
    { id: 2, name: 'Суши', avatar: '🍣', active: true, content: 'Свежая рыба каждый день! Доставка суши за 30 минут' },
    { id: 3, name: 'KFC', avatar: '🍗', active: false, content: 'Острые крылышки в новом соусе' },
    { id: 4, name: 'Макдак', avatar: '🍟', active: true, content: 'Биг Мак + картофель фри = 299₽ до конца недели!' }
  ];

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
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer hover-scale transition-all ${
                        story.active 
                          ? 'bg-gradient-to-r from-orange-400 to-orange-600 ring-2 ring-orange-300' 
                          : 'bg-gray-200'
                      }`}
                      onClick={() => story.active && openStory(story)}
                    >
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
                  <Card 
                    key={category.key} 
                    className={`cursor-pointer hover-scale transition-all duration-200 hover:shadow-md ${
                      selectedCategory === category.key ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                    }`}
                    onClick={() => handleCategoryClick(category.key)}
                  >
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
                <h3 className="text-xl font-semibold">
                  {searchQuery ? `Найдено ${filteredRestaurants.length} заведений` : `В Новокузнецке ${filteredRestaurants.length} заведения`}
                </h3>
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    <Icon name="Filter" size={16} className="mr-2" />
                    Все
                  </Button>
                  <Button variant="outline" size="sm">Доставка еды</Button>
                  <Button variant="outline" size="sm">Рестораны</Button>
                </div>
              </div>

              {filteredRestaurants.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Ничего не найдено</h4>
                  <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRestaurants.map((restaurant) => (
                    <Dialog key={restaurant.id}>
                      <DialogTrigger asChild>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
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
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-3">
                            <img src={restaurant.image} alt={restaurant.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <h3 className="text-xl font-bold">{restaurant.name}</h3>
                              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                                <span>{restaurant.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={14} />
                                <span>{restaurant.deliveryTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Truck" size={14} />
                                <span>{restaurant.deliveryPrice > 0 ? `${restaurant.deliveryPrice} ₽` : 'Бесплатно'}</span>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-4">Меню</h4>
                          <div className="grid gap-4">
                            {restaurant.menu.map((item) => (
                              <Card key={item.id} className="p-4">
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-semibold">{item.name}</h5>
                                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                    <div className="flex items-center justify-between">
                                      <span className="text-lg font-bold">{item.price} ₽</span>
                                      <Button 
                                        onClick={() => addToCart(item, restaurant)}
                                        className="bg-orange-500 hover:bg-orange-600"
                                      >
                                        <Icon name="Plus" size={16} className="mr-2" />
                                        В корзину
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Товары</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700"
                      >
                        Очистить
                      </Button>
                    </div>
                    
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{item.name}</h5>
                              <p className="text-xs text-gray-500">{item.restaurant}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            >
                              <Icon name="X" size={14} />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <span className="font-semibold text-sm">{item.price * item.quantity} ₽</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-3 border-t space-y-3">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Товары:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Доставка:</span>
                          <span>{deliveryFee} ₽</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                          <span>Итого:</span>
                          <span>{finalPrice} ₽</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        disabled={totalPrice < 600}
                        onClick={() => {
                          toast({
                            title: 'Заказ оформлен!',
                            description: `Ваш заказ на ${finalPrice} ₽ принят в обработку`,
                          });
                        }}
                      >
                        {totalPrice < 600 
                          ? `Минимум 600 ₽ (не хватает ${600 - totalPrice} ₽)`
                          : 'Оформить заказ'
                        }
                      </Button>
                    </div>

                    {totalPrice < 600 && (
                      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        <Icon name="AlertCircle" size={14} className="inline mr-1" />
                        Минимальная сумма заказа 600 ₽
                      </div>
                    )}
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
      
      {/* Story Modal */}
      <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span className="text-2xl">{currentStory?.avatar}</span>
              <span>{currentStory?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">{currentStory?.content}</p>
          </div>
          <div className="flex space-x-3">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Перейти в ресторан
            </Button>
            <Button variant="outline" onClick={() => setShowStoryModal(false)}>
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
export type SafetyLevel = 'safe' | 'caution' | 'danger' | 'unknown';

export interface Ingredient {
  id: string;
  inci: string;
  name: string;
  functions: string[];
  safety: SafetyLevel;
  safetyScore: number;
  description: string;
  comedogenic?: number;
  ewg?: number;
  tags: string[];
  concerns?: string[];
}

export const INGREDIENTS_DB: Ingredient[] = [
  { id: '1', inci: 'AQUA', name: 'Вода', functions: ['Растворитель'], safety: 'safe', safetyScore: 10, description: 'Основа большинства косметических формул. Растворяет водорастворимые ингредиенты.', ewg: 1, tags: ['Увлажнение', 'Основа'], comedogenic: 0 },
  { id: '2', inci: 'TITANIUM DIOXIDE', name: 'Диоксид титана', functions: ['УФ-фильтр', 'Пигмент'], safety: 'safe', safetyScore: 9, description: 'Минеральный УФ-фильтр широкого спектра действия. Используется как физический санскрин и белый пигмент.', ewg: 1, tags: ['Минеральный', 'УФ-защита', 'Пигмент'], comedogenic: 0 },
  { id: '3', inci: 'ZINC OXIDE', name: 'Оксид цинка', functions: ['УФ-фильтр', 'Антисептик'], safety: 'safe', safetyScore: 9, description: 'Минеральный УФ-фильтр с противовоспалительными свойствами. Подходит для чувствительной кожи.', ewg: 1, tags: ['Минеральный', 'УФ-защита', 'Успокаивающий'], comedogenic: 0 },
  { id: '4', inci: 'TALC', name: 'Тальк', functions: ['Абсорбент', 'Наполнитель'], safety: 'caution', safetyScore: 6, description: 'Минеральный порошок для улучшения текстуры. Споры о содержании асбеста сделали его спорным ингредиентом.', ewg: 3, tags: ['Минеральный', 'Текстура'], concerns: ['Возможное загрязнение асбестом'], comedogenic: 0 },
  { id: '5', inci: 'MICA', name: 'Слюда', functions: ['Пигмент', 'Блеск'], safety: 'safe', safetyScore: 9, description: 'Природный минеральный пигмент, создающий мерцающий эффект. Широко используется в декоративной косметике.', ewg: 2, tags: ['Минеральный', 'Пигмент', 'Блеск'], comedogenic: 0 },
  { id: '6', inci: 'DIMETHICONE', name: 'Диметикон', functions: ['Эмолент', 'Кондиционер'], safety: 'safe', safetyScore: 8, description: 'Силиконовый полимер для создания гладкой текстуры. Образует защитную плёнку на коже.', ewg: 1, tags: ['Силикон', 'Текстура', 'Разглаживающий'], comedogenic: 1 },
  { id: '7', inci: 'CYCLOPENTASILOXANE', name: 'Циклопентасилоксан', functions: ['Растворитель', 'Эмолент'], safety: 'caution', safetyScore: 5, description: 'Летучий силикон для улучшения наносимости. Под вопросом биоаккумуляция в окружающей среде.', ewg: 4, tags: ['Силикон', 'Летучий'], concerns: ['Возможная биоаккумуляция', 'Экологические риски'], comedogenic: 2 },
  { id: '8', inci: 'PHENOXYETHANOL', name: 'Феноксиэтанол', functions: ['Консервант'], safety: 'caution', safetyScore: 6, description: 'Широко используемый консервант. Считается более безопасной альтернативой парабенам.', ewg: 4, tags: ['Консервант'], concerns: ['Возможный раздражитель при высоких концентрациях'], comedogenic: 0 },
  { id: '9', inci: 'METHYLPARABEN', name: 'Метилпарабен', functions: ['Консервант'], safety: 'caution', safetyScore: 5, description: 'Один из наиболее распространённых парабенов. Эффективный консервант с дискуссионными данными о безопасности.', ewg: 4, tags: ['Парабен', 'Консервант'], concerns: ['Эстрогенная активность', 'Возможный эндокринный дизраптор'], comedogenic: 0 },
  { id: '10', inci: 'PROPYLPARABEN', name: 'Пропилпарабен', functions: ['Консервант'], safety: 'caution', safetyScore: 4, description: 'Парабен с более длинной цепью, сильнее связывается с эстрогеновыми рецепторами.', ewg: 5, tags: ['Парабен', 'Консервант'], concerns: ['Эндокринный дизраптор', 'Репродуктивная токсичность'], comedogenic: 0 },
  { id: '11', inci: 'IRON OXIDES', name: 'Оксиды железа', functions: ['Пигмент'], safety: 'safe', safetyScore: 10, description: 'Синтетические минеральные пигменты жёлтого, красного, чёрного и коричневого цветов. Исключительно безопасны.', ewg: 1, tags: ['Пигмент', 'Минеральный', 'Синтетический'], comedogenic: 0 },
  { id: '12', inci: 'GLYCERIN', name: 'Глицерин', functions: ['Увлажнитель', 'Растворитель'], safety: 'safe', safetyScore: 10, description: 'Мощный гигроскопичный агент, привлекающий влагу из воздуха к коже. Хорошо переносится всеми типами кожи.', ewg: 1, tags: ['Увлажнение', 'Натуральный'], comedogenic: 0 },
  { id: '13', inci: 'NIACINAMIDE', name: 'Ниацинамид', functions: ['Осветлитель', 'Противовоспалительное'], safety: 'safe', safetyScore: 10, description: 'Витамин B3 — один из самых изученных активных ингредиентов. Выравнивает тон, уменьшает поры, укрепляет барьер.', ewg: 1, tags: ['Витамин', 'Активный', 'Антивозрастной'], comedogenic: 0 },
  { id: '14', inci: 'RETINOL', name: 'Ретинол', functions: ['Антивозрастной', 'Регенерирующий'], safety: 'caution', safetyScore: 7, description: 'Производное витамина А с доказанной эффективностью против морщин. Требует осторожного введения в уход.', ewg: 3, tags: ['Витамин A', 'Активный', 'Антивозрастной'], concerns: ['Фотосенсибилизация', 'Раздражение при начале использования', 'Запрещён при беременности'], comedogenic: 0 },
  { id: '15', inci: 'SALICYLIC ACID', name: 'Салициловая кислота', functions: ['Эксфолиант', 'Антисептик'], safety: 'caution', safetyScore: 7, description: 'Бета-гидроксикислота с кератолитическим действием. Эффективна при акне, проникает в поры.', ewg: 3, tags: ['BHA', 'Кислота', 'Активный'], concerns: ['Раздражение', 'Сухость', 'Не применять при аспириновой аллергии'], comedogenic: 0 },
  { id: '16', inci: 'PARFUM', name: 'Отдушка / Парфюм', functions: ['Ароматизатор'], safety: 'caution', safetyScore: 4, description: 'Собирательное название для смеси ароматических химикатов. Состав не раскрывается — частая причина аллергии.', ewg: 8, tags: ['Аромат', 'Аллерген'], concerns: ['Скрытый состав', 'Контактный дерматит', 'Аллергия'], comedogenic: 0 },
  { id: '17', inci: 'ALCOHOL DENAT', name: 'Денатурированный спирт', functions: ['Растворитель', 'Антисептик'], safety: 'caution', safetyScore: 5, description: 'Этиловый спирт, денатурированный для предотвращения употребления внутрь. Обезжиривает и раздражает при регулярном использовании.', ewg: 5, tags: ['Спирт', 'Растворитель'], concerns: ['Нарушение кожного барьера', 'Раздражение'], comedogenic: 0 },
  { id: '18', inci: 'HYALURONIC ACID', name: 'Гиалуроновая кислота', functions: ['Увлажнитель', 'Наполнитель'], safety: 'safe', safetyScore: 10, description: 'Мощный гигроскопичный полисахарид. Удерживает воду в 1000 раз больше собственного веса.', ewg: 1, tags: ['Увлажнение', 'Активный', 'Биосовместимый'], comedogenic: 0 },
  { id: '19', inci: 'POLYETHYLENE', name: 'Полиэтилен', functions: ['Загуститель', 'Эксфолиант'], safety: 'caution', safetyScore: 5, description: 'Синтетический пластиковый полимер. Используется как загуститель или (в микрогранулах) — как скраб. Микрогранулы запрещены во многих странах.', ewg: 3, tags: ['Пластик', 'Синтетический'], concerns: ['Загрязнение микропластиком', 'Не биоразлагаем'], comedogenic: 0 },
  { id: '20', inci: 'BUTYLATED HYDROXYTOLUENE', name: 'BHT (Бутилгидрокситолуол)', functions: ['Антиоксидант', 'Консервант'], safety: 'caution', safetyScore: 5, description: 'Синтетический антиоксидант для продления срока годности формул. Спорные данные о безопасности.', ewg: 4, tags: ['Антиоксидант', 'Синтетический'], concerns: ['Возможный эндокринный дизраптор', 'Раздражение кожи'], comedogenic: 0 },
  { id: '21', inci: 'OCTOCRYLENE', name: 'Октокрилен', functions: ['УФ-фильтр'], safety: 'caution', safetyScore: 5, description: 'Химический УФ-B фильтр. Фотостабилизирует авобензон. Данные о биоаккумуляции вызывают обеспокоенность.', ewg: 3, tags: ['Химический санскрин', 'УФ-защита'], concerns: ['Биоаккумуляция', 'Возможный аллерген'], comedogenic: 0 },
  { id: '22', inci: 'AVOBENZONE', name: 'Авобензон', functions: ['УФ-фильтр'], safety: 'caution', safetyScore: 6, description: 'Химический УФ-А фильтр широкого спектра. Нестабилен на свету — требует фотостабилизаторов.', ewg: 2, tags: ['Химический санскрин', 'УФ-защита'], concerns: ['Фотодеградация без стабилизаторов'], comedogenic: 0 },
  { id: '23', inci: 'OXYBENZONE', name: 'Оксибензон', functions: ['УФ-фильтр'], safety: 'danger', safetyScore: 2, description: 'Химический УФ-фильтр с наибольшим количеством вопросов к безопасности. Запрещён на некоторых курортах из-за вреда коралловым рифам.', ewg: 8, tags: ['Химический санскрин'], concerns: ['Эндокринный дизраптор', 'Аллергия', 'Экологический вред', 'Проникновение в кровоток'], comedogenic: 0 },
  { id: '24', inci: 'CARMINE', name: 'Кармин', functions: ['Пигмент'], safety: 'caution', safetyScore: 7, description: 'Натуральный красный пигмент из кошенильных насекомых. Не подходит для веганов и людей с аллергией.', ewg: 2, tags: ['Пигмент', 'Натуральный', 'Животного происхождения'], concerns: ['Аллергические реакции', 'Не веган'], comedogenic: 0 },
  { id: '25', inci: 'SODIUM LAURYL SULFATE', name: 'Лаурилсульфат натрия (SLS)', functions: ['ПАВ', 'Пенообразователь'], safety: 'danger', safetyScore: 3, description: 'Агрессивный сульфатный ПАВ. Нарушает кожный барьер, вызывает раздражение и сухость при регулярном использовании.', ewg: 3, tags: ['Сульфат', 'ПАВ', 'Очищающий'], concerns: ['Нарушение барьерной функции', 'Раздражение', 'Обезвоживание'], comedogenic: 0 },
  { id: '26', inci: 'CETYL ALCOHOL', name: 'Цетиловый спирт', functions: ['Эмолент', 'Загуститель'], safety: 'safe', safetyScore: 9, description: 'Жирный спирт — не раздражает кожу, несмотря на название. Смягчает и стабилизирует эмульсии.', ewg: 1, tags: ['Эмолент', 'Жирный спирт'], comedogenic: 2 },
  { id: '27', inci: 'TOCOPHEROL', name: 'Токоферол (Витамин E)', functions: ['Антиоксидант', 'Эмолент'], safety: 'safe', safetyScore: 9, description: 'Мощный жирорастворимый антиоксидант. Защищает от окислительного стресса, смягчает кожу.', ewg: 2, tags: ['Витамин E', 'Антиоксидант', 'Натуральный'], comedogenic: 2 },
  { id: '28', inci: 'ASCORBIC ACID', name: 'Аскорбиновая кислота (Витамин C)', functions: ['Антиоксидант', 'Осветлитель'], safety: 'safe', safetyScore: 9, description: 'L-форма витамина С — наиболее активная и изученная. Стимулирует синтез коллагена, осветляет пятна.', ewg: 1, tags: ['Витамин C', 'Активный', 'Антиоксидант'], comedogenic: 0 },
  { id: '29', inci: 'TITANIUM DIOXIDE CI 77891', name: 'Диоксид титана CI 77891', functions: ['Пигмент', 'УФ-фильтр'], safety: 'safe', safetyScore: 9, description: 'Белый пигмент код CI 77891. Идентичен titanium dioxide, но с цветовым кодом для декоративной косметики.', ewg: 1, tags: ['Пигмент', 'Минеральный', 'УФ-защита'], comedogenic: 0 },
  { id: '30', inci: 'RED 40', name: 'Красный 40 (Аллюра красный)', functions: ['Пигмент'], safety: 'caution', safetyScore: 5, description: 'Синтетический азокраситель. Один из наиболее исследованных искусственных красителей, некоторые страны ограничивают применение.', ewg: 5, tags: ['Синтетический краситель', 'Азокраситель'], concerns: ['Возможная аллергия', 'Ограничения в ряде стран'], comedogenic: 0 },
];

export function parseIngredients(rawText: string): string[] {
  return rawText
    .split(/[,\n;]+/)
    .map(s => s.trim().toUpperCase())
    .filter(s => s.length > 0);
}

export function analyzeIngredients(rawText: string): { found: Ingredient[], unknown: string[] } {
  const parsed = parseIngredients(rawText);
  const found: Ingredient[] = [];
  const unknown: string[] = [];

  parsed.forEach(inci => {
    const match = INGREDIENTS_DB.find(
      ing => ing.inci.toUpperCase() === inci || inci.includes(ing.inci.toUpperCase())
    );
    if (match) {
      if (!found.find(f => f.id === match.id)) found.push(match);
    } else {
      unknown.push(inci);
    }
  });

  return { found, unknown };
}

export function getOverallScore(ingredients: Ingredient[]): number {
  if (ingredients.length === 0) return 0;
  return Math.round(ingredients.reduce((sum, i) => sum + i.safetyScore, 0) / ingredients.length);
}

import { motion, AnimatePresence, useInView } from 'motion/react';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { S } from './Logo';
import { assetUrl } from './ui/utils';

/** Превью слайдера: файлы в `public/images/portfolio/` — имя = id проекта, напр. `1.jpg`. */
function projectImage(id: number): string {
  return assetUrl(`images/portfolio/${id}.jpg`);
}

const SLIDE_FALLBACK: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  2: 'https://images.unsplash.com/photo-1580281658628-2a1f8e2b1c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  3: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  4: 'https://images.unsplash.com/photo-1582407947304-5c2f1f6f3b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  5: 'https://images.unsplash.com/photo-1580281798624-3e0a7f3a2b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  6: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  7: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
};

function portfolioSlideOnError(
  e: React.SyntheticEvent<HTMLImageElement>,
  projectId: number,
) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  const url = SLIDE_FALLBACK[projectId];
  if (url) img.src = url;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_COLORS: Record<string, string> = {
  Tilda: '#5B73FF',
  WordPress: '#21A0DB',
  WooCommerce: '#7F54B3',
  React: '#61DAFB',
  'Next.js': '#C4C9CF',
  TypeScript: '#3178C6',
  'Tailwind CSS': '#38BDF8',
  Figma: '#F24E1E',
  PHP: '#8892BF',
  MySQL: '#4479A1',
  Supabase: '#3ECF8E',
  Stripe: '#635BFF',
  'Node.js': '#539E43',
  'REST API': '#6C757D',
  Django: '#44B78B',
};

const PLATFORM_COLORS: Record<string, string> = {
  Tilda: '#5B73FF',
  WordPress: '#21A0DB',
  React: '#61DAFB',
  'Next.js': '#C4C9CF',
  Django: '#44B78B',
};

interface Project {
  id: number;
  title: string;
  client: string;
  platform: string;
  year: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  url?: string;
  results: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Мебельный центр Red Square',
    client: 'Red Square',
    platform: 'WordPress',
    year: '2025',
    image: projectImage(1),
    shortDesc: 'Каталог мебели и салонов брендов в одном месте',
    fullDesc:
      'Сделал сайт для мебельного центра в Краснодаре: витрина категорий (кровати, кухни/столовые, детская, шкафы/хранение), структурированный каталог и страницы салонов партнерских брендов. Реализованы удобные переходы в каталог, понятные блоки витрины и контактные сценарии для заявок.',
    tags: ['WordPress', 'Figma'],
    url: 'https://redsquare-mebel.ru/',
    results: [
      { label: 'Категории витрины', value: '4+' },
      { label: 'Салонные страницы', value: 'Бренды' },
      { label: 'Сценарии заявок', value: 'Контакты' },
    ],
  },
  {
    id: 2,
    title: 'Клиника эстетической медицины БьютиМед',
    client: 'БьютиМед',
    platform: 'WordPress',
    year: '2025',
    image: projectImage(2),
    shortDesc: 'Запись на процедуры, услуги и диагностика',
    fullDesc:
      'Подготовил структуру и контент для сайта клиники в Перми: блоки услуг (аппаратная/инъекционная косметология, лазерные процедуры, трихология, УЗИ-диагностика), информация о лицензиях и команде, сценарии записи на прием и контакты. Сделали акцент на доверии и понятной навигации по направлениям.',
    tags: ['WordPress', 'Figma'],
    url: 'https://b-med59.ru/',
    results: [
      { label: 'Аппаратов в клинике', value: '30+' },
      { label: 'Пациентов', value: '20 000+' },
      { label: 'Фокус', value: 'Запись/диагностика' },
    ],
  },
  {
    id: 3,
    title: 'Ювелирная мастерская в Перми',
    client: 'Jewel Perm',
    platform: 'WordPress',
    year: '2025',
    image: projectImage(3),
    shortDesc: 'Изготовление, ремонт и реставрация украшений',
    fullDesc:
      'Добавил проекты/разделы под ювелирную мастерскую: изготовление по эскизам, ремонт, реставрация, оценка, гравировка, чистка и полировка. Структура поддерживает понятный путь от услуг к заявке, а также показывает истории работ, кейсы и отзывы — чтобы посетитель быстро доверял качеству и срокам.',
    tags: ['WordPress', 'Figma'],
    url: 'https://jewel-perm.ru/',
    results: [
      { label: 'Стаж мастеров', value: '25 лет' },
      { label: 'Восстановлено', value: '1000+' },
      { label: 'Полный цикл', value: '3D->изделие' },
    ],
  },
  {
    id: 4,
    title: 'North Star Appliance Repair',
    client: 'North Star',
    platform: 'WordPress',
    year: '2025',
    image: projectImage(4),
    shortDesc: 'Ремонт бытовой техники с понятным прайсом',
    fullDesc:
      'Собрал лендинг для сервиса ремонта техники в Woodbridge: список услуг по категориям (холодильники, микроволновки, стиральные/сушильные машины, духовки и т.д.), онлайн-бронирование, блок с прозрачной стоимостью service call ($49) и условиями отмены/освобождения оплаты при заказе ремонта. Добавлены секции отзывов, FAQ и гарантийные условия на установленные детали.',
    tags: ['WordPress', 'Figma'],
    url: 'https://nsappliancerepair.ca/',
    results: [
      { label: 'Сервисный сертификат', value: '$49' },
      { label: 'В тот же день', value: 'В Woodbridge' },
      { label: 'Гарантия', value: '1 год' },
    ],
  },
  {
    id: 5,
    title: 'ООО НДА — медицинская компания',
    client: 'НДА',
    platform: 'Django',
    year: '2025',
    image: projectImage(5),
    shortDesc: 'Каталог оборудования, сертификаты и контакты',
    fullDesc:
      'Сайт под медицину и оснащение: каталог брендов и категорий, поиск/навигация по разделам, страницы с RU и сертификатами, а также блоки контактов и режима работы. Сделали подаче информации акцент на доступности каталога и доверии (официальные документы/сведения о компании).',
    tags: ['Django', 'Figma'],
    url: 'https://nda.ru/',
    results: [
      { label: 'Каталог брендов', value: 'Много' },
      { label: 'Разделы доверия', value: 'Сертификаты' },
      { label: 'Навигация', value: 'Поиск/категории' },
    ],
  },
  {
    id: 6,
    title: 'AGA Ranges — английские кухни и печи',
    client: 'AGA Russia',
    platform: 'Tilda',
    year: '2025',
    image: projectImage(6),
    shortDesc: 'Шоурум, модели AGA и запись на тест-драйв',
    fullDesc:
      'Сделал секции под продукт: модели и конфигурации AGA (R3/R7 и комбинированные решения), описание преимуществ (инфракрасный гриль, вентиляционная дополнительная печь, гибкость приготовления) и сценарии обращения. Отдельно оформлены блоки про шоурум, доставку по РФ/СНГ/Европе, а также формы для записи и консультации.',
    tags: ['Tilda', 'Figma'],
    url: 'https://aga-russia.ru',
    results: [
      { label: 'Модели', value: '2-7 духовок' },
      { label: 'Шоурум', value: 'Уральская 13' },
      { label: 'Форма', value: 'Запись/консультация' },
    ],
  },
  {
    id: 7,
    title: 'Manoro Mobili — люксовые кухни',
    client: 'Manoro Mobili',
    platform: 'Tilda',
    year: '2025',
    image: projectImage(7),
    shortDesc: 'Подбор кухни, галерея проектов и премиальные материалы',
    fullDesc:
      'Добавил проектную секцию под премиальную кухню: подбор с заполнением формы (подготовка 3 вариантов), галерея работ и карточки направлений. Описали команду, производство (площадь и сроки), ключевые материалы/фурнитуру и сценарии заявок (контакты, консультация, отправка данных). Дизайн поддерживает современную визуальную подачу и вовлекающие блоки.',
    tags: ['Tilda', 'Figma'],
    url: 'https://manoro-mobili.ru/',
    results: [
      { label: 'Вариантов', value: '3' },
      { label: 'Сроки', value: '35 дней' },
      { label: 'Производство', value: '5000 м2' },
    ],
  },
];

// ─── Modal ─────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const col = PLATFORM_COLORS[project.platform] || S.mid;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />

      {/* Dialog */}
      <motion.div
        className="relative w-full max-w-5xl rounded-3xl overflow-auto"
        style={{
          background: '#0f0f0f',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          maxHeight: '90vh',
        }}
        initial={{ opacity: 0, scale: 0.9, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          onClick={onClose}
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid md:grid-cols-5">
          {/* Image — 3/5 */}
          <div className="md:col-span-3 relative" style={{ minHeight: 300 }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ minHeight: 300 }}
              loading="lazy"
              decoding="async"
              onError={(e) => portfolioSlideOnError(e, project.id)}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, #0f0f0f 100%), linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
              }}
            />
            {/* Platform badge */}
            <div className="absolute top-5 left-5">
              <span
                className="px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: 'rgba(0,0,0,0.78)',
                  border: `1px solid ${col}`,
                  color: '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 2px 14px rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {project.platform}
              </span>
            </div>
          </div>

          {/* Content — 2/5 */}
          <div className="md:col-span-2 p-8 flex flex-col">
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs" style={{ color: '#555' }}>{project.client}</span>
                <span style={{ color: '#333' }}>·</span>
                <span className="text-xs" style={{ color: '#555' }}>{project.year}</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {project.title}
              </h2>
            </div>

            <p className="text-sm mb-6" style={{ color: '#909090', lineHeight: 1.8 }}>
              {project.fullDesc}
            </p>

            {/* Results */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      lineHeight: 1,
                      background: S.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {r.value}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.3 }}>
                    {r.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {project.tags.map((tag) => {
                const tc = TECH_COLORS[tag] || S.mid;
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(0,0,0,0.55)',
                      border: `1px solid ${tc}`,
                      color: '#f2f2f2',
                      fontWeight: 600,
                      boxShadow: '0 1px 6px rgba(0,0,0,0.35)',
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm"
              style={{
                background: `linear-gradient(135deg, ${S.bright}, ${S.mid})`,
                color: '#0a0a0a',
                fontWeight: 700,
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Посетить сайт
              <ExternalLink className="w-4 h-4" />
            </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          right: '-15%',
          top: '0%',
          background: 'radial-gradient(circle, rgba(196,201,207,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Реальные проекты,
                <br />
                <span
                  style={{
                    background: S.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  реальные результаты.
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Counter */}
              <span className="text-sm" style={{ color: '#505050' }}>
                <span style={{ color: S.mid, fontWeight: 700 }}>
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                {' / '}
                {String(projects.length).padStart(2, '0')}
              </span>

              {/* Nav arrows */}
              <div className="flex gap-2">
                <motion.button
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: canPrev ? 'rgba(196,201,207,0.1)' : 'rgba(255,255,255,0.03)',
                    border: canPrev ? '1px solid rgba(196,201,207,0.25)' : '1px solid rgba(255,255,255,0.06)',
                    color: canPrev ? S.mid : '#333',
                  }}
                  whileHover={canPrev ? { scale: 1.08 } : {}}
                  whileTap={canPrev ? { scale: 0.92 } : {}}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={scrollNext}
                  disabled={!canNext}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: canNext
                      ? `linear-gradient(135deg, ${S.bright}, ${S.mid})`
                      : 'rgba(255,255,255,0.03)',
                    border: canNext ? 'none' : '1px solid rgba(255,255,255,0.06)',
                    color: canNext ? '#0a0a0a' : '#333',
                    boxShadow: canNext ? '0 0 20px rgba(196,201,207,0.2)' : 'none',
                  }}
                  whileHover={canNext ? { scale: 1.08 } : {}}
                  whileTap={canNext ? { scale: 0.92 } : {}}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div
            className="overflow-hidden relative pl-6 md:pl-12 lg:pl-24 select-none"
            ref={emblaRef}
          >
            <div className="flex gap-5">
              {projects.map((project, i) => {
                const col = PLATFORM_COLORS[project.platform] || S.mid;
                const isActive = i === currentIndex;
                return (
                  <div
                    key={project.id}
                    style={{
                      flex: '0 0 clamp(300px, 62vw, 700px)',
                      minWidth: 0,
                    }}
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-3xl select-none"
                      style={{
                        aspectRatio: '16/10',
                        cursor: 'pointer',
                        border: isActive
                          ? `1px solid ${col}35`
                          : '1px solid rgba(255,255,255,0.06)',
                        transition: 'border-color 0.4s',
                      }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          filter: isActive ? 'brightness(0.9)' : 'brightness(0.55) saturate(0.7)',
                          transition: 'filter 0.5s ease',
                        }}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(e) => portfolioSlideOnError(e, project.id)}
                      />

                      {/* Gradient — сильнее затемнение снизу под текст */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.08) 100%)',
                        }}
                      />

                      {/* Active top accent */}
                      {isActive && (
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, transparent, ${col}, transparent)` }}
                        />
                      )}

                      {/* Platform badge */}
                      <div className="absolute top-6 left-6 hidden md:block">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(0,0,0,0.78)',
                            border: `1px solid ${col}`,
                            color: '#ffffff',
                            fontWeight: 700,
                            boxShadow: '0 2px 14px rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          {project.platform}
                        </span>
                      </div>

                      {/* Year top right */}
                      <div className="absolute top-6 right-6 hidden md:block">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-7">
                        {/* Results row — desktop only */}
                        <div className="hidden md:flex gap-5 mb-5">
                          {project.results.map((r) => (
                            <div key={r.label}>
                              <div
                                style={{
                                  fontWeight: 800,
                                  fontSize: '1.15rem',
                                  color: '#ffffff',
                                  lineHeight: 1,
                                  textShadow:
                                    '0 1px 2px rgba(0,0,0,0.95), 0 0 18px rgba(0,0,0,0.75)',
                                  borderBottom: isActive ? `2px solid ${col}` : '2px solid transparent',
                                  paddingBottom: 2,
                                  transition: 'border-color 0.4s',
                                }}
                              >
                                {r.value}
                              </div>
                              <div
                                className="text-xs mt-0.5"
                                style={{
                                  color: isActive ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.62)',
                                  textShadow: '0 1px 2px rgba(0,0,0,0.85)',
                                  transition: 'color 0.4s',
                                }}
                              >
                                {r.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <p className="hidden md:block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 2px rgba(0,0,0,0.75)' }}>
                              {project.client}
                            </p>
                            <h3
                              style={{
                                fontWeight: 800,
                                fontSize: 'clamp(1rem, 4vw, 1.65rem)',
                                color: '#ffffff',
                                lineHeight: 1.2,
                                margin: 0,
                              }}
                            >
                              {project.title}
                            </h3>
                            <p className="hidden md:block mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
                              {project.shortDesc}
                            </p>
                          </div>

                          {/* Open button — desktop only */}
                          <motion.div
                            className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full items-center justify-center"
                            style={{
                              background: isActive
                                ? `linear-gradient(145deg, ${col}, ${col}dd)`
                                : 'rgba(0,0,0,0.55)',
                              border: isActive
                                ? '1px solid rgba(255,255,255,0.35)'
                                : '1px solid rgba(255,255,255,0.18)',
                              color: '#ffffff',
                              boxShadow: isActive
                                ? `0 4px 18px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25)`
                                : '0 2px 10px rgba(0,0,0,0.35)',
                              transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ArrowRight className="w-5 h-5" strokeWidth={2.25} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
              {/* Trailing space */}
              <div style={{ flex: '0 0 24px' }} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6 md:px-12 lg:px-24 mt-7 container mx-auto">
            <div
              className="relative h-px w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: S.gradient }}
                animate={{
                  width: `${((currentIndex + 1) / projects.length) * 100}%`,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState } from 'react';

type Platform = {
  id: string;
  name: string;
  logo: string;
  description: string;
  free: boolean;
  pros: string[];
  cons: string[];
  steps: string[];
  url: string;
  rating: number;
  bestFor: string;
};

const platforms: Platform[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    logo: '▲',
    description: 'Лучший выбор для React/Next.js проектов. Автоматический деплой из Git, мгновенные превью, глобальный CDN.',
    free: true,
    pros: [
      'Бесплатный тариф для личных проектов',
      'Автоматический деплой при push в Git',
      'Preview Deployments для каждого PR',
      'Глобальный Edge Network (CDN)',
      'Отличная интеграция с Next.js и React',
      'Автоматический HTTPS',
      'Serverless Functions',
    ],
    cons: [
      'Ограничения на коммерческое использование в free tier',
      'Лимит 100 ГБ bandwidth/мес на бесплатном плане',
    ],
    steps: [
      'Зарегистрируйтесь на vercel.com через GitHub',
      'Импортируйте репозиторий с проектом',
      'Vercel автоматически определит фреймворк (Vite)',
      'Build command: npm run build',
      'Output directory: dist',
      'Нажмите "Deploy" — сайт готов!',
    ],
    url: 'https://vercel.com',
    rating: 5,
    bestFor: 'React, Next.js, Vite проекты',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    logo: '◆',
    description: 'Мощная платформа для статических сайтов и JAMstack. Простой деплой, формы, функции, split testing.',
    free: true,
    pros: [
      'Бесплатный тариф с 100 ГБ bandwidth',
      'Drag & drop деплой (без Git)',
      'Встроенные формы и функции',
      'Split testing и role-based access',
      'Автоматический HTTPS и CDN',
      'Deploy Previews для PR',
      'Плагины и расширения',
    ],
    cons: [
      'Build time лимит 300 мин/мес на free',
      'Медленнее чем Vercel для некоторых регионов',
    ],
    steps: [
      'Зарегистрируйтесь на netlify.com',
      'Подключите GitHub/GitLab репозиторий',
      'Или перетащите папку dist в браузер (drag & drop)',
      'Build command: npm run build',
      'Publish directory: dist',
      'Нажмите "Deploy" — сайт онлайн!',
    ],
    url: 'https://netlify.com',
    rating: 5,
    bestFor: 'Статические сайты, JAMstack',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Pages',
    logo: '☁',
    description: 'Самый быстрый CDN в мире. Неограниченный bandwidth, отличная производительность, интеграция с Workers.',
    free: true,
    pros: [
      'БЕЗЛИМИТНЫЙ bandwidth на бесплатном плане!',
      'Самая быстрая CDN в мире',
      'Неограниченные запросы',
      'Cloudflare Workers для serverless',
      'Автоматический HTTPS',
      'До 500 деплоев/мес',
      'Превосходная защита от DDoS',
    ],
    cons: [
      'Меньше интеграций чем Vercel/Netlify',
      'Менее удобный UI',
    ],
    steps: [
      'Зарегистрируйтесь на pages.cloudflare.com',
      'Подключите GitHub/GitLab аккаунт',
      'Выберите репозиторий',
      'Framework preset: Vite',
      'Build command: npm run build',
      'Output directory: dist',
      'Нажмите "Save and Deploy"',
    ],
    url: 'https://pages.cloudflare.com',
    rating: 5,
    bestFor: 'Высоконагруженные сайты, глобальная аудитория',
  },
  {
    id: 'github',
    name: 'GitHub Pages',
    logo: '🐙',
    description: 'Бесплатный хостинг прямо из GitHub. Идеально для документации, портфолио и простых сайтов.',
    free: true,
    pros: [
      'Полностью бесплатно',
      'Интеграция с GitHub из коробки',
      'Автоматический деплой через Actions',
      'Поддержка кастомных доменов',
      'HTTPS автоматически',
      'Не нужно регистрироваться на сторонних сервисах',
    ],
    cons: [
      'Только статические сайты',
      'Нет preview deployments',
      'Ограничения на размер (1 ГБ)',
      'Медленнее CDN чем у конкурентов',
      'Публичные репозитории (для free)',
    ],
    steps: [
      'Создайте репозиторий на GitHub',
      'Запушьте код проекта',
      'Создайте файл .github/workflows/deploy.yml',
      'Добавьте workflow для сборки и деплоя',
      'В Settings → Pages выберите branch: gh-pages',
      'Сайт доступен по username.github.io/repo-name',
    ],
    url: 'https://pages.github.com',
    rating: 4,
    bestFor: 'Документация, портфолио, open-source',
  },
  {
    id: 'railway',
    name: 'Railway',
    logo: '🚂',
    description: 'Современная PaaS платформа. Поддержка backend + frontend, базы данных, переменные окружения.',
    free: true,
    pros: [
      '$5 бесплатного кредита/мес',
      'Поддержка backend и frontend',
      'Встроенные базы данных (PostgreSQL, Redis)',
      'Переменные окружения',
      'Автоматический деплой из Git',
      'Простой и понятный UI',
    ],
    cons: [
      'Ограниченный free tier ($5 кредит)',
      'Меньше функций для статики чем Vercel',
    ],
    steps: [
      'Зарегистрируйтесь на railway.app',
      'Создайте новый проект',
      'Подключите GitHub репозиторий',
      'Добавьте сервис для frontend',
      'Настройте build и start commands',
      'Добавьте переменные окружения при необходимости',
    ],
    url: 'https://railway.app',
    rating: 4,
    bestFor: 'Full-stack приложения с backend',
  },
  {
    id: 'render',
    name: 'Render',
    logo: '🔷',
    description: 'Универсальная cloud платформа. Статические сайты, web services, cron jobs, приватные сети.',
    free: true,
    pros: [
      'Бесплатный хостинг статики',
      'Поддержка Docker',
      'Автоматический HTTPS и CDN',
      'Cron Jobs на бесплатном плане',
      'Приватные сети (VPC)',
      'Автоматический деплой из Git',
    ],
    cons: [
      'Web services засыпают через 15 мин (free)',
      'Медленный cold start',
    ],
    steps: [
      'Зарегистрируйтесь на render.com',
      'Нажмите "New Static Site"',
      'Подключите GitHub/GitLab',
      'Build command: npm run build',
      'Publish directory: dist',
      'Нажмите "Create Static Site"',
    ],
    url: 'https://render.com',
    rating: 4,
    bestFor: 'Full-stack приложения, Docker',
  },
];

const comparisonData = [
  { feature: 'Бесплатный тариф', vercel: '✅', netlify: '✅', cloudflare: '✅', github: '✅', railway: '$5/мес', render: '✅' },
  { feature: 'Bandwidth', vercel: '100 ГБ', netlify: '100 ГБ', cloudflare: '∞ Безлимит', github: '100 ГБ', railway: '100 ГБ', render: '100 ГБ' },
  { feature: 'Автодеплой из Git', vercel: '✅', netlify: '✅', cloudflare: '✅', github: '✅', railway: '✅', render: '✅' },
  { feature: 'Preview Deployments', vercel: '✅', netlify: '✅', cloudflare: '✅', github: '❌', railway: '✅', render: '✅' },
  { feature: 'Custom Domain', vercel: '✅', netlify: '✅', cloudflare: '✅', github: '✅', railway: '✅', render: '✅' },
  { feature: 'HTTPS', vercel: '✅', netlify: '✅', cloudflare: '✅', github: '✅', railway: '✅', render: '✅' },
  { feature: 'Serverless Functions', vercel: '✅', netlify: '✅', cloudflare: '✅ (Workers)', github: '❌', railway: '✅', render: '✅' },
  { feature: 'Скорость CDN', vercel: '⚡⚡⚡', netlify: '⚡⚡', cloudflare: '⚡⚡⚡⚡', github: '⚡', railway: '⚡⚡', render: '⚡⚡' },
];

function App() {
  const [activeTab, setActiveTab] = useState<string>('vercel');
  const [showComparison, setShowComparison] = useState(false);

  const activePlatform = platforms.find(p => p.id === activeTab)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Актуально на 2026 год
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Куда разместить свой сайт?
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Полное руководство по лучшим платформам для хостинга React/Vite/Tailwind сайтов.
            Сравнение, пошаговые инструкции и рекомендации.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowComparison(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${!showComparison ? 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-white/10 hover:bg-white/20'}`}
            >
              🏆 Топ платформы
            </button>
            <button
              onClick={() => setShowComparison(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${showComparison ? 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-white/10 hover:bg-white/20'}`}
            >
              📊 Сравнение
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {!showComparison ? (
          <>
            {/* Quick Recommendation */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span> Быстрая рекомендация
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-emerald-400 mb-1">Для React/Vite</div>
                    <div className="font-bold text-lg">Vercel</div>
                    <div className="text-sm text-gray-400">Лучшая DX и скорость</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-blue-400 mb-1">Безлимитный трафик</div>
                    <div className="font-bold text-lg">Cloudflare Pages</div>
                    <div className="text-sm text-gray-400">Самый быстрый CDN</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-purple-400 mb-1">Full-stack</div>
                    <div className="font-bold text-lg">Railway / Render</div>
                    <div className="text-sm text-gray-400">Backend + Frontend</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform Tabs */}
            <section className="mb-8">
              <div className="flex flex-wrap gap-2 mb-8">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTab === p.id
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span className="mr-1">{p.logo}</span> {p.name}
                    {p.free && <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Free</span>}
                  </button>
                ))}
              </div>

              {/* Active Platform Details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="text-5xl">{activePlatform.logo}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{activePlatform.name}</h3>
                      <p className="text-gray-400">{activePlatform.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-yellow-400">
                          {'★'.repeat(activePlatform.rating)}{'☆'.repeat(5 - activePlatform.rating)}
                        </span>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-sm text-blue-400">🎯 {activePlatform.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Преимущества</h4>
                      <ul className="space-y-2">
                        {activePlatform.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <span className="text-green-400 mt-1 text-xs">●</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-3">⚠️ Недостатки</h4>
                      <ul className="space-y-2">
                        {activePlatform.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 mt-1 text-xs">●</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="border-t border-white/10 bg-white/5 p-6 sm:p-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span>📋</span> Пошаговая инструкция
                  </h4>
                  <ol className="space-y-3">
                    {activePlatform.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-purple-500/30 border border-purple-500/50 rounded-full flex items-center justify-center text-sm font-bold text-purple-300">
                          {i + 1}
                        </span>
                        <span className="text-gray-300 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={activePlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
                  >
                    Перейти на {activePlatform.name} →
                  </a>
                </div>
              </div>
            </section>

            {/* Vite Deploy Config */}
            <section className="mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span> Настройка Vite для деплоя
                </h2>
                <p className="text-gray-400 mb-6">
                  Перед деплоем убедитесь, что ваш проект правильно настроен:
                </p>
                <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm overflow-x-auto border border-white/10">
                  <div className="text-gray-500 mb-2">// vite.config.ts</div>
                  <div className="text-purple-300">export default defineConfig({'{'}</div>
                  <div className="pl-4">
                    <span className="text-blue-300">plugins</span>: [<span className="text-green-300">react()</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-300">base</span>: <span className="text-yellow-300">'/'</span>, <span className="text-gray-500">// или '/repo-name/' для GitHub Pages</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-300">build</span>: {'{'}</div>
                  <div className="pl-8">
                    <span className="text-blue-300">outDir</span>: <span className="text-yellow-300">'dist'</span>,
                  </div>
                  <div className="pl-4">{'}'}</div>
                  <div>{'}'})</div>
                </div>
                <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-300 text-sm">
                    💡 <strong>Важно:</strong> Для GitHub Pages измените <code className="bg-white/10 px-1 rounded">base</code> на имя репозитория: <code className="bg-white/10 px-1 rounded">'/my-repo/'</code>
                  </p>
                </div>
              </div>
            </section>

            {/* GitHub Actions Example */}
            <section className="mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span> GitHub Actions (автодеплой)
                </h2>
                <p className="text-gray-400 mb-6">
                  Добавьте этот файл для автоматического деплоя на GitHub Pages:
                </p>
                <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-xs sm:text-sm overflow-x-auto border border-white/10">
                  <div className="text-gray-500"># .github/workflows/deploy.yml</div>
                  <div className="text-purple-300">name: Deploy to GitHub Pages</div>
                  <div className="text-gray-300 mt-2">on:</div>
                  <div className="pl-4 text-gray-300">push:</div>
                  <div className="pl-8 text-gray-300">branches: [main]</div>
                  <div className="text-gray-300 mt-2">jobs:</div>
                  <div className="pl-4 text-gray-300">deploy:</div>
                  <div className="pl-8 text-gray-300">runs-on: ubuntu-latest</div>
                  <div className="pl-8 text-gray-300">steps:</div>
                  <div className="pl-12 text-gray-300">- uses: actions/checkout@v4</div>
                  <div className="pl-12 text-gray-300">- uses: actions/setup-node@v4</div>
                  <div className="pl-16 text-gray-300">with: {'{'} node-version: 20 {'}'}</div>
                  <div className="pl-12 text-gray-300">- run: npm ci</div>
                  <div className="pl-12 text-gray-300">- run: npm run build</div>
                  <div className="pl-12 text-gray-300">- uses: peaceiris/actions-gh-pages@v4</div>
                  <div className="pl-16 text-gray-300">with: {'{'}</div>
                  <div className="pl-20 text-gray-300">github_token: {'${{ secrets.GITHUB_TOKEN }}'}</div>
                  <div className="pl-20 text-gray-300">publish_dir: ./dist</div>
                  <div className="pl-16 text-gray-300">{'}'}</div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Comparison Table */
          <section>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">📊 Детальное сравнение платформ</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-4 font-semibold text-gray-300">Функция</th>
                      <th className="p-4 font-semibold text-purple-300">▲ Vercel</th>
                      <th className="p-4 font-semibold text-teal-300">◆ Netlify</th>
                      <th className="p-4 font-semibold text-orange-300">☁ Cloudflare</th>
                      <th className="p-4 font-semibold text-gray-300">🐙 GitHub</th>
                      <th className="p-4 font-semibold text-blue-300">🚂 Railway</th>
                      <th className="p-4 font-semibold text-cyan-300">🔷 Render</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                        <td className="p-4 font-medium text-gray-300">{row.feature}</td>
                        <td className="p-4 text-center text-gray-300">{row.vercel}</td>
                        <td className="p-4 text-center text-gray-300">{row.netlify}</td>
                        <td className="p-4 text-center text-gray-300">{row.cloudflare}</td>
                        <td className="p-4 text-center text-gray-300">{row.github}</td>
                        <td className="p-4 text-center text-gray-300">{row.railway}</td>
                        <td className="p-4 text-center text-gray-300">{row.render}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Final Verdict */}
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4">🏆 Итоговая рекомендация</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <strong className="text-white">Vercel</strong> — лучший выбор для большинства React/Vite проектов. 
                    Идеальная интеграция, preview deployments, отличный DX.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <strong className="text-white">Cloudflare Pages</strong> — если нужен безлимитный трафик и максимальная скорость. 
                    Лучший CDN в мире.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <strong className="text-white">Netlify</strong> — отличный выбор если нужны встроенные формы, 
                    функции и простой drag & drop деплой.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">4️⃣</span>
                  <div>
                    <strong className="text-white">Railway / Render</strong> — если нужен backend + frontend в одном месте 
                    (API, база данных, cron jobs).
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Custom Domain Section */}
        <section className="mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🌐</span> Свой домен
            </h2>
            <p className="text-gray-400 mb-6">
              Все платформы поддерживают подключение собственного домена. Вот как это сделать:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">1. Купите домен</h4>
                <p className="text-sm text-gray-400">
                  Namecheap, Cloudflare Registrar, GoDaddy, или reg.ru (от ~500₽/год)
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">2. Добавьте в панели хостинга</h4>
                <p className="text-sm text-gray-400">
                  Settings → Domains → Add Custom Domain на любой платформе
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">3. Настройте DNS</h4>
                <p className="text-sm text-gray-400">
                  Добавьте CNAME запись: www → ваш-проект.platform.com
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-yellow-400 mb-2">4. SSL автоматически</h4>
                <p className="text-sm text-gray-400">
                  HTTPS сертификат выдаётся автоматически через Let's Encrypt
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>Создано с ❤️ для разработчиков • 2026</p>
        <p className="mt-2">Все платформы предоставляют бесплатный тариф для личных проектов</p>
      </footer>
    </div>
  );
}

export default App;

# NOVA Store

فروشگاه اینترنتی **NOVA Store** یک اپلیکیشن Front-End مدرن و چندزبانه است که با **Next.js (App Router)**، **TypeScript** و مجموعه‌ای از کتابخانه‌های پرکاربرد اکوسیستم React پیاده‌سازی شده است. این پروژه شامل تجربه خرید محصول، مشاهده جزئیات، جستجو/فیلتر/مرتب‌سازی/صفحه‌بندی، سبد خرید کاربردی، پشتیبانی از فارسی و انگلیسی (RTL/LTR) و تم روشن/تاریک است.

> **محدوده:** این مخزن فقط شامل **NOVA Store** است و پروژه NOVA Admin در آن پیاده‌سازی نشده است.

## امکانات پیاده‌سازی‌شده

- **چندزبانه (فارسی/انگلیسی):** مسیریابی مبتنی بر locale (`/fa`, `/en`) با پیش‌فرض فارسی، ترجمه رابط کاربری از فایل‌های Dictionary، سوئیچر زبان در Header و تنظیم `lang` و `dir` (RTL/LTR) بر اساس زبان فعال.
- **تم روشن و تاریک:** سوئیچر تم در Header، ذخیره ترجیح کاربر، اعمال تم از طریق `data-theme` و CSS Variables و هماهنگی تم در SSR/اولین رندر کلاینت.
- **صفحه اصلی (Home):**
  - **Header:** لوگوی NOVA (همراه آیکن `ShoppingCart` از **Lucide React**)، ناوبری، جستجوی محصولات، سوئیچر زبان و تم، آیکون سبد خرید با نمایش تعداد کل آیتم‌ها و منوی مناسب نمایش موبایل.
  - **Hero Section:** عنوان، شعار و توضیح کوتاه همراه دکمه CTA برای هدایت به بخش محصولات.
  - **دسته‌بندی‌ها:** دریافت و نمایش دسته‌بندی‌ها از API، انتخاب دسته‌بندی فعال و امکان مشاهده همه دسته‌ها.
  - **محصولات:** دریافت و نمایش محصولات از API در کارت‌هایی شامل تصویر، عنوان، قیمت، دسته‌بندی، امتیاز و دکمه افزودن به سبد خرید.
  - **جستجو و فیلتر:** جستجو بر اساس عنوان، فیلتر بر اساس دسته‌بندی، پاک‌سازی فیلترها، مرتب‌سازی (پیش‌فرض، قیمت صعودی/نزولی، عنوان الفبا) و **Pagination** با ۶ محصول در هر صفحه (هماهنگ با جستجو/فیلتر).
  - **Footer:** لینک‌های ناوبری، اطلاعات برند NOVA و توضیح منبع داده.
- **صفحه جزئیات محصول (`/[locale]/products/[id]`):** دریافت اطلاعات محصول از API، نمایش تصویر، عنوان، دسته‌بندی، قیمت، امتیاز/تعداد رأی، توضیحات و افزودن به سبد خرید؛ در صورت شناسه نامعتبر یا خطای دریافت، نمایش صفحه Not Found مربوطه.
- **سبد خرید (`/[locale]/cart` در UI):**
  - نمایش آیتم‌ها با تصویر، نام، قیمت واحد، تعداد و جمع ردیف.
  - افزایش/کاهش تعداد (جلوگیری از کاهش به کمتر از ۱)، حذف محصول و پاک‌سازی کل سبد.
  - نمایش خلاصه سفارش شامل تعداد کل و مجموع قیمت.
  - **Empty State** هنگام خالی بودن سبد و ماندگاری محتوای سبد پس از Refresh (ذخیره محلی).
  - هماهنگی شمارنده سبد در Header با محتوای واقعی سبد.
- **مدیریت وضعیت‌های داده:** نمایش حالت‌های Loading، Error (همراه امکان تلاش مجدد) و Empty در بخش‌های وابسته به داده.
- **SEO و استانداردهای Next.js:** تولید Metadata محلی (عنوان/توضیحات)، `metadataBase` و `alternates` زبان‌ها، فایل‌های `robots.ts` و `sitemap.ts`، صفحات Not Found (محلی/ریشه)، استفاده از `next/image` برای تصاویر محصولات (دامنه مجاز `fakestoreapi.com`) و تفکیک Server/Client Components.
- **واکنش‌گرایی (Responsive):** چیدمان Mobile-first برای نمایش مناسب در موبایل، تبلت و دسکتاپ.

> قابلیت‌هایی مانند پرداخت، ثبت سفارش، Checkout، احراز هویت کاربر یا Backend اختصاصی در این پروژه پیاده‌سازی نشده‌اند (محدودیت منبع داده).

## تکنولوژی‌ها و کتابخانه‌ها

| حوزه | تکنولوژی / کتابخانه | نسخه (طبق `package.json`) | کاربرد در پروژه |
|---|---|---:|---|
| Framework | **Next.js** (App Router) | 16.4.5 | ساختار اپلیکیشن، Routing، SSR/Rendering، Metadata، بهینه‌سازی تصویر |
| UI Library | **React** / **React DOM** | 19.3.0 | ساخت رابط کاربری |
| Language | **TypeScript** (strict) | ^5 | تایپ‌ایمنی و توسعه‌پذیری |
| i18n | **next-intl** | ^4.14.9 | مسیریابی locale، بارگذاری پیام‌ها، ترجمه و ناوبری محلی |
| Styling | **styled-components** | ^6.6.0 | استایل‌دهی کامپوننت‌ها + SSR registry |
| Styling Tokens | **CSS Variables** | — | تم‌بندی و توکن‌های رنگ/طراحی در `globals.css` |
| HTTP Client | **Axios** | ^1.21.0 | کلاینت مرکزی درخواست به API |
| Server State | **@tanstack/react-query** | ^5.107.1 | مدیریت داده سرور، Cache، وضعیت‌های دریافت و Refetch |
| Client State | **Zustand** | ^5.1.0 | مدیریت سبد خرید و Persist محلی |
| Global UI State | **React Context API** | — | مدیریت تم و Providerهای عمومی |
| Icons | **Lucide React** | ^1.70.0 | آیکون‌های رابط کاربری |
| Fonts | **next/font** (Inter, Vazirmatn) | — | بارگذاری فونت انگلیسی/فارسی سازگار با Next.js |
| Lint/Config | **ESLint**, **eslint-config-next** | ^9 / 16.4.5 | بررسی کیفیت کد |

> در `devDependencies` بسته‌های `tailwindcss` و `@tailwindcss/turbopack` نیز وجود دارند، اما استایل‌دهی UI پروژه بر پایه **styled-components** و **CSS Variables** پیاده‌سازی شده است.

## معماری پوشه‌ها و مسئولیت هر بخش

ساختار اصلی طبق قرارداد پروژه حفظ شده است:

```text
nova-store/
├─ proxy.ts                  # مسیریابی و پردازش locale با next-intl middleware (کنوانسیون Next.js 16)
├─ next.config.ts            # تنظیمات Next.js (next-intl plugin, styled-components, remotePatterns)
├─ package.json              # وابستگی‌ها و اسکریپت‌ها
├─ .env.example              # نمونه متغیرهای محیطی
└─ src/
   ├─ api/                   # تنظیمات Axios، QueryClient/Provider و ترکیب Providerها
   ├─ app/                   # App Router، Layoutها و صفحات
   │  └─ [locale]/           # مسیرهای محلی‌سازی‌شده (fa/en)
   ├─ assets/                # محل دارایی‌های اختصاصی (Fonts/Icons/Images) - در کد فعلی استفاده نشده
   ├─ components/            # کامپوننت‌های UI بر اساس حوزه (layout, home, products, cart)
   ├─ context/               # Contextها (Theme)
   ├─ dictionary/            # فایل‌های ترجمه (fa.json, en.json)
   ├─ i18n/                  # پیکربندی request و navigation برای next-intl
   ├─ modals/                # رزرو برای مودال‌ها - در کد فعلی استفاده نشده
   ├─ requests/              # توابع درخواست به API (products/categories)
   ├─ shared/                # ابزارها و کامپوننت‌های اشتراکی (Registry, UI primitives)
   ├─ storage/               # Storeهای Zustand و helperهای ذخیره‌سازی/تم
   ├─ types/                 # تایپ‌ها و اینترفیس‌ها (+ پوشه enums رزرو شده)
   ├─ utils/                 # توابع کمکی (format, query keys)
   ├─ validations/           # رزرو برای اعتبارسنجی فرم‌ها - در کد فعلی استفاده نشده
   └─ i18n.ts                # تعریف routing و localeها
```

### جزئیات مسئولیت‌ها

- **`src/api/`**
  - `axios.ts`: ایجاد `apiClient` با `baseURL` (از `NEXT_PUBLIC_API_BASE_URL` یا پیش‌فرض FakeStoreAPI)، `timeout` و interceptor خطا.
  - `QueryProvider.tsx`: ساخت و ارائه `QueryClient` برای **TanStack Query**.
  - `AppProviders.tsx`: ترکیب Providerهای کلاینت (`StyledComponentsRegistry`، `QueryProvider`، `ThemeProvider`) و rehydrate سبد خرید.
- **`src/app/`**
  - `layout.tsx`: Layout ریشه (pass-through).
  - `page.tsx`: هدایت ریشه به `/fa`.
  - `[locale]/layout.tsx`: Layout محلی؛ اعتبارسنجی locale، بارگذاری پیام‌ها، تعیین `lang/dir` و تم اولیه از Cookie، تنظیم Metadata و تزریق Providerها.
  - `[locale]/page.tsx`: صفحه خانه (Server Component) با رندر `HomePageClient`.
  - `[locale]/cart/page.tsx`: صفحه سبد خرید با Metadata محلی.
  - `[locale]/products/[id]/page.tsx`: صفحه جزئیات محصول با دریافت داده محصول و Metadata پویا.
  - `[locale]/not-found.tsx`, `not-found.tsx`: مدیریت مسیرهای نامعتبر.
  - `robots.ts`, `sitemap.ts`: خروجی SEO.
  - `globals.css`: متغیرهای تم، تایپوگرافی و استایل‌های پایه.
- **`src/components/`**
  - `layout/`: `Header.tsx`, `Footer.tsx`.
  - `home/`: `HeroSection.tsx`, `HomePageClient.tsx` (جستجو، فیلتر، مرتب‌سازی، صفحه‌بندی و دریافت داده).
  - `products/`: `ProductCard.tsx`, `ProductDetailClient.tsx`.
  - `cart/`: `CartPageClient.tsx`.
- **`src/context/`**: `ThemeContext.tsx` (مدیریت تم با **Context API**).
- **`src/dictionary/`**: `fa.json`, `en.json` شامل متن‌های رابط کاربری، Metadata و پیام‌ها.
- **`src/i18n/`**: `request.ts` (تنظیم locale و بارگذاری messages)، `navigation.ts` (ابزارهای ناوبری محلی).
- **`src/i18n.ts`**: تعریف `routing` (زبان‌ها، پیش‌فرض، پیشوند مسیر).
- **`src/requests/`**: `products.ts` (`getProducts`, `getCategories`, `getProductById`).
- **`src/shared/`**: `StyledComponentsRegistry.tsx` (SSR برای styled-components) و `ui/` شامل کامپوننت‌های پایه (`Button`, `Inputs`, `LayoutPrimitives`, `States`).
- **`src/storage/`**
  - `cartStore.ts`: Store سبد خرید با **Zustand** و Persist.
  - `cartStorage.ts`, `themeStorage.ts`: helperهای ذخیره‌سازی LocalStorage/Cookie تم.
- **`src/types/`**: `index.ts` (مدل `Product`, `CartItem` و انواع کمکی)؛ `enums/` در حال حاضر خالی است.
- **`src/utils/`**: `queryKeys.ts` (کلیدهای Query) و `format.ts` (فرمت قیمت/خطا).
- **پوشه‌های رزرو:** `src/assets/{Fonts,Icons,Images}`, `src/modals`, `src/validations` در ساختار وجود دارند اما در پیاده‌سازی فعلی فایل یا منطق اجرایی ندارند.

## نحوه مدیریت State

تفکیک وضعیت‌ها در پروژه به‌صورت زیر انجام شده است:

### Server State با TanStack Query
- **هدف:** مدیریت داده‌های دریافت‌شده از API (محصولات و دسته‌بندی‌ها) به‌عنوان Server State.
- **پیکربندی:** `QueryProvider` یک `QueryClient` با تنظیمات `staleTime`, `gcTime`, `refetchOnWindowFocus: false` و `retry: 1` ایجاد می‌کند.
- **Query Keys:** در `src/utils/queryKeys.ts` به‌صورت متمرکز تعریف شده‌اند (`products`, `categories` و جزئیات محصول).
- **مصرف:** در `HomePageClient`، لیست محصولات و دسته‌بندی‌ها با `useQuery` و توابع `getProducts`/`getCategories` دریافت می‌شوند و وضعیت‌های Loading، Error (با Refetch) و Empty مدیریت می‌گردد. Cache و جلوگیری از درخواست‌های تکراری غیرضروری توسط React Query انجام می‌شود.
- **جزئیات محصول:** صفحه `products/[id]` در Server Component داده محصول را از طریق `getProductById` دریافت می‌کند.

### Client State با Zustand
- **هدف:** مدیریت سبد خرید به‌عنوان Client State.
- **Store:** `src/storage/cartStore.ts` با `zustand` و `persist`.
- **عملیات:** افزودن محصول، حذف، افزایش/کاهش تعداد (حداقل ۱)، پاک‌سازی سبد.
- **محاسبات:** selectorهای `selectTotalItems` و `selectSubtotal` برای تعداد کل و مجموع قیمت.
- **Persist و Hydration:** داده سبد در `localStorage` با کلید `nova-cart` ذخیره می‌شود؛ برای سازگاری با Next.js از `skipHydration` و rehydrate کنترل‌شده در `AppProviders` استفاده شده است.
- **تفکیک مسئولیت:** داده‌های API در Zustand ذخیره نمی‌شوند.

### Global UI State با Context API
- **هدف:** مدیریت تم (روشن/تاریک) و تنظیمات عمومی UI.
- **پیاده‌سازی:** `ThemeContext` مقدار اولیه تم (`initialTheme`) را از سرور دریافت می‌کند و از طریق `useTheme` در اختیار کامپوننت‌ها قرار می‌دهد.
- **همگام‌سازی:** در تغییر تم (`setTheme`/`toggleTheme`) وضعیت React، ویژگی‌های `data-theme` و `color-scheme` روی `document.documentElement`، مقدار `localStorage` و Cookie تم به‌صورت هماهنگ به‌روزرسانی می‌شوند.
- **State محلی:** برای وضعیت‌های محلی کامپوننت‌ها (مانند باز/بسته بودن منو، مقدار ورودی جستجو، فیدبک افزودن به سبد) از `useState` استفاده شده است.

## سیستم چندزبانه (فارسی و انگلیسی)

- **کتابخانه:** **next-intl**.
- **پیکربندی Routing:** در `src/i18n.ts` زبان‌ها `fa` و `en`، زبان پیش‌فرض `fa` و `localePrefix: "always"` تعریف شده است.
- **Middleware/Proxy:** `proxy.ts` با `createMiddleware(routing)` مسیریابی locale را مدیریت می‌کند و matcher مسیرهای غیرمرتبط (مانند `api` و فایل‌های استاتیک و ...) را از میان‌افزار مستثنی می‌کند.
- **بارگذاری پیام‌ها:** در `src/i18n/request.ts` با `getRequestConfig`، locale معتبر انتخاب و پیام‌ها از `src/dictionary/fa.json` یا `src/dictionary/en.json` بارگذاری می‌شوند.
- **ناوبری محلی:** `src/i18n/navigation.ts` ابزارهای ناوبری سازگار با locale را فراهم می‌کند.
- **Layout محلی:** در `src/app/[locale]/layout.tsx`، `lang` و `dir` بر اساس locale (`fa` → `rtl`, `en` → `ltr`) تنظیم می‌شوند، پیام‌ها از طریق `NextIntlClientProvider` در دسترس قرار می‌گیرند و Metadata بر اساس ترجمه‌ها تولید می‌شود.
- **سوئیچر زبان:** در `Header` امکان تغییر زبان با حفظ مسیر فعلی فراهم شده است.
- **فونت و جهت:** فونت **Vazirmatn** برای فارسی و **Inter** برای انگلیسی با `next/font` بارگذاری و در Layout/CSS بر اساس locale اعمال می‌شوند.

## مدیریت تم روشن و تاریک

- **حالت‌ها:** `light` و `dark` (نوع `ThemeMode`).
- **منبع مشترک سرور/کلاینت:** تم انتخابی در Cookie با کلید `nova-theme` ذخیره می‌شود تا در SSR قابل خواندن باشد.
- **SSR و سازگاری Hydration:** در `[locale]/layout.tsx` مقدار تم از Cookie (`cookies()` در `next/headers`) خوانده می‌شود و به‌صورت `data-theme` و `colorScheme` روی `<html>` و همچنین به‌عنوان `initialTheme` به Providerها منتقل می‌گردد؛ بدین ترتیب مقدار تم در SSR و اولین رندر کلاینت یکسان است.
- **Theme Context:** `ThemeProvider` تم اولیه سرور را دریافت می‌کند؛ تغییر تم از طریق سوئیچر Header انجام می‌شود.
- **ذخیره‌سازی:** در هر تغییر، تم در `localStorage` و Cookie به‌روزرسانی می‌شود و روی DOM اعمال می‌گردد.
- **استایل:** تم‌بندی با CSS Variables در `src/app/globals.css` (پالت سرمه‌ای/نارنجی و سطوح روشن/تیره) انجام شده و کامپوننت‌های styled-components از این متغیرها استفاده می‌کنند.
- **جلوگیری از پرش ظاهری:** با اعمال تم در خروجی SSR (به‌جای اسکریپت تغییردهنده DOM قبل از Hydration) از ناسازگاری رندر و پرش تم در بارگذاری جلوگیری شده است.

## اتصال به FakeStoreAPI و محدودیت‌ها

- **منبع داده:** [FakeStoreAPI](https://fakestoreapi.com) (فقط‌خواندنی).
- **پیکربندی کلاینت:** `src/api/axios.ts` از `NEXT_PUBLIC_API_BASE_URL` (پیش‌فرض: `https://fakestoreapi.com`) و `timeout: 10000ms` استفاده می‌کند.
- **Endpointهای استفاده‌شده:**
  - `GET /products` — دریافت لیست محصولات (`getProducts`)
  - `GET /products/categories` — دریافت دسته‌بندی‌ها (`getCategories`)
  - `GET /products/{id}` — دریافت جزئیات محصول (`getProductById`)
- **مدیریت خطا:** interceptor Axios پیام خطا را نرمال‌سازی می‌کند و در UI حالت خطا همراه امکان تلاش مجدد نمایش داده می‌شود.

**محدودیت‌ها:**
- API عمومی و فقط‌خواندنی است؛ عملیات **Checkout، ثبت سفارش، پرداخت و احراز هویت** سمت سرور ارائه/پیاده‌سازی نشده است.
- محتوای برخی فیلدهای محصول (مانند عنوان/توضیحات/نام دسته‌بندی) از خود API و عمدتاً به انگلیسی دریافت می‌شود.
- در دسترس‌پذیری و زمان پاسخ API وابسته به سرویس خارجی است؛ خطاهای شبکه ممکن است رخ دهد.
- سبد خرید **محلی** است و با FakeStoreAPI همگام‌سازی نمی‌شود.

## پیش‌نیازها

- **Node.js:** نسخه 20 یا بالاتر (پروژه با Node.js 23 نیز تست شده است)
- **npm:** نسخه 10 یا بالاتر (متناسب با Node.js)
- دسترسی به اینترنت برای نصب وابستگی‌ها و دریافت داده از FakeStoreAPI

## مراحل نصب و اجرا

1. ورود به پوشه پروژه:
   ```bash
   cd nova-store
   ```
2. نصب وابستگی‌ها:
   ```bash
   npm install
   ```
3. (اختیاری) ایجاد فایل متغیرهای محیطی از نمونه:
   ```bash
   copy .env.example .env.local
   ```
   مقادیر پیش‌فرض:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. اجرای محیط توسعه:
   ```bash
   npm run dev
   ```
5. مشاهده در مرورگر: [http://localhost:3000](http://localhost:3000) (به‌صورت خودکار به `/fa` هدایت می‌شود).

### اجرای Production

```bash
npm run build
npm run start
```

## اسکریپت‌های پروژه

اسکریپت‌های تعریف‌شده در `package.json`:

| اسکریپت | دستور | توضیح |
|---|---|---|
| `dev` | `npm run dev` | اجرای سرور توسعه **Next.js** |
| `build` | `npm run build` | ساخت خروجی Production |
| `start` | `npm run start` | اجرای سرور Production پس از Build |
| `lint` | `npm run lint` | اجرای **ESLint** روی پروژه |

برای بررسی تایپ‌ها می‌توان از دستور زیر استفاده کرد:

```bash
npx tsc --noEmit
```

## نکات تکمیلی

- مسیرهای محلی‌شده (`/[locale]`, `/[locale]/cart`) به دلیل خواندن Cookie تم در SSR به‌صورت Dynamic رندر می‌شوند؛ مسیر جزئیات محصول نیز بر اساس درخواست داده را دریافت می‌کند.
- `robots.txt` و `sitemap.xml` بر اساس `NEXT_PUBLIC_SITE_URL` تولید می‌شوند.

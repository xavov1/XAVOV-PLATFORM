'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string
  code: string
  name: string
  en: string
  type: 'original' | 'alternative' | 'refurbished'
  specs: string[]
  condition: number
  price: number
  oldPrice?: number
  warranty: string
  available: boolean
}

interface WindowData {
  name: string
  en: string
  count: number
  products: Product[]
}

// ─── Products Data ────────────────────────────────────────────────────────────

const WINDOWS_DATA: Record<string, WindowData> = {
  A1: {
    name: 'الجوالات', en: 'Smartphones', count: 6,
    products: [
      { id: 'A1-001', code: 'A1-001', name: 'هاتف Xiaomi 14 Pro', en: 'Xiaomi 14 Pro', type: 'original', specs: ['Snapdragon 8 Gen 3', '12GB RAM', '512GB'], condition: 96, price: 3299, oldPrice: 3999, warranty: 'سنة', available: true },
      { id: 'A1-002', code: 'A1-002', name: 'هاتف Samsung Galaxy S24', en: 'Samsung Galaxy S24 Ultra', type: 'original', specs: ['Exynos 2400', '12GB RAM', '256GB'], condition: 99, price: 4199, oldPrice: 5200, warranty: 'سنة', available: true },
      { id: 'A1-003', code: 'A1-003', name: 'هاتف iPhone 15 Pro Max', en: 'Apple iPhone 15 Pro Max', type: 'refurbished', specs: ['A17 Pro', '8GB RAM', '256GB'], condition: 88, price: 4599, oldPrice: 6500, warranty: '6 أشهر', available: true },
      { id: 'A1-004', code: 'A1-004', name: 'هاتف OnePlus 12', en: 'OnePlus 12', type: 'alternative', specs: ['Snapdragon 8 Gen 3', '16GB RAM', '512GB'], condition: 95, price: 2199, oldPrice: 2800, warranty: 'سنة', available: true },
      { id: 'A1-005', code: 'A1-005', name: 'هاتف Google Pixel 8 Pro', en: 'Google Pixel 8 Pro', type: 'original', specs: ['Google Tensor G3', '12GB RAM', '128GB'], condition: 97, price: 3799, oldPrice: 4500, warranty: 'سنة', available: true },
      { id: 'A1-006', code: 'A1-006', name: 'هاتف Huawei Pura 70', en: 'Huawei Pura 70 Pro', type: 'alternative', specs: ['Kirin 9010', '12GB RAM', '512GB'], condition: 94, price: 2899, oldPrice: 3600, warranty: 'سنة', available: true },
    ],
  },
  A2: {
    name: 'اللابتوبات', en: 'Laptops', count: 4,
    products: [
      { id: 'A2-001', code: 'A2-001', name: 'لابتوب MacBook Pro M3', en: 'Apple MacBook Pro M3 14"', type: 'original', specs: ['Apple M3', '16GB', '512GB SSD'], condition: 99, price: 4299, oldPrice: 5800, warranty: 'سنة', available: true },
      { id: 'A2-002', code: 'A2-002', name: 'لابتوب Dell XPS 15', en: 'Dell XPS 15 OLED', type: 'original', specs: ['Core i9-13900H', '32GB', '1TB SSD'], condition: 96, price: 5199, oldPrice: 6500, warranty: 'سنة', available: true },
      { id: 'A2-003', code: 'A2-003', name: 'لابتوب Lenovo ThinkPad X1', en: 'Lenovo ThinkPad X1 Carbon', type: 'refurbished', specs: ['Core i7-1365U', '16GB', '512GB SSD'], condition: 85, price: 2299, oldPrice: 4200, warranty: '6 أشهر', available: true },
      { id: 'A2-004', code: 'A2-004', name: 'لابتوب ASUS ROG Zephyrus', en: 'ASUS ROG Zephyrus G14', type: 'alternative', specs: ['Ryzen 9 7940HS', '16GB', '1TB SSD'], condition: 93, price: 3599, oldPrice: 4500, warranty: 'سنة', available: true },
    ],
  },
  A3: { name: 'قطع الكمبيوتر', en: 'PC Parts', count: 0, products: [] },
  A4: {
    name: 'الطابعات', en: 'Printers', count: 2,
    products: [
      { id: 'A4-001', code: 'A4-001', name: 'طابعة HP LaserJet Pro', en: 'HP LaserJet Pro M404dn', type: 'original', specs: ['طباعة ليزر', '38 ورقة/دقيقة', 'USB + Network'], condition: 100, price: 899, oldPrice: 1200, warranty: 'سنة', available: true },
      { id: 'A4-002', code: 'A4-002', name: 'طابعة Canon PIXMA', en: 'Canon PIXMA G3470', type: 'original', specs: ['طباعة حبر', 'حتى 4800dpi', 'Wi-Fi'], condition: 100, price: 649, oldPrice: 850, warranty: 'سنة', available: true },
    ],
  },
  A5: {
    name: 'الشاشات', en: 'Monitors', count: 3,
    products: [
      { id: 'A5-001', code: 'A5-001', name: 'شاشة LG UltraWide 34"', en: 'LG UltraWide 34WQ75C', type: 'original', specs: ['34 بوصة', 'QHD 3440×1440', '160Hz'], condition: 98, price: 1899, oldPrice: 2500, warranty: 'سنة', available: true },
      { id: 'A5-002', code: 'A5-002', name: 'شاشة Samsung Odyssey G7', en: 'Samsung Odyssey G7 32"', type: 'refurbished', specs: ['32 بوصة', '4K UHD', '144Hz'], condition: 90, price: 1299, oldPrice: 2200, warranty: '6 أشهر', available: true },
      { id: 'A5-003', code: 'A5-003', name: 'شاشة ASUS ProArt 27"', en: 'ASUS ProArt PA279CV', type: 'original', specs: ['27 بوصة', '4K UHD', 'USB-C 65W'], condition: 100, price: 1599, oldPrice: 2000, warranty: 'سنة', available: true },
    ],
  },
}

// ─── Wing / Window Metadata ───────────────────────────────────────────────────

const WING_META: Record<string, { code: string; nameAr: string; windows: { code: string; nameAr: string; en: string }[] }> = {
  '1500': {
    code: 'A', nameAr: 'الأجهزة الذكية',
    windows: [
      { code: 'A1', nameAr: 'الجوالات', en: 'Smartphones' },
      { code: 'A2', nameAr: 'اللابتوبات', en: 'Laptops' },
      { code: 'A3', nameAr: 'قطع الكمبيوتر', en: 'PC Parts' },
      { code: 'A4', nameAr: 'الطابعات', en: 'Printers' },
      { code: 'A5', nameAr: 'الشاشات', en: 'Monitors' },
    ],
  },
  '1600': {
    code: 'B', nameAr: 'الأجهزة المنزلية',
    windows: [
      { code: 'B1', nameAr: 'الثلاجات', en: 'Refrigerators' },
      { code: 'B2', nameAr: 'الغسالات', en: 'Washing Machines' },
      { code: 'B3', nameAr: 'المكيفات', en: 'Air Conditioners' },
      { code: 'B4', nameAr: 'الأفران', en: 'Ovens' },
      { code: 'B5', nameAr: 'الأجهزة الصغيرة', en: 'Small Appliances' },
      { code: 'B6', nameAr: 'القهوة', en: 'Coffee' },
    ],
  },
  '1700': {
    code: 'C', nameAr: 'الزراعي والصناعي',
    windows: [
      { code: 'C1', nameAr: 'المعدات الزراعية', en: 'Agricultural Equipment' },
      { code: 'C2', nameAr: 'أنظمة الري', en: 'Irrigation Systems' },
      { code: 'C3', nameAr: 'مستلزمات الزراعة', en: 'Farm Supplies' },
      { code: 'C4', nameAr: 'المضخات والخزانات', en: 'Pumps & Tanks' },
      { code: 'C5', nameAr: 'المعدات الصناعية', en: 'Industrial Equipment' },
      { code: 'C6', nameAr: 'الطاقة الشمسية', en: 'Solar Energy' },
    ],
  },
  '1800': {
    code: 'D', nameAr: 'الإلكترونيات العامة',
    windows: [
      { code: 'D1', nameAr: 'التلفزيونات', en: 'Televisions' },
      { code: 'D2', nameAr: 'الكاميرات', en: 'Cameras' },
      { code: 'D3', nameAr: 'الصوتيات', en: 'Audio' },
      { code: 'D4', nameAr: 'الشبكات', en: 'Networking' },
      { code: 'D5', nameAr: 'الملحقات', en: 'Accessories' },
    ],
  },
  '1900': {
    code: 'G', nameAr: 'الألعاب والترفيه',
    windows: [
      { code: 'G1', nameAr: 'PC', en: 'PC Gaming' },
      { code: 'G2', nameAr: 'PS', en: 'PlayStation' },
      { code: 'G3', nameAr: 'XBOX', en: 'Xbox' },
      { code: 'G4', nameAr: 'البطاقات الرقمية', en: 'Digital Cards' },
      { code: 'G5', nameAr: 'غرف القيمنج', en: 'Gaming Rooms' },
    ],
  },
  '2000': {
    code: 'F', nameAr: 'قطع السيارات',
    windows: [
      { code: 'F1', nameAr: 'تايوتا', en: 'Toyota' },
      { code: 'F2', nameAr: 'هونداي', en: 'Hyundai' },
      { code: 'F3', nameAr: 'كيا', en: 'Kia' },
      { code: 'F4', nameAr: 'ام جي', en: 'MG' },
      { code: 'F5', nameAr: 'شانجان', en: 'Changan' },
    ],
  },
}

const WING_NUM_TO_KEY: Record<string, string> = {
  '1500': 'a', '1600': 'b', '1700': 'c', '1800': 'd', '1900': 'g', '2000': 'f',
}

const BADGE_MAP: Record<string, string> = { original: 'أصلي', alternative: 'بديل', refurbished: 'مجدد' }
const BADGE_CLASS: Record<string, string> = { original: 'badge-original', alternative: 'badge-alt', refurbished: 'badge-refurb' }
const ICONS: Record<string, string> = { A1: '📱', A2: '💻', A3: '🖥', A4: '🖨', A5: '🖥' }

// ─── CSS (exact copy from xa-window-products-v1.html) ────────────────────────

const CSS = `
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --gold-glow:rgba(201,168,76,0.07);
  --bg:#02040A;--bg2:#04060D;
  --surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;
  --green:#2ECC71;--red:#C0392B;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;overflow-x:hidden;}
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.022;mix-blend-mode:overlay;}

/* NAV */
.xw-nav{position:sticky;top:0;z-index:100;height:64px;
  display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);}
.xw-nav-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xw-nav-path{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);letter-spacing:0.5px;}
.xw-nav-path-sep{color:var(--gold-b2);}
.xw-nav-path-cur{color:var(--text2);}
.xw-nav-cart-btn{display:flex;align-items:center;gap:8px;padding:8px 18px;
  border:1px solid var(--gold-b);cursor:pointer;transition:border-color 0.2s;position:relative;background:transparent;}
.xw-nav-cart-btn:hover{border-color:var(--gold-b2);}
.xw-nav-cart-lbl{font-size:11px;color:var(--muted);letter-spacing:1px;}
.xw-nav-cart-ico{font-size:14px;color:var(--gold);}
.xw-cart-count{position:absolute;top:-6px;left:-6px;width:18px;height:18px;
  background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:9px;color:#fff;font-weight:700;
  transform:scale(0);transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);}
.xw-cart-count.show{transform:scale(1);}

/* BACK + HEADER */
.xw-page-header{padding:36px 52px 0;position:relative;z-index:1;}
.xw-back-btn{display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);
  letter-spacing:1px;cursor:pointer;transition:color 0.2s;margin-bottom:28px;background:transparent;border:none;font-family:'Cairo',sans-serif;}
.xw-back-btn:hover{color:var(--gold);}
.xw-back-arr{font-size:14px;transition:transform 0.2s;}
.xw-back-btn:hover .xw-back-arr{transform:translateX(3px);}
.xw-wing-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:0;}
.xw-wing-title-block{}
.xw-wing-eyebrow{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:6px;
  color:rgba(201,168,76,0.45);margin-bottom:8px;}
.xw-wing-title{font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:0.3px;margin-bottom:4px;}
.xw-wing-title span{font-family:'Cormorant Garamond',serif;color:var(--gold);font-weight:300;}
.xw-wing-sub{font-size:13px;color:var(--muted);letter-spacing:0.5px;}
.xw-wing-count{font-family:'Cormorant Garamond',serif;font-size:11px;color:var(--muted);
  letter-spacing:3px;padding:6px 16px;border:1px solid var(--gold-b);}

/* WINDOW SWITCHER */
.xw-window-switcher{padding:28px 52px 0;position:relative;z-index:1;}
.xw-switcher-label{font-size:9px;letter-spacing:4px;color:var(--muted);
  font-family:'Cormorant Garamond',serif;margin-bottom:12px;}
.xw-switcher-tabs{display:flex;gap:0;border:1px solid var(--gold-b);background:var(--surface);width:fit-content;}
.xw-win-tab{padding:10px 22px;font-size:12px;font-weight:600;color:var(--muted);
  cursor:pointer;transition:all 0.25s;border-left:1px solid var(--gold-b);
  display:flex;flex-direction:column;align-items:center;gap:3px;min-width:80px;background:transparent;border-top:none;border-right:none;border-bottom:none;font-family:'Cairo',sans-serif;}
.xw-win-tab:last-child{border-left:none;}
.xw-win-tab:hover{color:var(--text2);background:var(--surface2);}
.xw-win-tab.active{color:var(--gold);background:var(--gold-glow);position:relative;}
.xw-win-tab.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xw-win-tab-code{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:300;line-height:1;}
.xw-win-tab-name{font-size:9px;letter-spacing:1px;white-space:nowrap;}

/* FILTER BAR */
.xw-filter-bar{padding:20px 52px 0;display:flex;align-items:center;gap:10px;position:relative;z-index:1;}
.xw-filter-btn{padding:7px 18px;border:1px solid var(--gold-b);background:transparent;
  color:var(--muted);font-size:11px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;
  cursor:pointer;transition:all 0.25s;}
.xw-filter-btn:hover{border-color:var(--gold-b2);color:var(--text2);}
.xw-filter-btn.active{border-color:var(--gold);color:var(--gold);background:var(--gold-glow);}
.xw-filter-sep{width:1px;height:20px;background:var(--gold-b);margin:0 4px;}
.xw-sort-select{padding:7px 16px;border:1px solid var(--gold-b);background:var(--surface2);
  color:var(--muted);font-size:11px;font-family:'Cairo',sans-serif;outline:none;cursor:pointer;}
.xw-filter-count{margin-right:auto;font-size:11px;color:var(--muted);letter-spacing:1px;
  font-family:'Cormorant Garamond',serif;}

/* PRODUCTS GRID */
.xw-products-section{padding:28px 52px 80px;position:relative;z-index:1;}
.xw-products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;
  background:var(--gold-b);border:1px solid var(--gold-b);}

/* PRODUCT CARD */
.xw-product-card{background:var(--surface);position:relative;overflow:hidden;
  cursor:pointer;transition:background 0.3s;display:flex;flex-direction:column;}
.xw-product-card:hover{background:var(--surface2);}
.xw-product-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);
  opacity:0;transition:opacity 0.3s;}
.xw-product-card:hover::before{opacity:0.5;}

/* Card image */
.xw-card-img{height:200px;background:var(--surface2);display:flex;align-items:center;
  justify-content:center;position:relative;overflow:hidden;border-bottom:1px solid var(--gold-b);}
.xw-card-img-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.04) 0%,transparent 70%);}
.xw-card-img-ico{font-family:'Cormorant Garamond',serif;font-size:64px;color:var(--gold);opacity:0.12;line-height:1;position:relative;z-index:1;}
.xw-card-img-corner{position:absolute;width:14px;height:14px;border-color:var(--gold);border-style:solid;opacity:0.25;}
.xw-card-img-corner.tl{top:10px;right:10px;border-width:1px 1px 0 0;}
.xw-card-img-corner.bl{bottom:10px;right:10px;border-width:0 1px 1px 0;}

/* Card badges */
.xw-card-badges{position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:4px;}
.xw-badge-type{font-size:8px;letter-spacing:2px;padding:3px 8px;font-family:'Cormorant Garamond',serif;}
.xw-badge-original{background:rgba(46,204,113,0.12);color:var(--green);border:1px solid rgba(46,204,113,0.25);}
.xw-badge-alt{background:rgba(201,168,76,0.1);color:var(--gold);border:1px solid var(--gold-b);}
.xw-badge-refurb{background:rgba(93,173,226,0.1);color:#5DADE2;border:1px solid rgba(93,173,226,0.25);}
.xw-badge-new{background:rgba(192,57,43,0.1);color:#E74C3C;border:1px solid rgba(192,57,43,0.25);}

/* Card body */
.xw-card-body{padding:20px 20px 16px;flex:1;display:flex;flex-direction:column;}
.xw-card-code{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:3px;color:var(--muted);margin-bottom:8px;}
.xw-card-name{font-size:15px;font-weight:700;margin-bottom:3px;line-height:1.3;}
.xw-card-name-en{font-family:'Cormorant Garamond',serif;font-size:11px;color:var(--muted);font-style:italic;letter-spacing:1px;margin-bottom:12px;}
.xw-card-specs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;}
.xw-card-spec{font-size:10px;color:var(--muted);padding:3px 8px;border:1px solid rgba(201,168,76,0.08);
  background:var(--surface3);letter-spacing:0.5px;}
.xw-card-condition{display:flex;align-items:center;gap:6px;margin-bottom:12px;}
.xw-cond-bar{flex:1;height:2px;background:var(--surface3);overflow:hidden;}
.xw-cond-fill{height:100%;background:linear-gradient(90deg,var(--gold),#E8C97A);transition:width 0.5s;}
.xw-cond-val{font-size:10px;color:var(--gold);letter-spacing:1px;white-space:nowrap;font-family:'Cormorant Garamond',serif;}

/* Card footer */
.xw-card-footer{border-top:1px solid var(--gold-b);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
.xw-card-price-block{}
.xw-card-price{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold);font-weight:300;line-height:1;}
.xw-card-price-cur{font-size:9px;color:var(--muted);letter-spacing:1px;}
.xw-card-price-old{font-size:11px;color:var(--muted);text-decoration:line-through;opacity:0.5;}
.xw-card-add-btn{display:flex;align-items:center;gap:6px;padding:9px 18px;
  border:1px solid var(--gold);color:var(--gold);background:transparent;
  font-size:11.5px;font-family:'Cairo',sans-serif;letter-spacing:0.3px;
  cursor:pointer;transition:all 0.25s;white-space:nowrap;flex-shrink:0;}
.xw-card-add-btn:hover{background:var(--gold);color:var(--bg);}
.xw-card-add-btn.added{border-color:var(--green);color:var(--green);background:rgba(46,204,113,0.05);}

/* LOADING STATE */
.xw-loading-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;
  background:var(--gold-b);border:1px solid var(--gold-b);}
.xw-skeleton-card{background:var(--surface);padding:0;overflow:hidden;}
.xw-skeleton-img{height:200px;background:linear-gradient(90deg,var(--surface) 25%,var(--surface2) 50%,var(--surface) 75%);
  background-size:200% 100%;animation:xw-shimmer 1.5s infinite;}
.xw-skeleton-body{padding:20px;}
.xw-skeleton-line{height:10px;background:linear-gradient(90deg,var(--surface) 25%,var(--surface2) 50%,var(--surface) 75%);
  background-size:200% 100%;animation:xw-shimmer 1.5s infinite;margin-bottom:10px;border-radius:0;}
.xw-skeleton-line.short{width:60%;}
.xw-skeleton-line.shorter{width:40%;}
@keyframes xw-shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}

/* EMPTY STATE */
.xw-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:100px 48px;text-align:center;}
.xw-empty-ico{font-family:'Cormorant Garamond',serif;font-size:64px;color:var(--gold);opacity:0.15;margin-bottom:24px;line-height:1;}
.xw-empty-title{font-size:20px;font-weight:700;margin-bottom:8px;color:var(--text2);}
.xw-empty-sub{font-size:13px;color:var(--muted);letter-spacing:0.5px;}

/* TOAST */
.xw-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(80px);
  background:var(--surface);border:1px solid var(--gold-b2);padding:12px 28px;
  font-size:12px;color:var(--text);letter-spacing:0.5px;backdrop-filter:blur(16px);
  z-index:9999;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  display:flex;align-items:center;gap:10px;white-space:nowrap;}
.xw-toast.show{transform:translateX(-50%) translateY(0);}
.xw-toast-dot{width:5px;height:5px;border-radius:50%;background:var(--green);}

/* DIVIDER */
.xw-section-div{height:1px;background:linear-gradient(90deg,transparent,var(--gold-b),transparent);margin:0 52px;}
`

// ─── Page Component ───────────────────────────────────────────────────────────

export default function WindowProductsPage() {
  const params = useParams()
  const router = useRouter()
  const { cart, addToCart: ctxAddToCart } = useCart()

  const wingNum = params?.wing as string
  const windowParam = (params?.window as string)?.toUpperCase()

  const wingMeta = WING_META[wingNum]
  const firstWindow = wingMeta?.windows[0]?.code ?? ''

  const [currentWindow, setCurrentWindow] = useState(windowParam || firstWindow)
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSort, setCurrentSort] = useState('default')
  const [loading, setLoading] = useState(true)
  const [toastMsg, setToastMsg] = useState('')
  const [toastShow, setToastShow] = useState(false)

  // Initial load skeleton
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  // addedItems derived from CartContext — no separate fake state
  const addedItems = new Set(cart.map(i => i.id))

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg)
    setToastShow(true)
    const t = setTimeout(() => setToastShow(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const switchWindow = (code: string) => {
    setCurrentWindow(code)
    setCurrentFilter('all')
    setCurrentSort('default')
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation()
    if (addedItems.has(p.id)) {
      showToast('المنتج موجود في السلة بالفعل')
      return
    }
    // Add to CartContext (keeps in-memory count/badge in sync)
    ctxAddToCart({ id: p.id, name: p.name, price: p.price })
    // Write to localStorage so the real cart page can read it
    try {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]')
      if (!stored.find((i: { id: string }) => i.id === p.id)) {
        stored.push({
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: 1,
          image: ICONS[currentWindow] || '◻',
          emoji: ICONS[currentWindow] || '◻',
          code: p.code,
        })
        localStorage.setItem('cart', JSON.stringify(stored))
        window.dispatchEvent(new Event('storage'))
      }
    } catch {}
    showToast('✓ أُضيف للسلة — ' + p.name)
  }

  const handleViewProduct = () => {
    showToast('⊹ جاري فتح صفحة المنتج...')
  }

  const handleGoBack = () => {
    const wingKey = WING_NUM_TO_KEY[wingNum]
    router.push(`/store/wings/${wingKey}`)
  }

  const getProducts = (): Product[] => {
    const data = WINDOWS_DATA[currentWindow]
    if (!data) return []
    let products = [...data.products]
    if (currentFilter !== 'all') products = products.filter(p => p.type === currentFilter)
    if (currentSort === 'price-asc') products.sort((a, b) => a.price - b.price)
    if (currentSort === 'price-desc') products.sort((a, b) => b.price - a.price)
    if (currentSort === 'condition') products.sort((a, b) => b.condition - a.condition)
    return products
  }

  const winData = WINDOWS_DATA[currentWindow]
  const currentWindowMeta = wingMeta?.windows.find(w => w.code === currentWindow)
  const products = getProducts()
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  if (!wingMeta) {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', background: '#02040A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EDE5D5', fontFamily: 'Cairo, sans-serif' }}>
        <p>الجناح غير موجود</p>
      </div>
    )
  }

  return (
    <>
      <style>{CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />

      <div dir="rtl" style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)', fontFamily: "'Cairo', sans-serif" }}>

        {/* TOAST */}
        <div className={`xw-toast${toastShow ? ' show' : ''}`}>
          <div className="xw-toast-dot" />
          <span>{toastMsg}</span>
        </div>

        {/* NAV */}
        <nav className="xw-nav">
          <span className="xw-nav-logo">XAVOV</span>
          <div className="xw-nav-path">
            <span>المتجر</span>
            <span className="xw-nav-path-sep">·</span>
            <span>جناح {wingMeta.code}</span>
            <span className="xw-nav-path-sep">·</span>
            <span className="xw-nav-path-cur">{currentWindowMeta?.nameAr ?? currentWindow}</span>
          </div>
          <button className="xw-nav-cart-btn" onClick={() => router.push('/cart')}>
            <span className="xw-nav-cart-ico">⊹</span>
            <span className="xw-nav-cart-lbl">السلة</span>
            <div className={`xw-cart-count${cartCount > 0 ? ' show' : ''}`}>{cartCount}</div>
          </button>
        </nav>

        {/* HEADER */}
        <div className="xw-page-header">
          <button className="xw-back-btn" onClick={handleGoBack}>
            <span className="xw-back-arr">→</span>
            <span>العودة للنوافذ</span>
          </button>
          <div className="xw-wing-header">
            <div className="xw-wing-title-block">
              <div className="xw-wing-eyebrow">WING {wingMeta.code} · {wingNum} · {wingMeta.nameAr}</div>
              <h1 className="xw-wing-title">
                <span>{currentWindow}</span>
                &nbsp;
                <span style={{ color: 'var(--text)', fontFamily: "'Cairo', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700 }}>
                  {currentWindowMeta?.nameAr ?? currentWindow}
                </span>
              </h1>
              <p className="xw-wing-sub">{currentWindowMeta?.en ?? ''}</p>
            </div>
            <div className="xw-wing-count">{winData ? winData.count : 0} منتجات</div>
          </div>
        </div>

        {/* WINDOW SWITCHER */}
        <div className="xw-window-switcher">
          <div className="xw-switcher-label">اختر النافذة · SELECT WINDOW</div>
          <div className="xw-switcher-tabs">
            {wingMeta.windows.map(win => (
              <button
                key={win.code}
                className={`xw-win-tab${currentWindow === win.code ? ' active' : ''}`}
                onClick={() => switchWindow(win.code)}
              >
                <div className="xw-win-tab-code">{win.code}</div>
                <div className="xw-win-tab-name">{win.nameAr}</div>
              </button>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="xw-filter-bar">
          {(['all', 'original', 'alternative', 'refurbished'] as const).map((f, i) => {
            const labels: Record<string, string> = { all: 'الكل', original: 'أصلي', alternative: 'بديل', refurbished: 'مجدد' }
            return (
              <button
                key={f}
                className={`xw-filter-btn${currentFilter === f ? ' active' : ''}`}
                onClick={() => setCurrentFilter(f)}
              >
                {labels[f]}
              </button>
            )
          })}
          <div className="xw-filter-sep" />
          <select
            className="xw-sort-select"
            value={currentSort}
            onChange={e => setCurrentSort(e.target.value)}
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="price-asc">السعر: من الأقل</option>
            <option value="price-desc">السعر: من الأعلى</option>
            <option value="condition">الحالة: الأفضل</option>
          </select>
          <span className="xw-filter-count">عرض {products.length} منتجات</span>
        </div>

        <div className="xw-section-div" style={{ marginTop: '20px' }} />

        {/* PRODUCTS */}
        <div className="xw-products-section">
          {loading ? (
            <div className="xw-loading-grid">
              {[0, 1, 2].map(i => (
                <div key={i} className="xw-skeleton-card">
                  <div className="xw-skeleton-img" />
                  <div className="xw-skeleton-body">
                    <div className="xw-skeleton-line" />
                    <div className="xw-skeleton-line short" />
                    <div className="xw-skeleton-line shorter" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="xw-empty-state">
              <div className="xw-empty-ico">◻</div>
              <div className="xw-empty-title">لا يوجد منتجات حالياً</div>
              <div className="xw-empty-sub">لم يتم إضافة منتجات لهذه النافذة بعد — تابعنا قريباً</div>
            </div>
          ) : (
            <div className="xw-products-grid">
              {products.map(p => (
                <div key={p.id} className="xw-product-card" onClick={handleViewProduct}>
                  <div className="xw-card-img">
                    <div className="xw-card-img-bg" />
                    <div className="xw-card-img-ico">{ICONS[currentWindow] || '◻'}</div>
                    <div className="xw-card-img-corner tl" />
                    <div className="xw-card-img-corner bl" />
                    <div className="xw-card-badges">
                      <div className={`xw-badge-type xw-${BADGE_CLASS[p.type]}`}>{BADGE_MAP[p.type]}</div>
                      {p.condition === 100 && <div className="xw-badge-type xw-badge-new">جديد</div>}
                    </div>
                  </div>
                  <div className="xw-card-body">
                    <div className="xw-card-code">{p.code} · {currentWindow} · {wingNum}</div>
                    <div className="xw-card-name">{p.name}</div>
                    <div className="xw-card-name-en">{p.en}</div>
                    <div className="xw-card-specs">
                      {p.specs.map((s, i) => <div key={i} className="xw-card-spec">{s}</div>)}
                    </div>
                    <div className="xw-card-condition">
                      <div className="xw-cond-bar">
                        <div className="xw-cond-fill" style={{ width: `${p.condition}%` }} />
                      </div>
                      <div className="xw-cond-val">{p.condition}%</div>
                    </div>
                  </div>
                  <div className="xw-card-footer">
                    <div className="xw-card-price-block">
                      {p.oldPrice && <div className="xw-card-price-old">{p.oldPrice.toLocaleString('ar')} SAR</div>}
                      <div className="xw-card-price">{p.price.toLocaleString('ar')}</div>
                      <div className="xw-card-price-cur">ريال سعودي · SAR</div>
                    </div>
                    <button
                      className={`xw-card-add-btn${addedItems.has(p.id) ? ' added' : ''}`}
                      onClick={e => handleAddToCart(e, p)}
                    >
                      {addedItems.has(p.id) ? '✓ أُضيف' : '+ أضف للسلة'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  )
}

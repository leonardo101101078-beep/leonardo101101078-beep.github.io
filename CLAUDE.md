# 囤囤鼠 🐹 Hamstock — 專案大綱紀要

> 家居補貨小幫手:純本機 PWA,用紅綠燈提醒家裡的生活用品該採買了。

## 一句話定位

記錄家裡該定時採買的生活用品(衛生紙、洗髮精…),每個項目用紅/黃/綠燈表示庫存新鮮度,一眼看出什麼快用完該下單。資料只存手機端,無後端、無帳號。

## 技術決策

| 項目 | 選擇 |
|------|------|
| 框架 | React + Vite + TypeScript |
| 型態 | 純前端離線 PWA(`vite-plugin-pwa`:manifest + service worker,可加到主畫面、離線可用) |
| 儲存 | `localStorage`(手機端) |
| 路由 | 不用 router,底部 tab bar 以 `useState` 切換兩頁 |
| 狀態 | `useItems` 自訂 hook,變動後寫回 localStorage |

## 資料模型

```ts
interface Item {
  id: string;              // crypto.randomUUID()
  name: string;            // 衛生紙
  cycleDays: number;       // 消耗週期:用多久會用完,如 28
  shippingDays: number;    // 送貨天數:下單到收到,如 3
  lastRestockedAt: string; // 上次補貨日 "YYYY-MM-DD"(新增時預設今天)
}

type Status = 'green' | 'yellow' | 'red';
```

## 核心燈號邏輯(`src/lib/status.ts`)

```
daysLeft = cycleDays - 已過天數(今天 - lastRestockedAt)

🔴 red    : daysLeft <= shippingDays         // 再不下單就斷貨(含逾期)
🟡 yellow : daysLeft <= shippingDays + 7      // 一週內該下單
🟢 green  : 其他                              // 充足
```

點「已補貨」→ `lastRestockedAt = 今天`,重置計時。

## 頁面

- **主頁 HomePage**:所有項目卡片。每張卡顯示 名稱、狀態燈、剩餘天數、「已補貨」按鈕、編輯/刪除。「＋ 新增」開表單(名稱 / 消耗週期 / 送貨天數)。
- **採買清單 ShoppingPage**:同一批項目依狀態分組,紅 → 黃 → 綠 排序;綠燈可淡化/收合。

## 檔案結構

```
index.html
vite.config.ts            # vite-plugin-pwa 設定
public/icons/             # PWA 圖示(倉鼠 192/512)
src/
  main.tsx
  App.tsx                 # view state + BottomNav + useItems
  types.ts                # Item, Status
  lib/status.ts           # daysBetween / getDaysLeft / getStatus / sortByStatus
  hooks/useItems.ts       # localStorage 讀寫;add/update/remove/markRestocked
  components/
    StatusLight.tsx       # 紅/黃/綠 圓燈
    ItemCard.tsx
    AddItemForm.tsx       # 新增/編輯共用
    BottomNav.tsx
  pages/
    HomePage.tsx
    ShoppingPage.tsx
  styles.css              # 行動優先;倉鼠配色
```

## 驗證重點

- 新增「衛生紙 / 28 / 3」→ 綠燈;調短週期或回推補貨日驗證 黃(剩 ≤10)、紅(剩 ≤3)、逾期仍紅。
- 點「已補貨」→ 燈回綠、天數重置。
- 採買清單分組排序正確。
- 重新整理後資料仍在(localStorage)。
- `build && preview`:Lighthouse 可安裝、加到主畫面、離線可用。

## 開發原則

簡單優先、YAGNI;不加未要求的功能(雲端同步、推播、多人共享皆為未來選項,目前不做)。

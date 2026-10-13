# 草本心語 · 整站架構（唔再用 Lovable）

**域名（稍後 DNS）：** `youwant.forquickhealth.com`  
**本機目錄：** `/workspace/elder-service-home/`  
**原則：** 靜態為主、合法公開資料、唔爬蟲、唔發明機構／電話、唔當醫療建議。

---

## 1. 產品定位

| 優先 | 功能 | 說明 |
|------|------|------|
| **主** | 搵服務 | 首頁英雄；用社署公開名冊（`places.js`）幫長者／家人搵附近服務 |
| **次** | AI 問症 | 保留概念同入口；MVP 只做占位頁／連去舊流程，暫唔接 LLM |
| **輔** | 健康專題 | 精簡幾頁：防跌、出院復康、腦部篩檢（唔做巨大分類樹） |

品牌語氣：長者友善、字大、對比清楚、誠實空狀態。

---

## 2. 技術棧建議（靜態優先）

**推薦：** 純 HTML／CSS／JS（而家原型已係），或極簡 **Vite**（方便拆頁、之後可加輕量路由）。

| 項目 | 選擇 | 原因 |
|------|------|------|
| 前端 | 靜態頁＋`places.js` | 免後端、免 Lovable credits |
| 建置 | 可選 Vite；亦可零建置直接上 Pages | 便宜、快、易維護 |
| 名冊更新 | 本機 `build_places.py` | 人手下載官方檔 → 產出 `places.js` → 再 deploy |
| 後端／LLM | MVP 唔需要 | AI 問症後期再加 API |

**唔用：** Lovable 持續編輯計費、伺服器渲染、自行爬社署網頁。

---

## 3. 網站地圖（Sitemap）

```
/                          → 搵服務（首頁英雄）
/ai/                       → AI 問症（次要；MVP 占位）
/topics/                   → 健康專題目錄（精簡）
/topics/falls/             → 防跌
/topics/post-discharge/    → 出院復康
/topics/brain-screening/   → 腦部篩檢
/about/                    → 關於／資料來源／免責（可同首頁「說明」合併）
/404.html                  → 找不到頁面
```

可選（後期）：`/en/` 英文、sitemap.xml、robots.txt。

---

## 4. 頁面清單

### 4.1 MVP 必做

| 路徑 | 名稱 | 內容重點 |
|------|------|----------|
| `/` | 搵服務 | 地區（十八區＋粵港／廣東省）＋五大類型＋關鍵字；結果卡；一鍵致電；分頁；大字；篩選摘要；說明抽屜；資料更新時間；頁腳免責 |
| `/ai/` | AI 問症（占位） | 簡短說明「參考用、唔代診」＋「即將開放」或連回舊站流程；主 CTA 指回搵服務 |
| `/topics/` | 專題目錄 | 三張卡片連去防跌／出院復康／腦部篩檢 |
| `/topics/falls/` | 防跌 | 簡短實用要點＋何時求醫＋連去相關服務類型（如日間護理） |
| `/topics/post-discharge/` | 出院復康 | 復康／照顧要點＋連去上門照顧等 |
| `/topics/brain-screening/` | 腦部篩檢 | 資訊性說明＋官方／醫院資源連結（唔診斷） |
| （頁腳共用） | 免責／來源 | 名冊可能滯後；以社署為準；唔係醫療建議 |

### 4.2 後期（非 MVP）

- AI 問症真正對話（自選 API／後端；合規與免責加強）
- 長者中心／青少年中心：有**官方開放檔**先接；否則維持誠實空狀態
- 地圖（OpenStreetMap 等）、收藏、分享連結帶篩選參數
- 英文版、PWA、無障礙審計深化
- 自動定期下載官方 CSV／XML（仍唔爬 HTML）

---

## 5. 首頁資訊架構（搵服務）

1. **頂欄：** 品牌名、大字開關、說明、（次要）AI 問症／專題  
2. **資料橫額：** 名冊匯出時間（`ELDER_META.generatedAt`）  
3. **英雄：**「想搵邊啲長者服務？」＋地區＋關鍵字＋「睇附近服務」  
4. **類型卡：** 安老院舍｜日間護理｜長者中心｜青少年中心（長者）｜上門照顧  
5. **結果區：** 卡（名稱、類型、地區、地址、時段、來源、致電）；每頁約 20  
6. **空狀態：** 未接類別 → 官方連結，唔虛構  
7. **頁腳：** 免責＋來源摘要  

導航次要入口：AI 問症、健康專題。

---

## 6. 資料來源（合法公開檔）

| 類型 | 本機檔 | 官方來源 |
|------|--------|----------|
| 安老院舍 | `data/rche_rsp_list.xml` | elderlyinfo.swd.gov.hk … `rche_rsp_list.xml` |
| 日間護理 | `data/List-of-DE-DCU.csv` | swd.gov.hk/datagovhk/elderly/… |
| 上門照顧／社區支援 | `data/ccsv-rsp.csv` | 社區照顧券認可單位公開 CSV |

- 轉換：`build_places.py` → `places.js`（`ELDER_PLACES`／`ELDER_META`）  
- **有數據：** 安老院舍、日間護理、上門照顧  
- **暫無統一開放檔：** 長者中心、青少年中心（長者）→ UI 誠實空狀態  
- **禁止：** 爬蟲、虛構電話／機構、「示範」假名單  

更新流程：人手下載最新官方檔入 `data/` → `python3 build_places.py` → 預覽 → deploy。

---

## 7. 託管同自訂域名

目標域名：`youwant.forquickhealth.com`（而家仍可能指住 Lovable／Cloudflare；新站上線時改 DNS）。

| 方案 | 適合 | 自訂域名做法（概要） |
|------|------|----------------------|
| **Cloudflare Pages**（首選） | 同現有 Cloudflare 域名生態 | 連 Git repo 或直接上傳；Pages 專案加 Custom domain → 按指示加 CNAME／DNS |
| **GitHub Pages** | 已有 GitHub | `Settings → Pages`；apex／子域 CNAME 指到 `*.github.io` |
| **Netlify** | 拖放／Git 都得 | Domain management 加域名；跟 CNAME 指示 |

建議：靜態產出放 `main`（或 `gh-pages`），**零伺服器費用**（免費額通常夠用）。  
**唔部署本次計劃；** 等 repo 同 DNS 決策後先上。

遷移 DNS 時注意：TTL、HTTPS 證書自動簽發、舊 Lovable 站可先保留作 fallback 再斷。

---

## 8. 由現有 Lovable 站遷移

**現況：** Live `https://youwant.forquickhealth.com/` 喺 Lovable（專案 `lovp_62vg8s8qay8ta86a5dbbdnk1a0`）；本機原型已喺 `/workspace/elder-service-home/`。

| 步驟 | 做咩 | 備註 |
|------|------|------|
| 1 | 以本機 `index.html`＋`places.js` 為真源，補齊 `/ai`、`/topics/*` | 唔再依賴 Lovable 編輯計費 |
| 2 | 建 GitHub（或 Cloudflare）repo，推靜態檔 | 優先 Git 改 code 再 publish |
| 3 | 接 Cloudflare Pages／GitHub Pages／Netlify | Preview URL 先驗收 |
| 4 | DNS：`youwant` 子域指去新託管 | 域名係你嘅；可繼續用 |
| 5 | 驗收：篩選、致電、空狀態、大字、手機版 | 通過先切正式流量 |
| 6 | Lovable 專案：可凍結／Archive，避免再開 credits | 舊內容可截圖備份 AI 問症文案如有需要 |

交接文件 `LOVABLE_HANDOFF.md` 改為「歷史參考」；新流程以本架構＋Git 為準。

---

## 9. 目錄結構建議（演進）

```
elder-service-home/
  index.html              # 搵服務首頁
  ai/index.html           # AI 占位
  topics/index.html
  topics/falls/index.html
  topics/post-discharge/index.html
  topics/brain-screening/index.html
  assets/css/             # 可選抽出共用樣式
  assets/js/              # 可選抽出篩選邏輯
  places.js               # build 產出（勿手改）
  build_places.py
  data/                   # 官方原始檔
  SITE_ARCHITECTURE.md    # 本文件
  MVP_CHECKLIST.md
  README.md
```

零建置可維持「每頁一個 HTML」；若轉 Vite，同上路徑做多頁入口即可。

---

## 10. 合規同體驗底線

- 只用官方允許嘅公開檔；**唔爬網站**  
- **唔發明**機構、電話、開放時間  
- 清楚標示：**唔係醫療診斷／建議**  
- 名冊滯後聲明＋官方核對連結  
- 長者友善：大掣、大字、鍵盤／螢幕閱讀器基本支援  

---

## 11. 成功定義（上線前）

- 首頁可以靠公開名冊搵到院舍／日間護理／上門照顧，並可一鍵致電（有 `tel` 先）  
- 未接類別唔會出現假資料  
- AI、三個專題有頁面同導航  
- 託管唔經 Lovable；域名可指到新站  
- 本機／Preview 用手機同大字模式通過自測  

**本文件只做規劃；唔包含部署。**

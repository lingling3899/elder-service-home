# 草本心語 · 長者服務搵位（靜態自建版）

用**社署公開資料**幫長者／家人搵附近服務。  
本目錄係**唔經 Lovable** 嘅多頁靜態站；目標域名稍後可指到 `youwant.forquickhealth.com`（**暫未部署**）。

規劃文件：[SITE_ARCHITECTURE.md](./SITE_ARCHITECTURE.md) · [MVP_CHECKLIST.md](./MVP_CHECKLIST.md)

## 點樣預覽（多頁）

1. （如需更新名冊）喺本目錄執行：
   ```bash
   python3 build_places.py
   ```
   腳本只讀本機 `data/` 內已下載嘅官方檔，**唔會上網爬蟲**。產出／覆寫 `places.js`。

2. 用本機伺服器（建議；避免 `file://` 擋腳本）：
   ```bash
   cd /workspace/elder-service-home
   python3 -m http.server 8765
   ```
   再開：
   - 首頁搵服務：`http://127.0.0.1:8765/`
   - AI 問症（占位）：`http://127.0.0.1:8765/ai/`
   - 健康專題：`http://127.0.0.1:8765/topics/`
   - 防跌／出院復康／腦部篩檢：`…/topics/falls/` 等
   - 關於：`http://127.0.0.1:8765/about/`

相對路徑設計，喺 `http.server` 同靜態託管（Cloudflare Pages／GitHub Pages／Netlify）都啱用。  
專題頁可用 `/?cat=日間護理`、`/?cat=上門照顧` 深連結返首頁篩選。

## 網站地圖

| 路徑 | 說明 |
|------|------|
| `/` | 搵服務首頁（地區＋類型＋關鍵字＋結果＋分頁＋致電） |
| `/ai/` | AI 問症占位（暫唔接 LLM） |
| `/topics/` | 三個健康專題目錄 |
| `/topics/falls/` | 防跌 |
| `/topics/post-discharge/` | 出院復康 |
| `/topics/brain-screening/` | 腦部篩檢（資訊性；唔診斷） |
| `/about/` | 關於、資料來源、免責 |
| `/404.html` | 找不到頁面（託管可另行設定） |

## 而家有咩

- 首頁：十八區＋粵港安老院／廣東省＋五大類型＋關鍵字＋分頁（每頁 20）
- 一鍵致電（有公開 `tel:` 先可撥）
- 「大字」開關（localStorage）；EN 仍係占位
- 篩選摘要＋「清除篩選」；「說明」抽屜
- 導航連去 AI、專題、關於；共用頁腳免責
- `places.js` 缺失時清晰載入失敗提示
- 長者中心／青少年中心：誠實空狀態（唔虛構）

## 資料來源（合法公開檔，唔爬蟲）

| 類型 | 本機檔 | 官方網址 |
|------|--------|----------|
| 安老院舍 | `data/rche_rsp_list.xml` | https://elderlyinfo.swd.gov.hk/sites/ltc-swd/files/rche_rsp_list.xml |
| 日間護理 | `data/List-of-DE-DCU.csv` | https://www.swd.gov.hk/datagovhk/elderly/List-of-DE-DCU.csv |
| 上門照顧／社區支援 | `data/ccsv-rsp.csv` | https://www.swd.gov.hk/datagovhk/elderly/list-of-ccsv-rsp.csv |

轉換：`build_places.py` → `places.js`（`window.ELDER_PLACES` / `window.ELDER_META`）。  
更新：人手下載官方檔入 `data/` → `python3 build_places.py` → 預覽。

名冊可能滯後；請以[社署長者資訊網安老院搜尋](https://elderlyinfo.swd.gov.hk/tc/ltc_search/rcs)及官方 CSV 為準。

## 檔案結構

```
elder-service-home/
  index.html                 # 搵服務首頁
  ai/index.html
  topics/index.html
  topics/falls|post-discharge|brain-screening/index.html
  about/index.html
  404.html
  assets/css/site.css        # 內頁共用樣式
  assets/js/site.js          # 大字開關
  places.js                  # build 產出（勿手改）
  build_places.py
  data/                      # 官方原始檔
  SITE_ARCHITECTURE.md
  MVP_CHECKLIST.md
  README.md
```

## 託管（稍後；今次唔部署）

可上傳／連 Git 到 Cloudflare Pages、GitHub Pages 或 Netlify，再將 `youwant.forquickhealth.com` DNS 指過去。詳見 `SITE_ARCHITECTURE.md` §7。

## 合規

- 只用官方公開檔／人手下載；**唔爬網站**
- **唔發明**電話或機構
- **唔係**醫療建議；緊急打 **999**

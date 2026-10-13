# 草本心語 · Lovable 交接包

**域名：** https://youwant.forquickhealth.com/  
**Lovable 專案：** https://lovable.dev/projects/lovp_62vg8s8qay8ta86a5dbbdnk1a0  
**本機原型目錄：** `/workspace/elder-service-home/`（箱電腦共用）

呢份文件畀你（或 Lovable Agent）一次過把「搵服務」做成首頁英雄區，再 Publish。**唔好虛構**未有開放數據嘅機構。

---

## 目標（產品）

1. **首頁英雄 = 搵附近長者服務**（地區＋服務類型＋關鍵字＋結果卡＋一鍵致電）。
2. **現有 AI 問症收做次要**（次要 CTA／次要路由，例如 `/` 原 AI 頁改做 `/ai`，或搵服務做 `/`、AI 留在次要連結）。
3. 繼續用同一 domain：`youwant.forquickhealth.com`。
4. 保留免責聲明；只用社署／data.gov.hk **公開檔**；**唔爬蟲**；**唔發明**長者中心／青少年中心名單。

---

## 要帶入 Lovable 嘅檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | UI／文案／篩選／分頁／空狀態／說明抽屜嘅**參考實作**（靜態 HTML；Lovable 用 React 重寫同等行為即可） |
| `places.js` | `window.ELDER_PLACES`（約 1518 項）＋ `window.ELDER_META`（匯出時間、來源、十八區） |
| `data/` + `build_places.py` | 可選；要更新名冊時本機跑 `python3 build_places.py` 再上傳新 `places.js` |
| `README.md` | 資料來源同合規說明 |
| `LOVABLE_HANDOFF.md` | 本文件（含下面貼上提示） |

**資料類型（places.js）：**

- 有數據：`安老院舍`、`日間護理`、`上門照顧`
- 暫無開放數據（介面要誠實空狀態＋官方連結）：`長者中心`、`青少年中心（長者）`

每項大致欄位：`id`, `name`, `type`, `typeDetail`, `district`, `phone`, `tel`（`tel:+852…`）, `address`, `hours`, `source`, `sourceUrl`, `updated`。

地區：全港十八區短名；另有社署名單入面嘅 `廣東省`（UI 顯示「廣東省（粵港安老院）」）。

---

## 貼上 Lovable 嘅提示（複製整段）

```
請把草本心語（youwant.forquickhealth.com）首頁改成「搵附近長者服務」為主，現有 AI 問症收做次要功能。

【產品】
- 首屏英雄：標題「想搵邊啲長者服務？」；地區下拉（全港 + 香港十八區 +「廣東省（粵港安老院）」）；可選關鍵字；大掣「睇附近服務」。
- 五大類型卡片：安老院舍、日間護理、長者中心、青少年中心（長者服務）、上門照顧／社區支援。可再撳取消揀選。
- 結果列表：機構卡顯示類型標籤、名稱、地區、地址、詳情／開放時間（如有）、來源一行、「一鍵致電」（有 tel 先可撥）。每頁約 20 項，有上一頁／下一頁。
- 篩選摘要：有篩選時顯示「而家顯示：…（共 N 項）」同「清除篩選」；大字模式開關（可記 localStorage）。
- AI 問症：次要橫條 CTA，文案類似「身體唔舒服？AI 問症參考」，連去現有 AI 對話頁（請保留／搬到次要路由，例如 /ai；唔好刪功能）。
- 頁頂資料來源橫額（顯示名冊匯出時間）；頁腳重要免責（唔係醫療建議、名冊可能滯後、請官方核對）。
- 「說明」抽屜：列出社署／data.gov.hk 三個公開來源連結，並說明長者中心／青少年中心未接數據、唔會虛構。

【數據】
- 請把專案內 places.js（或同等 JSON）載入：ELDER_PLACES + ELDER_META。共約 1518 項真實社署公開資料（安老院舍、日間護理、社區照顧券認可單位／上門照顧）。
- 「長者中心」「青少年中心（長者）」：未有開放數據 → 顯示誠實空狀態＋官方連結（社署長者服務／青年服務／長者資訊網），絕對唔好發明機構名或電話。
- 唔好用假「示範」名單。唔爬蟲。

【視覺／無障礙】
- 長者友善：字大、按鈕夠高（約 52px+）、對比清楚、綠系（參考現有草本風格亦可）。
- aria-label／aria-pressed、跳去結果連結、致電按鈕可聚焦。
- 手機優先；桌面可置中窄欄。

【域名同發佈】
- 繼續用 youwant.forquickhealth.com。
- 改完請 Preview 確認：篩選、關鍵字、分頁、致電連結、未接數據空狀態、大字、說明抽屜都正常，再 Publish。
```

---

## 建議實作步驟（Lovable 內）

1. 上傳／貼入 `places.js`（或轉成 `src/data/places.json` 再 import）。
2. 新增 React 頁／元件（例如 `ElderServiceFinder`），行為對齊本機 `index.html`。
3. 路由：搵服務做 `/`（或首頁英雄）；原 AI Chat 改次要路由並喺次要 CTA 接上。
4. Preview → 用上面清單自測 → **Publish**。

---

## Publish 前檢查清單

- [ ] 首頁係「搵服務」，唔係淨 AI 對話
- [ ] AI 問症仍可從次要入口到達
- [ ] 安老院／日間護理／上門照顧有真實結果；無「示範」假資料
- [ ] 長者中心、青少年中心顯示未接數據說明＋官方連結
- [ ] 十八區＋粵港安老院可選；關鍵字同分頁正常
- [ ] 有電話嘅卡可 `tel:` 致電
- [ ] 免責＋資料更新時間可見
- [ ] Preview 滿意後先 Publish 去 youwant.forquickhealth.com

---

## 本機預覽（交 Lovable 前）

```bash
cd /workspace/elder-service-home
# 如需用已下載嘅 data/ 重新匯出：
python3 build_places.py
python3 -m http.server 8765 --directory /workspace/elder-service-home
# 開 http://127.0.0.1:8765/
```

---

## 已知差距（上線後可再加）

- 英文版仍係占位
- 未做地圖／GPS 距離排序（而家係地區＋關鍵字）
- 長者中心／青少年中心等有官方開放檔先可接入
- `places.js` 體積較大；Lovable 可考慮按類型拆 chunk 或後端靜態 JSON
- 社署 CSV 部分單位地區靠地址推斷，可能有「未標示」地區

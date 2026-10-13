# Domain 接駁說明（youwant.forquickhealth.com）

用粵語簡短講清楚：**本機已經可以睇**；domain 係公開上網用。

## 1. 預覽唔一定要接 domain

- 喺電腦開 `/workspace/elder-service-home/`（例如用簡單靜態伺服器）已經可以睇晒 MVP。
- 例：喺該資料夾執行 `python3 -m http.server 8080`，再用瀏覽器開 `http://localhost:8080/`。
- **未改 DNS 之前**，外面嘅人用 `youwant.forquickhealth.com` 仍然會去到而家 Lovable 嗰邊（如果仲指住舊站）。

## 2. 想公開用 youwant.forquickhealth.com

大致兩步：

1. **Hosting**：把靜態站放到 Cloudflare Pages（或同類：Netlify、GitHub Pages 等）。
   - 最常見：連 GitHub repo → Cloudflare Pages 自動 deploy；或者直接 upload 呢個資料夾。
2. **DNS**：喺域名供應商／Cloudflare DNS，按 Pages 專案指示加 **CNAME** 或 **A** record，把 `youwant`（或你用嘅 subdomain）指去新 Pages 專案。

具體 record 名稱同目標，以 Cloudflare Pages「Custom domains」頁面顯示為準——唔好估。

## 3. Domain 而家已經喺 Cloudflare（Lovable 站）

- `youwant.forquickhealth.com` 本身係你嘅；而家多半仍然指住 **Lovable** 嘅 hosting。
- 轉去自建站 = **改 DNS／Custom domain**，由 Lovable 轉去新嘅 Cloudflare Pages（或你揀嘅 host）。
- 改完之後：舊 Lovable 網址可能仲在，但 **同一個 subdomain 只會去一個地方**——指去新站，訪客就睇新站。
- 建議：轉 DNS 前先確認 Pages 預覽網址（`*.pages.dev`）內容正確，再切 custom domain，減少斷線時間。

## 4. 你要做咩 vs 網頁工坊可以做咩

| 項目 | 你（用戶） | 網頁工坊（有授權之後） |
|------|-----------|------------------------|
| 本機改版、預覽、準備 deploy 檔 | 可自己睇；工坊亦可做 | 可以繼續執 code、影預覽 |
| Cloudflare／GitHub **登入同授權** | **一定要你本人批准** | 未授權就做唔到代你改 DNS／建 Pages |
| 喺 Cloudflare 開 Pages 專案、接 repo、加 Custom Domain | 可以自己做；或授權後叫工坊代做 | 有 Cloudflare／GitHub 連接後可以代做 |
| 改 DNS 離開 Lovable、指去新 Pages | 最終確認要你同意（影響 live 站） | 有權限後可代改；**建議你先確認預覽 OK** |
| Lovable 繼續用唔用 | 你決定；轉 domain 唔等於一定刪 Lovable 專案 | 唔會擅自刪你嘅 Lovable 專案 |

### 而家最慳事嘅做法

1. 先用本機／Pages 預覽網址確認新站 OK。  
2. 你授權 Cloudflare（同如需要 GitHub）。  
3. 工坊幫你建 Pages + 接 `youwant.forquickhealth.com`。  
4. 你確認 live 內容無誤。

未授權前：工坊只可以繼續整好靜態站同文件，**唔會擅自改你嘅 DNS**。

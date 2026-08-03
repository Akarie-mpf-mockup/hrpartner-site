import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // アセットを相対パスで出す。これで2つの URL の両方で動く：
  //   本番     https://hrpartner.robottte.com/        （ルート配信）
  //   確認用   https://akarie-mpf-mockup.github.io/hrpartner-site/（サブパス配信）
  // 既定の '/' だとサブパス側で /assets/... を見に行って 404 になり、真っ白になる。
  // ハッシュリンクだけの1枚もので、クライアントルーティングが無いため相対で問題ない。
  base: './',
  plugins: [react()],
})

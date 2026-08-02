import Nav from './components/Nav'
import Hero from './components/Hero'
import Forms from './components/Forms'
import Partner from './components/Partner'
import Method from './components/Method'
import Chat from './components/Chat'
import Flow from './components/Flow'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

// セクションの並びは Vault の
// 💦A.実務/HRP.HRパートナー/サービスサイト/01_コンセプトとページ構成_20260802.md §2-1 に対応。
// HRチャット（Chat）は「従」＝HRパートナーの後ろに置き、専用CTAは持たない。
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Forms />
        <Partner />
        <Method />
        <Chat />
        <Flow />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

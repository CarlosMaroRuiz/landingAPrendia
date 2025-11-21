import Header from "./components/organism/headerOrganism"
import FeatureTemplate from "./components/template/featureTemplate"
import Footer from "./components/template/footerTemplat"
import InterestTemplate from "./components/template/interestTemplat"
import IntroductionTemplate from "./components/template/introductionTemplate"
import WhatIaTemplate from "./components/template/whatIaTemplate"

function App() {
  return (
    <>
      <Header />
      <main className="w-full px-4 md:px-16 lg:px-42 pt-24 md:pt-36">
        <div id="que-es" className="pt-6 md:pt-10">
          <WhatIaTemplate />
        </div>

        <div className="mt-10 md:mt-16">
          <IntroductionTemplate />
        </div>

        <div id="caracteristicas">
          <FeatureTemplate />
        </div>

        <div id="me-interesa">
          <InterestTemplate />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App

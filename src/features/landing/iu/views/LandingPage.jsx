import { useState } from "react"
import Header from "../components/organisms/headerOrganism"
import FeatureTemplate from "../components/templates/featureTemplate"
import Footer from "../components/templates/footerTemplat"
import InterestTemplate from "../components/templates/interestTemplat"
import IntroductionTemplate from "../components/templates/introductionTemplate"
import WhatIaTemplate from "../components/templates/whatIaTemplate"
import ScrollToTop from "../components/atoms/scrollToTop"
import VideoModal from "../components/organisms/videoModal"

function LandingPage() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(true)

    return (
        <>
            <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
            <Header />
            <main className="w-full px-4 sm:px-8 md:px-16 lg:px-20 xl:px-20 pt-16 sm:pt-20 md:pt-20 lg:pt-20">

                <IntroductionTemplate />

                <section id="que-es" className="pt-6 md:pt-10">
                    <WhatIaTemplate />
                </section>

                <section id="caracteristicas">
                    <FeatureTemplate />
                </section>

                <section id="me-interesa">
                    <InterestTemplate />
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default LandingPage

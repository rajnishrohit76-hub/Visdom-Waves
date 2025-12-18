import React from 'react'
import '../cssCode/homePage.css'

import HomeVideo from './HomeVideo';
import LeaderVoice from './LeaderVoice';

import ParentTrust from './parentTrust';

import Footer from './footer';

import BoardSection from './BoardSection';
import StudentLove from './StudentLove';
import PlatformTrusted from './PlatformTrusted';
import OurPartner from './OurPartner';
import MultilingualFuture from './multilingualFeature';

function HomePage() {
  return (
    <>
      <section>
        <HomeVideo />
      </section>

      <section>
        <LeaderVoice />
      </section>

      <section>
        <MultilingualFuture />
      </section>

      <section>
        <BoardSection />
      </section>

      <section>
        <StudentLove />
      </section>

      <section>
        <ParentTrust />
      </section>

      <section>
        <PlatformTrusted />
      </section>

      <section>
        <OurPartner />
      </section>

      <section>
        <Footer />
      </section>
       

    </>
  )
}

export default HomePage;
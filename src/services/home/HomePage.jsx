import React from 'react'
import LeaderVoice from './leaderVoice';
import MultilingualFeature from './multilingualFeature';
import StudentLove from './studentLove';
import ParentTrust from './parentTrust';
import TrustedPartners from './trustedPartners';
import Footer from './footer';
import HomeVideo from './HomeVideo';
import '../cssCode/HomePage.css'
import BoardSection from './BoardSection';

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
        <MultilingualFeature />
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
        <TrustedPartners />
      </section>

      <section>
        <Footer />
      </section>
       

    </>
  )
}

export default HomePage;
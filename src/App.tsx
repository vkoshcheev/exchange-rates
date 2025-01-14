import React from 'react';
import './App.scss';
import IntroductionSection from './sections/IntroductionSection/IntroductionSection';
import LegalNote from './sections/LegalNote/LegalNote';
import RatesSection from './sections/RatesSection/RatesSection';

const App = () => {
  return (
    <div className="main-container">
      <IntroductionSection />
      <RatesSection />
      <LegalNote />
    </div>
  );
};

export default App;

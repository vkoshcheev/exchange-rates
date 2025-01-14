import './IntroductionSection.scss';
import CisCountriesCollapsible from './components/CisCountriesCollapsible';

const IntroductionSection = () => {
  return (
    <div className="section">
      <p className="section__title">Данный сайт посвящён обменным курсам валют стран СНГ.</p>

      <p>
        Содружество Независимых Государств (СНГ) — международная организация, призванная регулировать
        отношения сотрудничества между некоторыми государствами, входившими ранее в состав СССР. Основано 8
        декабря 1991 года.
      </p>

      <CisCountriesCollapsible />
    </div>
  );
};

export default IntroductionSection;
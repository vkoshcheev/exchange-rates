import { useCallback, useEffect, useRef, useState } from 'react';
import Collapsible from 'react-collapsible';
import { cisCurrenciesData } from '../../../utils/requests/currenciesList';
import './CisCountriesCollapsible.scss';

const cisCurrenciesDataArray = Object.values(cisCurrenciesData);

const CisCountriesCollapsible = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rotatingDivRef = useRef<HTMLButtonElement>(null);

  const setExpanded = (expanded: boolean) => {
    const angle = expanded ? 0 : -45;
    rotatingDivRef.current!.style.transition = 'transform 0.5s ease-in-out';
    rotatingDivRef.current!.style.transform = `rotate(${angle}deg)`;
  };

  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);

  // ✖ × ✕
  const CollapsibleHeader = useCallback(
    () => {
      return (
        <div className="cis-countries-collapsible__item__header">
          <button
            ref={rotatingDivRef}
            className="cis-countries-collapsible__item__header__button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="cis-countries-collapsible__item__header__button__symbol">✖</div>
          </button>
          <div>
            <div>Страны СНГ и их валюты</div>
            <div className="cis-countries-collapsible__item__header__note">
              (нажмите на "+", чтобы открыть таблицу)
            </div>
          </div>
        </div>
      );
    },
    [],
  );

  return (
    <div className="cis-countries-collapsible__item">
      <Collapsible
        trigger={<CollapsibleHeader />}
        handleTriggerClick={() => {}}
        open={isOpen}
        className="cis-countries-collapsible"
        openedClassName="cis-countries-collapsible"
      >
        <table className="country-list-table">
          <tbody>
            {cisCurrenciesDataArray.map((cisCurrencyData) => {
              const countryFlag = cisCurrencyData.symbol;
              const countryName = cisCurrencyData.countryShort;

              let currencyText = '';
              currencyText = currencyText.concat(` - ${cisCurrencyData.name}`);
              currencyText = currencyText.concat(` (${cisCurrencyData.currencySymbol})`);

              return (
                <tr key={cisCurrencyData.iso}>
                  <td><span className="country-flag">{countryFlag}</span> {countryName}</td>
                  <td>-</td>
                  <td>{cisCurrencyData.name}</td>
                  <td>-</td>
                  <td>{cisCurrencyData.currencySymbol}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
};

export default CisCountriesCollapsible;

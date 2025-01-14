import './ExchangeRatesTableHeaders.scss';

const ExchangeRatesTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="exchange-rates-table__header" rowSpan={2}>
          Инструмент
        </th>
        <th className="exchange-rates-table__header__rates" rowSpan={2} colSpan={2}>
          Курс
        </th>

        <th
          className="exchange-rates-table__header__percentage-changes-over-periods hide-below-720"
          colSpan={2}
        >
          Стоимость / изменения за период:
        </th>
      </tr>

      <tr>
        <th className="exchange-rates-table__header__rates hide-below-720">
          Стоимость месяц назад
          <br />% изменения за месяц
        </th>
        <th className="exchange-rates-table__header__rates hide-below-720" style={{ borderRightWidth: 0 }}>
          Стоимость полгода назад
          <br />% изменения за полгода
        </th>
      </tr>
    </thead>
  );
};

export default ExchangeRatesTableHeaders;

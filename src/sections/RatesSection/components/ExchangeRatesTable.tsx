import { cloneDeep } from 'lodash';
import {
  CurrencyIso,
  OrderedInstrumentIsoArray,
  defaultCurrencyKeysListWithIds,
  defaultMetalKeysListWithIds
} from '../../../utils/requests/currenciesList';
import { periods } from '../fetchAndBuildCurrencyExchangeRatesData';
import './ExchangeRatesTable.scss';
import ExchangeRatesTableRow from './ExchangeRatesTableRow';

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrenciesOrderedList } from '../../../redux/mainReducer';
import { useAppSelector } from '../../../redux/store';
import { useLocalStorage } from '../../../utils/hooks/useLocalStorage';
import localStorageKeys from '../../../utils/localStorageKeys';
import ExchangeRatesTableHeaders from './ExchangeRatesTableHeaders';

const TableColgroup = () => (
  <colgroup>
    <col className="exchange-rates-table__colgroup-item" />
    <col className="exchange-rates-table__colgroup-item" />
    <col className="exchange-rates-table__colgroup-item" />
    <col className="exchange-rates-table__colgroup-item" />
    <col className="exchange-rates-table__colgroup-item" />
  </colgroup>
);

const ExchangeRatesTable = ({
  baseCurrencyIso,
  reverseExchangeRates,
  usingIsoNames,
  measurePreciousMetalsInGrams,
}: {
  baseCurrencyIso: CurrencyIso;
  reverseExchangeRates: boolean;
  usingIsoNames: boolean;
  measurePreciousMetalsInGrams: boolean;
}) => {
  const dispatch = useDispatch();
  const draggingRowsEnabled = useAppSelector(store => store.main.draggingRowsEnabled);
  const periodicExchangeRatesData = useAppSelector(store => store.main.periodicExchangeRatesData);

  const [sortedCurrencyKeys, setSortedCurrencyKeys] = useLocalStorage(
    localStorageKeys.currenciesOrder,
    defaultCurrencyKeysListWithIds
  );
  const [sortedMetalsKeys, setSortedMetalsKeys] = useLocalStorage(
    localStorageKeys.metalsOrder,
    defaultMetalKeysListWithIds
  );

  const filteredCurrencyKeysList = useMemo(
    () => sortedCurrencyKeys.filter((item) => item.iso !== baseCurrencyIso),
    [baseCurrencyIso, sortedCurrencyKeys]
  );

  const sensors = [
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // user must hold for X ms to start dragging
        tolerance: 5, // allow up to 5px movement before activating drag
      },
    }),
  ];
  const draggableCurrencySensors = useSensors(...sensors);
  const draggableMetalsSensors = useSensors(...sensors);

  const handleDragEnd = (
    event: DragEndEvent,
    initialKeys: OrderedInstrumentIsoArray,
    setterFunction: (newValue: OrderedInstrumentIsoArray) => void
  ) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = initialKeys.findIndex((item) => item.id === active.id);
      const newIndex = initialKeys.findIndex((item) => item.id === over?.id);
      const updated = arrayMove(initialKeys, oldIndex, newIndex);
      setterFunction(updated);
    }
  };

  return (
    <div style={{ touchAction: draggingRowsEnabled ? 'none' : undefined }}>
      <DndContext
        sensors={draggingRowsEnabled ? draggableCurrencySensors : []}
        collisionDetection={closestCenter}
        onDragEnd={(e) => {
          handleDragEnd(e, sortedCurrencyKeys, (updated) => {
            setSortedCurrencyKeys(updated);
            dispatch(setCurrenciesOrderedList(updated));
          });
        }}
        modifiers={[restrictToParentElement, restrictToWindowEdges]} // constrain movement
      >
        <SortableContext items={sortedCurrencyKeys.map((item) => item.id)} strategy={rectSortingStrategy}>
          <table
            className="exchange-rates-table"
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            <TableColgroup />

            <ExchangeRatesTableHeaders />

            <tbody>
              <tr>
                <td className="exchange-rates-table__separator" colSpan={3} />
                <td className="exchange-rates-table__separator hide-below-720" colSpan={2} />
              </tr>

              {filteredCurrencyKeysList.map((currency, index) => (
                <ExchangeRatesTableRow
                  id={currency.id}
                  key={currency.iso}
                  iso={currency.iso}
                  baseCurrencyIso={baseCurrencyIso}
                  periodicExchangeRatesData={periodicExchangeRatesData}
                  reverseExchangeRates={reverseExchangeRates}
                  precision={4}
                  usingIsoNames={usingIsoNames}
                  isFirst={index === 0}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      <DndContext
        sensors={draggableMetalsSensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => handleDragEnd(e, sortedMetalsKeys, setSortedMetalsKeys)}
        modifiers={[restrictToParentElement, restrictToWindowEdges]} // constrain movement
      >
        <SortableContext items={sortedMetalsKeys.map((item) => item.id)} strategy={rectSortingStrategy}>
          <table
            className="exchange-rates-table"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}
          >
            <TableColgroup />

            <tbody>
              {sortedMetalsKeys.map((metal, index) => {
                const metalsExchangeRatesData = cloneDeep(periodicExchangeRatesData);

                if (measurePreciousMetalsInGrams) {
                  periods.forEach((periodItem) => {
                    if (metalsExchangeRatesData[periodItem]) {
                      metalsExchangeRatesData[periodItem]![metal.iso].reverse =
                        metalsExchangeRatesData[periodItem]![metal.iso].reverse / 31.1035;
                    }
                  });
                }

                return (
                  <ExchangeRatesTableRow
                    id={metal.id}
                    key={metal.iso}
                    iso={metal.iso}
                    baseCurrencyIso={baseCurrencyIso}
                    periodicExchangeRatesData={metalsExchangeRatesData}
                    reverseExchangeRates={false}
                    precision={2}
                    usingIsoNames={false}
                    isFirst={index === 0}
                  />
                );
              })}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ExchangeRatesTable;

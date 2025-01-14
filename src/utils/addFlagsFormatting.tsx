import { cisCurrenciesData } from "./requests/currenciesList";

const flagSymbols = Object.values(cisCurrenciesData).map(item => item.symbol);

export const addFlagsFormatting = (input: string) => {
  // array to store the processed react elements
  const processedContent: React.ReactNode[] = [];
  let currentIndex = 0;

  // match any of the flags
  const regex = new RegExp(`(${flagSymbols.join('|')})`, 'g');
  
  // split the string by flags
  let match;
  while ((match = regex.exec(input)) !== null) {
    // push the text before the flags
    if (match.index > currentIndex) {
      processedContent.push(input.slice(currentIndex, match.index));
    }

    // push the flags wrapped in <span>
    processedContent.push(<span key={match.index} className="country-flag">{match[0]}</span>);
    
    // update the currentIndex to the position after the matched flag
    currentIndex = regex.lastIndex;
  }

  // add any remaining text after the last flag
  if (currentIndex < input.length) {
    processedContent.push(input.slice(currentIndex));
  }

  return processedContent;
};
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import type { PriceItem } from "../../types/types";

interface IExchangeRateTable {
  prices: PriceItem[];
}

const ExchangeRateTable = ({ prices }: IExchangeRateTable) => {
  const sortedCurrencies = prices.map((p) => p.currency);
  const priceMap = Object.fromEntries(prices.map((p) => [p.currency, p.price]));

  const getExchangeRate = (from: string, to: string) => {
    const fromPrice = priceMap[from];
    const toPrice = priceMap[to];
    if (!fromPrice || !toPrice) return "-";
    const rate = toPrice / fromPrice;
    return rate.toFixed(2);
  };

  return (
    <div className="mt-10 px-4 flex justify-center">
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Currency Exchange Table</h2>
        <div className="max-w-[60vw] max-h-[500px] overflow-scroll">

          <TableContainer component={Paper} className="max-w-full overflow-x-auto">
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold bg-gray-100">From / To</TableCell>
                  {sortedCurrencies.map((to) => (
                    <TableCell
                      key={to}
                      align="center"
                      className="font-bold bg-gray-100 text-xs"
                    >
                      {to}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCurrencies.map((from) => (
                  <TableRow key={from} hover>
                    <TableCell className="font-semibold bg-gray-50">{from}</TableCell>
                    {sortedCurrencies.map((to) => (
                      <TableCell key={to} align="center" className="text-green-800">
                        {getExchangeRate(from, to)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateTable;

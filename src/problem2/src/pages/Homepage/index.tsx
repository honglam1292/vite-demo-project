import { useEffect, useState } from "react";
import CurrencyInput from "../../components/CurrencyInput";
import ExchangeRateTable from "../../components/ExchangeRateTable";
import Header from "../../components/Header";
import TransferSteps from "../../components/TransferSteps";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import type { PriceItem } from "../../types/types";


const Homepage = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  useEffect(() => {
    axiosInstance
      .get<PriceItem[]>('https://interview.switcheo.com/prices.json')
      .then((res) => {
        const data = res.data;

        // Map to filter duplicate
        const latestPricesMap = new Map<string, PriceItem>();

        for (const item of data) {
          const existing = latestPricesMap.get(item.currency);
          if (!existing || new Date(item.date) > new Date(existing.date)) {
            latestPricesMap.set(item.currency, item);
          }
        }
        // Convert Map -> Array
        const list = Array.from(latestPricesMap.values());
        setFrom(list[0].currency);
        setTo(list[0].currency);
        setPrices(list);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      })
  }, []);
  console.log('prices', prices);

  return (
    <div className="bg-[#0F2500] min-h-screen w-screen text-white">
      <Header />
      <div className="h-28" />
      <CurrencyInput  {...{ from, to, prices, setFrom, setTo, amount, setAmount }} />
      <div className="h-28" />
      <ExchangeRateTable {...{ prices }} />
      <div className="h-32" />
      <TransferSteps  {...{ from, to }} />
      <div className="h-12" />
    </div>
  );
};
export default Homepage;

import { FaExchangeAlt } from "react-icons/fa";
import CurrencySelect from "../CountrySelect";
import { useMemo } from "react";
import dayjs from "dayjs";
import type { PriceItem } from "../../types/types";

type CurrencyInputProps = {
  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  prices: PriceItem[];
  amount: number;
  setAmount: (value: number) => void;
}

export default function CurrencyInput({ prices, from, to, setFrom, setTo, amount, setAmount }: CurrencyInputProps) {

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const countries = prices.map((item) => ({
    label: item.currency,
    code: item.currency,
    img: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`
  }));

  const fromPrice = useMemo(() => prices.find((p) => p.currency === from), [from, prices]);
  const toPrice = useMemo(() => prices.find((p) => p.currency === to), [to, prices]);

  const rate = useMemo(() => {
    if (!fromPrice || !toPrice) return 0;
    return toPrice.price / fromPrice.price;
  }, [fromPrice, toPrice]);



  return (
    <div className="shadow p-6 w-full max-w-5xl mx-auto">
      <div className="text-[#9FE870] font-semibold text-left">
        <div className="text-3xl mb-6">Convert {from} to {to}</div>
        <div className="text-xl mb-6"> Exchange money {from} to {to} at real exchange rate </div>

      </div>
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-5xl mx-auto">
        {/* Input section */}
        <div className="flex flex-col md:!flex-row gap-7 md:gap-4 items-center">
          <div className="flex-1 relative w-full">
            <label className="text-sm text-gray-600 mb-1 block text-left">Amount</label>
            <div className="flex items-center rounded-lg px-4 py-3 border border-black">
              <input
                type="text"
                value={Number(amount).toLocaleString()}
                onChange={(e) => {
                  setAmount(Number(e.target.value.replace(/\D/g, "")))
                }
                }
                placeholder="1,000"
                className="w-[100px] flex-1 flex-2 text-lg text-black font-semibold outline-none border-none"
              />
              <div className="w-[120px] text-black">
                <CurrencySelect countries={countries} selected={from} setSelected={setFrom} />
              </div>
            </div>
          </div>

          <div className="text-green-900 text-xl pt-4 rotate-90 md:!rotate-0">
            <FaExchangeAlt />
          </div>

          <div className="flex-1 -mt-5 md:mt-0 w-full">
            <label className="text-sm text-gray-600 mb-1 block text-left">Convert To</label>
            <div className="flex items-center rounded-lg px-4 py-3 border border-black">
              <input
                type="text"
                value={amount * rate}
                className="w-[100px] flex-1 flex-2 text-lg text-black font-semibold outline-none border-none"
              />
              <div className="w-[120px] text-black">
                <CurrencySelect countries={countries} selected={to} setSelected={setTo} />
              </div>
            </div>
          </div>
        </div>
        {/* Result text */}
        <div className="flex flex-col md:!flex-row justify-between mt-6">
          <div className="mt-2 text-lg text-black text-left">
            <p>
              <strong>1 {from} </strong>= <b></b><span className="text-green-600 font-bold">{rate} {to}</span>
            </p>
            <p className="text-sm text-gray-500">
              Exchange rate at {dayjs(new Date(fromPrice?.date || new Date())).format("YYYY-mm-DD HH:mm")}{" "}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-5 md:mt-2 justify-center md:!justify-end">
            <button onClick={handleSwap} className="bg-lime-400 text-black px-6 py-2 rounded-full font-medium cursor-pointer">
              CONFIRM SWAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

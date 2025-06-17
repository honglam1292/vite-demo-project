// ====================
// Identified Issues
// ====================

// 1. Overuse of `useMemo`
// Some memoizations are unnecessary and add complexity without real performance gain.
// Missing dependencies in memoization can also lead to bugs due to stale values.

// 2. Inefficient `.map()` usage
// Avoid running heavy calculations inside `.map()`. Move them outside or memoize them if needed.

// 3. Improper or missing `key` props
// Using array indexes or omitting keys in list rendering may cause re-rendering issues.
// Always use a unique and stable key (like balance.id).

// 4. Inline function declarations
// Inline functions in JSX (ex: onClick={() => ...}) create new references on each render,
// potentially triggering unnecessary re-renders in child components.

// 5. Unclear logic and conditional rendering
// Some conditions may produce unexpected output (ex: rendering `0` when the list is empty).
// Use explicit and clear conditions instead.

// 6. Usage of `any` type
// Avoid using `any`. Define proper interfaces or types for stronger type safety and better readability.

// 7. Mixed logic and rendering
// Mixing data processing and JSX makes code harder to read and maintain.
// Separate logic into constants, helper functions, or useMemo where applicable.



interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Prioritize blockchains
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // Filter and sort balances by blockchain priority
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  // Format balances with `.toFixed()`
  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  }, [sortedBalances]);

  // Render wallet rows
  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      const usdValue = prices[balance.currency] * balance.amount || 0;
      return (
        <WalletRow
          className="wallet-row"
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
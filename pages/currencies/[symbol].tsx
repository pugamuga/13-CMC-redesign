import axios from "axios";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const coinGeckoUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

export const getStaticPaths = async () => {
  const responce = await fetch(coinGeckoUrl);
  const data = await responce.json();

  const paths = data.map((coin: MainCoinData) => {
    return {
      params: { symbol: coin.symbol },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    if (context.params?.symbol) {
      const responce = await fetch(coinGeckoUrl);
      const data = await responce.json();

      const coinData = context.params.symbol;

      if (data) {
        const arrayCoinsCheck: MainCoinData = data?.filter(
          (coin: MainCoinData) => coin.symbol === coinData
        );

        return {
          props: { coin: arrayCoinsCheck },
        };
      }
    }
  } catch (error) {
    return null;
  }
};

interface IProps {
  coin: MainCoinData[];
}

export default function CoinPage({ coin }: IProps): JSX.Element {
  console.log(coin)
  if (coin) {
    return (
      <div>
        <Link href={"/"}>
          <div className=" flex items-center cursor-pointer space-x-2">
            <IoIosArrowRoundBack className="text-xl" />
            <p>Back</p>
          </div>
        </Link>
        <div>
          <p>{coin[0]?.name}</p>
          <p>{coin[0]?.current_price}</p>
        </div>
      </div>
    );
  }
  return <div>Error Api</div>;
}

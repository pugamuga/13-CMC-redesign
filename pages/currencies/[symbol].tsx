import axios from "axios";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";
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
  if (context.params?.symbol) {
    const symbol = context.params.symbol;

    return {
      props: { coin: symbol },
    };
  }
};

export default function CoinPage({ coin }: any): JSX.Element {
  return (
    <div>
      <Link href={"/"}>
        <div className=" flex items-center cursor-pointer space-x-2">
          <IoIosArrowRoundBack className="text-xl" />
          <p>Back</p>
        </div>
      </Link>
      <div>
        <p>{coin}</p>
      </div>
    </div>
  );
}

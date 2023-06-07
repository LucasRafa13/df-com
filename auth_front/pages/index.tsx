// pages/index.tsx
import { GetServerSideProps } from "next";

export default function HomePage() {
  return <div>Welcome to Home Page</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

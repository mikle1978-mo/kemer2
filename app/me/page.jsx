import Profile from "@/components/auth/Profile";
import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const ProfilePage = async () => {

  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });

  return <Profile addresses={data?.addresses} />;
};

export default ProfilePage;

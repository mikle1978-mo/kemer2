import Profile from "@/components/auth/Profile";
import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const ProfilePage = async () => {

  const nextCookies = cookies();
  console.log("page me front cokies================:", nextCookies);
  const cookieName = getCookieName();
  console.log("page me front================:", cookieName);
  const nextAuthSessionToken = nextCookies.get(cookieName);
  console.log("page me front nextAuthSessionToken================:", nextAuthSessionToken);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });

  return <Profile addresses={data?.addresses} />;
};

export default ProfilePage;

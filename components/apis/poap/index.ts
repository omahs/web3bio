const AUTHENTICATION = process.env.NEXT_PUBLIC_POAP_API_KEY;
export const POAP_END_POINT = "https://api.poap.tech/actions/scan/";
export const POAPFetcher = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-api-key": AUTHENTICATION || "",
      },
    });
    if (res.status != 200) return [];
    return res.json();
  } catch (e) {
    return [];
  }
};

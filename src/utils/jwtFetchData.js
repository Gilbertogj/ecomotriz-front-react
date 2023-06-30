export const jwtFetchData = async (
  url,
  refreshUrl,
  token,
  refreshToken,
  dispatchFn,
  setCurrentUserFn,
  isLoadingState,
  setIsLoadingFn
) => {
  try {
    if (setIsLoadingFn) {
      if (!isLoadingState) {
        setIsLoadingFn(true);
      }
    }

    let data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let json = await data.json();

    if (data.status === 401) {
      let data2 = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      let json2 = await data2.json();

      if (data2.status === 200) {
        let data3 = await fetch(url, {
          headers: {
            Authorization: `Bearer ${json2.access}`,
          },
        });

        let json3 = await data3.json();

        dispatchFn(
          setCurrentUserFn({ access: json2.access, refresh: refreshToken })
        );

        return json3;
      }
    }

    return json;
  } catch (err) {
    console.log("error", err);
    alert(err);
  }
};

export const fetchData = async (
  url,
  token,
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
        Authorization: `Token ${token}`,
      },
    });

    let json = await data.json();

    // if (json.expired) {
    //   dispatchFn(setCurrentUserFn({ token: json.token }));

    //   data = await fetch(url, {
    //     headers: {
    //       // Authorization: `Token ${json.token}`,
    //     },
    //   });

    //   json = await data.json();
    // }

    return json;
  } catch (err) {
    console.log("error", err);
    alert(err);
  }
};

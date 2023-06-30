import { useMediaQuery } from "react-responsive";

export const useIsDesktop = () => {
  return useMediaQuery({
    query: "(min-width: 768px)",
  });
};

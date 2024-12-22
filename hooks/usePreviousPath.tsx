import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePreviousPath = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setPreviousPath(location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);

  useEffect(() => {
    navigate(location.pathname, { state: { from: previousPath } });
  }, [location.pathname]);

  return previousPath;
};

export default usePreviousPath;

"use client";

import React from "react";

export default function Home() {
  React.useEffect(() => {
    window.location.replace("/jobs");
  }, []);
  return undefined;
}

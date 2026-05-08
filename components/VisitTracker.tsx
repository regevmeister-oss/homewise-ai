"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    let visitorId = localStorage.getItem("homewise_visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("homewise_visitor_id", visitorId);
    }

    fetch("/api/analytics/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visitorId }),
    }).catch(() => {});
  }, []);

  return null;
}



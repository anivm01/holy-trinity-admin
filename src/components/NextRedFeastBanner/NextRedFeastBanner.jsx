import axios from "axios";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { API_URL } from "../../utilities/api";
import { useLoggedIn } from "../../utilities/LoggedInContext";
import "./NextRedFeastBanner.scss";

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatCalendarDate = (value) => {
  const calendarDate = String(value).slice(0, 10);

  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${calendarDate}T00:00:00Z`));
};

function NextRedFeastBanner() {
  const loggedIn = useLoggedIn();
  const [feast, setFeast] = useState(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const bannerRef = useRef(null);
  const titlesId = useId();

  useEffect(() => {
    if (!loggedIn) {
      setFeast(null);
      return undefined;
    }

    const abortController = new AbortController();

    const loadNextRedFeast = async () => {
      try {
        const response = await axios.get(`${API_URL}/calendar/next-red`, {
          params: { datetime: getLocalDate() },
          signal: abortController.signal,
        });

        setFeast(response.data);
        setIsExpanded(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setFeast(null);
        }
      }
    };

    loadNextRedFeast();

    return () => abortController.abort();
  }, [loggedIn]);

  useLayoutEffect(() => {
    const banner = bannerRef.current;

    if (!banner) {
      setBannerHeight(0);
      return undefined;
    }

    const updateBannerHeight = () => {
      setBannerHeight(banner.getBoundingClientRect().height);
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateBannerHeight);

    updateBannerHeight();
    resizeObserver?.observe(banner);
    window.addEventListener("resize", updateBannerHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateBannerHeight);
    };
  }, [feast, isExpanded]);

  if (!loggedIn || !feast) {
    return null;
  }

  return (
    <div className="next-red-feast-slot" style={{ height: bannerHeight }}>
      <aside
        className="next-red-feast"
        ref={bannerRef}
        aria-label="Next red feast"
      >
        <time
          className="next-red-feast__date"
          dateTime={String(feast.date).slice(0, 10)}
        >
          {formatCalendarDate(feast.date)}
        </time>
        <span
          className="next-red-feast__titles"
          id={titlesId}
          data-expanded={isExpanded}
        >
          <strong lang="en">
            <span>{feast.title || "Untitled feast"}</span>
          </strong>
          <strong lang="bg">
            <span>{feast.title_bg || "Без заглавие"}</span>
          </strong>
        </span>
        <button
          className="next-red-feast__toggle"
          type="button"
          aria-controls={titlesId}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse feast details" : "Expand feast details"}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span aria-hidden="true" />
        </button>
      </aside>
    </div>
  );
}

export default NextRedFeastBanner;

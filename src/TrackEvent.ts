import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

export function RecordEvent(
  eventName: string,
  eventBody: { [parameterName: string]: string }
) {
  // Guard for environments where Analytics isn't available (e.g., tests, SSR)
  isSupported()
    .then((supported) => {
      if (!supported) return;
      try {
        const analytics = getAnalytics();
        logEvent(analytics, eventName, {
          app_name: "Longwave",
          screen_name: "index",
          ...eventBody,
        } as any);
      } catch {
        // Silently ignore analytics errors
      }
    })
    .catch(() => {
      // Ignore if the capability check itself fails
    });
}

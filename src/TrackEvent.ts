import { getAnalytics, logEvent } from "firebase/analytics";
import { getApps } from "firebase/app";

export function RecordEvent(
  eventName: string,
  eventBody: { [parameterName: string]: string }
) {
  // Only initialize analytics if there's an app initialized
  if (getApps().length > 0) {
    const analytics = getAnalytics();
    logEvent(analytics, eventName as any, {
      app_name: "Longwave",
      screen_name: "index",
      ...eventBody,
    } as any);
  }
}

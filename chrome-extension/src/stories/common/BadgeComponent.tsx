import { Badge } from "../../contentScript/Badge";
import { SafetyRating } from "../../types";
import { useEffect, useMemo } from "react";

interface BadgeProps {
  safetyRating: Exclude<SafetyRating, SafetyRating.Blocked>;
}

/**
 * Implement Badge as a React Component
 */
export function BadgeComponent({ safetyRating }: BadgeProps) {
  const badge = useMemo(() => new Badge(), []);

  useEffect(() => {
    badge.mount();
    badge.setVisibility(true);

    return () => badge.unmount();
  }, [badge]);

  useEffect(() => {
    badge.setSafetyRating(safetyRating);
  }, [badge, safetyRating]);

  return null;
}

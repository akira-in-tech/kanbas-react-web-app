import * as client from "./client";
import { ReactNode, useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch {
      dispatch(setCurrentUser(null));
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!pending) {
    return <>{children}</>;
  }
  return (
    <div className="p-4" role="status" aria-live="polite">
      Loading your workspace…
    </div>
  );
}

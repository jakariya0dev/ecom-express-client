import { Suspense } from "react";

export default function layout({ children }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {children}
    </Suspense>
  );
}

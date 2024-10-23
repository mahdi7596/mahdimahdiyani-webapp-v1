import { Suspense } from "react";

import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={routes} />
      </Suspense>
    </div>
  );
}

export default App;

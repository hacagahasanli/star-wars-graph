import { type FC, lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Fallback from "~/shared/ui/Fallback/Fallback";
import AppLayout from "~/shared/layouts/AppLayout/AppLayout";

import Paths from "~/resources/constants/Paths";

const ListStarwars = lazy(
  () => import("~/modules/starwars/listStarwars/ListStarwars")
);
const DetailStarwars = lazy(
  () => import("~/modules/starwars/detailStarwars/DetailsStarwars")
);

const AppRouting: FC = () => {
  return (
    <AppLayout>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route index path={Paths.LIST_STARWARS} element={<ListStarwars />} />
          <Route
            element={<ListStarwars />}
            path={Paths.LIST_STARWARS_GENERIC}
          />
          <Route
            element={<DetailStarwars />}
            path={`${Paths.LIST_STARWARS_GENERIC}/:id`}
          />

          <Route
            index
            element={<Navigate to={Paths.LIST_STARWARS} replace />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default AppRouting;

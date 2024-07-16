import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  useNavigate,
} from '@tanstack/react-router';

export function useFilters<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T,
) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const filters = routeApi.useSearch();

  const setFilters = (partialFilters: Partial<typeof filters>) =>
    navigate({
      search: (prev) => ({ ...prev, ...partialFilters }),
    });
  const resetFilters = () => navigate({ search: {} });

  return { filters, setFilters, resetFilters };
}

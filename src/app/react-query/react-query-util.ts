import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

// 공통 useQuery 함수
export const useCustomQuery = <TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> // options 타입 수정
) => {
  if (!queryKey || !Array.isArray(queryKey)) {
    throw new Error("queryKey가 필요하며 배열이어야 합니다.");
  }

  if (!queryFn) {
    throw new Error("queryFn이 필요하며 함수이어야 합니다.");
  }

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};

// 공통 useMutation 함수
export const useCustomMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKeysToInvalidate: QueryKey[] = [],
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  > // options 타입 수정
) => {
  if (!mutationFn) {
    throw new Error("mutationFn이 필요하며 함수이어야 합니다.");
  }

  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
    onSuccess: async (
      data: TData,
      variables: TVariables,
      context: TContext
    ) => {
      for (const key of queryKeysToInvalidate) {
        await queryClient.invalidateQueries({ queryKey: key });
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### lodge_settings

| name              | type    | format  | required |
|-------------------|---------|---------|----------|
| id                | bigint  | integer | true     |
| lodgeName         | text    | string  | true     |
| standardRoomPrice | text    | string  | false    |
| deluxeRoomPrice   | text    | string  | false    |
| suiteRoomPrice    | text    | string  | false    |
| email             | text    | string  | false    |
| location          | text    | string  | false    |
*/

export const useLodgeSettings = () => useQuery({
  queryKey: ['lodgeSettings'],
  queryFn: () => fromSupabase(supabase.from('lodge_settings').select('*').single()),
});

export const useUpdateLodgeSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateData) => fromSupabase(supabase.from('lodge_settings').update(updateData).eq('id', 1)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lodgeSettings'] });
    },
  });
};
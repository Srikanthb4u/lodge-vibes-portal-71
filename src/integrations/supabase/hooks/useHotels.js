import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### Hotels

| name        | type                       | format  | required |
|-------------|----------------------------|---------|----------|
| hotel_id    | bigint                     | integer | true     |
| created_at  | timestamp with time zone   | string  | true     |
| name        | text                       | string  | false    |
| location    | text                       | string  | false    |
| latitude    | double precision           | number  | false    |
| longitude   | double precision           | number  | false    |
| description | text                       | string  | false    |
| updated_at  | timestamp with time zone   | string  | false    |
*/

export const useHotel = (hotelId) => useQuery({
  queryKey: ['hotels', hotelId],
  queryFn: () => fromSupabase(supabase.from('Hotels').select('*').eq('hotel_id', hotelId).single()),
});

export const useHotels = () => useQuery({
  queryKey: ['hotels'],
  queryFn: () => fromSupabase(supabase.from('Hotels').select('*')),
});

export const useAddHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newHotel) => fromSupabase(supabase.from('Hotels').insert([newHotel])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
  });
};

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ hotel_id, ...updateData }) => fromSupabase(supabase.from('Hotels').update(updateData).eq('hotel_id', hotel_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
  });
};

export const useDeleteHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hotelId) => fromSupabase(supabase.from('Hotels').delete().eq('hotel_id', hotelId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
  });
};
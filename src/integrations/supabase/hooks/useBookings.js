import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### Bookings

| name           | type                        | format    | required |
|----------------|---------------------------|-----------|----------|
| booking_id     | bigint                    | integer   | true     |
| created_at     | timestamp with time zone  | string    | true     |
| user_id        | bigint                    | integer   | false    |
| room_id        | bigint                    | integer   | false    |
| check_in_date  | timestamp without time zone | string  | false    |
| check_out_date | timestamp without time zone | string  | false    |
| total_price    | double precision          | number    | false    |
| status         | boolean                   | boolean   | false    |
| updated_at     | timestamp with time zone  | string    | false    |

Foreign Key Relationships:
- user_id references Users.user_id
- room_id references Rooms.room_id
*/

export const useBooking = (bookingId) => useQuery({
  queryKey: ['bookings', bookingId],
  queryFn: () => fromSupabase(supabase.from('Bookings').select('*').eq('booking_id', bookingId).single()),
});

export const useBookings = () => useQuery({
  queryKey: ['bookings'],
  queryFn: () => fromSupabase(supabase.from('Bookings').select('*')),
});

export const useAddBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBooking) => fromSupabase(supabase.from('Bookings').insert([newBooking])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ booking_id, ...updateData }) => fromSupabase(supabase.from('Bookings').update(updateData).eq('booking_id', booking_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId) => fromSupabase(supabase.from('Bookings').delete().eq('booking_id', bookingId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
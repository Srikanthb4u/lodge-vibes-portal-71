import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### booking_enquiries

| name           | type                        | format    | required |
|----------------|---------------------------|-----------|----------|
| id             | integer                   | integer   | true     |
| check_in       | timestamp with time zone  | string    | true     |
| check_out      | timestamp with time zone  | string    | false    |
| guests         | integer                   | integer   | false    |
| room_type      | text                      | string    | false    |
| mobile_number  | text                      | string    | false    |
| status         | text                      | string    | false    |
| created_at     | timestamp with time zone  | string    | false    |
*/

export const useBookingEnquiry = (id) => useQuery({
  queryKey: ['bookingEnquiries', id],
  queryFn: () => fromSupabase(supabase.from('booking_enquiries').select('*').eq('id', id).single()),
});

export const useBookingEnquiries = () => useQuery({
  queryKey: ['bookingEnquiries'],
  queryFn: () => fromSupabase(supabase.from('booking_enquiries').select('*')),
});

export const useAddBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEnquiry) => fromSupabase(supabase.from('booking_enquiries').insert([newEnquiry])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};

export const useUpdateBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('booking_enquiries').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};

export const useDeleteBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('booking_enquiries').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};
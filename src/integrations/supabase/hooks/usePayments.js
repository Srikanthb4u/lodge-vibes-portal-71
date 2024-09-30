import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### payment_id

| name           | type                        | format    | required |
|----------------|---------------------------|-----------|----------|
| payment_id     | bigint                    | integer   | true     |
| created_at     | timestamp with time zone  | string    | true     |
| booking_id     | bigint                    | integer   | false    |
| amount         | real                      | number    | false    |
| payment_method | text                      | string    | false    |
| status         | boolean                   | boolean   | false    |
| updated_at     | timestamp with time zone  | string    | false    |

Foreign Key Relationships:
- booking_id references Bookings.booking_id
*/

export const usePayment = (paymentId) => useQuery({
  queryKey: ['payments', paymentId],
  queryFn: () => fromSupabase(supabase.from('payment_id').select('*').eq('payment_id', paymentId).single()),
});

export const usePayments = () => useQuery({
  queryKey: ['payments'],
  queryFn: () => fromSupabase(supabase.from('payment_id').select('*')),
});

export const useAddPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPayment) => fromSupabase(supabase.from('payment_id').insert([newPayment])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payment_id, ...updateData }) => fromSupabase(supabase.from('payment_id').update(updateData).eq('payment_id', payment_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId) => fromSupabase(supabase.from('payment_id').delete().eq('payment_id', paymentId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};
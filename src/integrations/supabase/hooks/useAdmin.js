import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### Admin

| name       | type                      | format  | required |
|------------|---------------------------|---------|----------|
| id         | integer                   | integer | true     |
| created_at | timestamp with time zone  | string  | true     |
| Password   | text                      | string  | false    |
*/

export const useAdmin = (adminId) => useQuery({
  queryKey: ['admin', adminId],
  queryFn: () => fromSupabase(supabase.from('Admin').select('*').eq('id', adminId).single()),
});

export const useAdmins = () => useQuery({
  queryKey: ['admins'],
  queryFn: () => fromSupabase(supabase.from('Admin').select('*')),
});

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAdmin) => fromSupabase(supabase.from('Admin').insert([newAdmin])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('Admin').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId) => fromSupabase(supabase.from('Admin').delete().eq('id', adminId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};
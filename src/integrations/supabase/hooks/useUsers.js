import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### Users

| name          | type                      | format  | required |
|---------------|---------------------------|---------|----------|
| user_id       | bigint                    | integer | true     |
| created_at    | timestamp with time zone  | string  | true     |
| username      | text                      | string  | false    |
| password_hash | text                      | string  | false    |
| email         | text                      | string  | false    |
| first_name    | text                      | string  | false    |
| last_name     | text                      | string  | false    |
| phone_number  | text                      | string  | false    |
| updated_at    | timestamp with time zone  | string  | false    |
*/

export const useUser = (userId) => useQuery({
  queryKey: ['users', userId],
  queryFn: () => fromSupabase(supabase.from('Users').select('*').eq('user_id', userId).single()),
});

export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: () => fromSupabase(supabase.from('Users').select('*')),
});

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => fromSupabase(supabase.from('Users').insert([newUser])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, ...updateData }) => fromSupabase(supabase.from('Users').update(updateData).eq('user_id', user_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => fromSupabase(supabase.from('Users').delete().eq('user_id', userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
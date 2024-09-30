import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### Rooms

| name            | type                      | format  | required |
|-----------------|---------------------------|---------|----------|
| room_id         | bigint                    | integer | true     |
| created_at      | timestamp with time zone  | string  | true     |
| hotel_id        | bigint                    | integer | false    |
| room_number     | smallint                  | integer | false    |
| room_type       | text                      | string  | false    |
| description     | text                      | string  | false    |
| price_per_night | real                      | number  | false    |
| capacity        | smallint                  | integer | false    |
| amenities       | text                      | string  | false    |
| updated_at      | timestamp with time zone  | string  | false    |

Foreign Key Relationships:
- hotel_id references lodge_settings.id
*/

export const useRoom = (roomId) => useQuery({
  queryKey: ['rooms', roomId],
  queryFn: () => fromSupabase(supabase.from('Rooms').select('*').eq('room_id', roomId).single()),
});

export const useRooms = () => useQuery({
  queryKey: ['rooms'],
  queryFn: () => fromSupabase(supabase.from('Rooms').select('*')),
});

export const useAddRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRoom) => fromSupabase(supabase.from('Rooms').insert([newRoom])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ room_id, ...updateData }) => fromSupabase(supabase.from('Rooms').update(updateData).eq('room_id', room_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roomId) => fromSupabase(supabase.from('Rooms').delete().eq('room_id', roomId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
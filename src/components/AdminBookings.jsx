import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBookings, updateBookingStatus } from '../utils/firebaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminBookings = () => {
  const queryClient = useQueryClient();
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      toast.success("Booking status updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating booking status: ${error.message}`);
    },
  });

  const handleApprove = (id) => {
    updateStatusMutation.mutate({ id, status: 'approved' });
  };

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
              <TableCell>{booking.guests}</TableCell>
              <TableCell>{booking.roomType}</TableCell>
              <TableCell>{booking.mobileNumber}</TableCell>
              <TableCell>
                <Badge variant={booking.status === 'approved' ? 'success' : 'warning'}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                {booking.status === 'pending' && (
                  <Button onClick={() => handleApprove(booking.id)}>
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookings;
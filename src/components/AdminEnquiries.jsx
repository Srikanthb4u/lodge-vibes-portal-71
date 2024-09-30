import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useBookingEnquiries, useUpdateBookingEnquiry } from '../hooks/useBookingEnquiries';

const AdminEnquiries = () => {
  const { data: enquiries, isLoading, error } = useBookingEnquiries();
  const updateEnquiryMutation = useUpdateBookingEnquiry();

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateEnquiryMutation.mutateAsync({ id, status: newStatus });
      toast.success(`Enquiry status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update enquiry status");
    }
  };

  if (isLoading) return <div>Loading enquiries...</div>;
  if (error) return <div>Error loading enquiries: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Booking Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell>{new Date(enquiry.check_in).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(enquiry.check_out).toLocaleDateString()}</TableCell>
                <TableCell>{enquiry.guests}</TableCell>
                <TableCell>{enquiry.room_type}</TableCell>
                <TableCell>{enquiry.mobile_number}</TableCell>
                <TableCell>{enquiry.status}</TableCell>
                <TableCell>
                  {enquiry.status === 'pending' && (
                    <>
                      <Button onClick={() => handleUpdateStatus(enquiry.id, 'approved')} className="mr-2">
                        Approve
                      </Button>
                      <Button onClick={() => handleUpdateStatus(enquiry.id, 'rejected')} variant="destructive">
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminEnquiries;
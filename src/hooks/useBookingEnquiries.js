import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const bookingEnquiriesCollection = collection(db, 'booking_enquiries');

export const useBookingEnquiries = () => useQuery({
  queryKey: ['bookingEnquiries'],
  queryFn: async () => {
    const snapshot = await getDocs(bookingEnquiriesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
});

export const useAddBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newEnquiry) => {
      const docRef = await addDoc(bookingEnquiriesCollection, newEnquiry);
      return { id: docRef.id, ...newEnquiry };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};

export const useUpdateBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const docRef = doc(db, 'booking_enquiries', id);
      await updateDoc(docRef, updateData);
      return { id, ...updateData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};

export const useDeleteBookingEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const docRef = doc(db, 'booking_enquiries', id);
      await deleteDoc(docRef);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingEnquiries'] });
    },
  });
};
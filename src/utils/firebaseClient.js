import { db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, getDocs, updateDoc, addDoc, query, orderBy } from 'firebase/firestore';

const createLodgeSettingsDocument = async () => {
  const lodgeSettingsRef = doc(db, 'lodge_settings', 'settings');
  const docSnap = await getDoc(lodgeSettingsRef);

  if (!docSnap.exists()) {
    await setDoc(lodgeSettingsRef, {
      lodgeName: 'Urban Lodge',
      standardRoomPrice: '2999',
      deluxeRoomPrice: '4999',
      suiteRoomPrice: '7999',
      email: 'bookings@ourlodge.com',
      location: '123 Nature Drive, Scenic Valley, SV 12345',
      contactNumber: '+91 98765 43210'
    });
  }
};

export const saveLodgeSettings = async (settings) => {
  await createLodgeSettingsDocument();
  const lodgeSettingsRef = doc(db, 'lodge_settings', 'settings');
  await setDoc(lodgeSettingsRef, settings, { merge: true });
  return settings;
};

export const getLodgeSettings = async () => {
  await createLodgeSettingsDocument();
  const lodgeSettingsRef = doc(db, 'lodge_settings', 'settings');
  const docSnap = await getDoc(lodgeSettingsRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const fetchEnquiries = async () => {
  const enquiriesRef = collection(db, 'booking_enquiries');
  const querySnapshot = await getDocs(enquiriesRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateEnquiryStatus = async (id, newStatus) => {
  const enquiryRef = doc(db, 'booking_enquiries', id);
  await updateDoc(enquiryRef, { status: newStatus });
  const updatedDoc = await getDoc(enquiryRef);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const addBooking = async (bookingData) => {
  const bookingsRef = collection(db, 'bookings');
  const docRef = await addDoc(bookingsRef, {
    ...bookingData,
    createdAt: new Date(),
    status: 'pending'
  });
  return docRef.id;
};

export const fetchBookings = async () => {
  const bookingsRef = collection(db, 'bookings');
  const q = query(bookingsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateBookingStatus = async ({ id, status }) => {
  const bookingRef = doc(db, 'bookings', id);
  await updateDoc(bookingRef, { status });
  const updatedDoc = await getDoc(bookingRef);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};
import { db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, getDocs, updateDoc } from 'firebase/firestore';

const createLodgeSettingsDocument = async () => {
  const lodgeSettingsRef = doc(db, 'lodge_settings', 'settings');
  const docSnap = await getDoc(lodgeSettingsRef);

  if (!docSnap.exists()) {
    await setDoc(lodgeSettingsRef, {
      lodgeName: 'Urban Lodge',
      standardRoomPrice: '99',
      deluxeRoomPrice: '149',
      suiteRoomPrice: '249',
      email: 'bookings@ourlodge.com',
      location: '123 Nature Drive, Scenic Valley, SV 12345'
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
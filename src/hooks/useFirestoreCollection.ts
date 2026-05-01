import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirestoreCollection<T>(collectionName: string, initialData: T[], ...constraints: QueryConstraint[]) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching ${collectionName}:`, error);
      setLoading(false);
    });
  }, [collectionName]);

  return { data, loading };
}


'use client';

import { useState, useEffect } from 'react';
import { 
  Query, 
  onSnapshot, 
  QuerySnapshot, 
  DocumentData,
  FirestoreError 
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!query) {
      if (isMounted) {
        setLoading(false);
        setData(null);
      }
      return;
    }

    if (isMounted) setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        if (!isMounted) return;
        const items = snapshot.docs.map((doc) => ({
          ...(doc.data() as any),
          id: doc.id,
        }));
        setData(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        if (!isMounted) return;
        
        // Contextual path for debugging
        const path = 'projects'; 
        
        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        } satisfies SecurityRuleContext);

        // Only emit if it's a real permission error
        if (err.code === 'permission-denied') {
          errorEmitter.emit('permission-error', permissionError);
        }
        
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [query]);

  return { data, loading, error };
}

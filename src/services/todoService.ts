import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Todo } from '../types/Todo';

const COLLECTION_NAME = 'todos';
const todoCollection = collection(db, COLLECTION_NAME);

// Convertir de Firestore a nuestro modelo
const convertFromFirestore = (doc: QueryDocumentSnapshot<DocumentData>): Todo => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    completed: data.completed,
    createdAt: data.createdAt?.toDate() || new Date()
  };
};

// Obtener todos los todos
export const getTodos = async (): Promise<Todo[]> => {
  const q = query(todoCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(convertFromFirestore);
};

// Crear un nuevo todo
export const createTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(todoCollection, {
    ...todo,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Actualizar un todo existente
export const updateTodo = async (id: string, data: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

// Eliminar un todo
export const deleteTodo = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}; 
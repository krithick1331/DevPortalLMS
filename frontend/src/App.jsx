import PracticeLessonViewer from './components/PracticeLessonViewer';
import { navbarLesson } from './data/practiceLessons';

export default function App() {
  return (
    <PracticeLessonViewer
      lesson={navbarLesson}
      onBack={() => console.log('Back')}
    />
  );
}

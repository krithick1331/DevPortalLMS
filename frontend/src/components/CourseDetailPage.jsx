import Layout from './Layout';
import { courses } from '../data/courses';

export default function CourseDetailPage({ courseId, onSelectLesson, onBack, onNavigate }) {
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <Layout currentPage='courses'>
        <div className='max-w-7xl mx-auto p-8'>
          <p>Course not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage='courses'>
      <div className='max-w-7xl mx-auto p-8'>
        <h1 className='text-2xl font-bold mb-4'>{course.title}</h1>
        <ul className='space-y-3'>
          {course.lessons?.map(l => (
            <li key={l.id}>
              <button onClick={() => onSelectLesson(courseId, l.id)} className='text-left text-blue-600 underline'>
                {l.orderIndex}. {l.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}


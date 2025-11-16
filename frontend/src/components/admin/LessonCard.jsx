export default function LessonCard({ lesson, onEdit, onDelete }) {
    return (
        <div className="bg-white p-4 rounded shadow-sm border flex justify-between items-start">
            <div>
                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.id} • {lesson.courseId}</p>
                <p className="mt-2 text-gray-700 text-sm">{lesson.instructions?.slice(0, 150) || ''}</p>
            </div>
            <div className="flex flex-col gap-2">
                <button onClick={onEdit} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
        </div>
    );
}

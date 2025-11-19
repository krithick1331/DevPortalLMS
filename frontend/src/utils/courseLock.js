// frontend/src/utils/courseLock.js

import courses from '../data/courses';

/**
 * Check if a course is unlocked for the user
 * @param {string} courseId - The course to check
 * @param {object} userProgress - User's progress data
 * @returns {boolean} - True if course is unlocked
 */
export const isCourseUnlocked = (courseId, userProgress) => {
    // ITES (Course 1) is always unlocked
    if (courseId === 'ites') return true;

    // Get course definition
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.prerequisites) return false;

    const completedLessons = userProgress.completedLessons || [];

    // Check each prerequisite course for 100% completion
    return course.prerequisites.every(prereqId => {
        const prereqCourse = courses.find(c => c.id === prereqId);
        if (!prereqCourse) return false;

        const prereqLessonIds = prereqCourse.lessons.map(l => l.id);

        // All lessons in prerequisite course must be completed
        return prereqLessonIds.every(lessonId => completedLessons.includes(lessonId));
    });
};

/**
 * Get course unlock status with reason
 * @param {string} courseId
 * @param {object} userProgress
 * @returns {object} - { unlocked: boolean, reason: string }
 */
export const getCourseStatus = (courseId, userProgress) => {
    if (courseId === 'ites') {
        return {
            unlocked: true,
            reason: 'Foundation course - always accessible'
        };
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) {
        return { unlocked: false, reason: 'Course not found' };
    }

    const isUnlocked = isCourseUnlocked(courseId, userProgress);

    if (isUnlocked) {
        return { unlocked: true, reason: 'Unlocked' };
    }

    // Find which prerequisite is not completed
    const incompletePrerequisite = course.prerequisites?.find(prereqId => {
        const prereqCourse = courses.find(c => c.id === prereqId);
        if (!prereqCourse) return true;

        const completedLessons = userProgress.completedLessons || [];
        const prereqLessonIds = prereqCourse.lessons.map(l => l.id);

        return !prereqLessonIds.every(lessonId => completedLessons.includes(lessonId));
    });

    const prerequisiteCourse = courses.find(c => c.id === incompletePrerequisite);

    return {
        unlocked: false,
        reason: `Complete ${prerequisiteCourse?.title || 'previous course'} (all lessons) to unlock`
    };
};

/**
 * Get overall progress statistics
 * @param {object} userProgress
 * @returns {object} - Statistics object
 */
export const getProgressStats = (userProgress) => {
    const completedLessons = userProgress.completedLessons || [];

    const stats = {
        totalLessons: 0,
        completedLessons: completedLessons.length,
        courseStats: {},
        unlockedCourses: 0
    };

    courses.forEach(course => {
        stats.totalLessons += course.lessonsCount;

        const courseCompleted = completedLessons.filter(id =>
            course.lessons.some(lesson => lesson.id === id)
        ).length;

        const isUnlocked = isCourseUnlocked(course.id, userProgress);
        if (isUnlocked) stats.unlockedCourses++;

        stats.courseStats[course.id] = {
            total: course.lessonsCount,
            completed: courseCompleted,
            percentage: (courseCompleted / course.lessonsCount) * 100,
            unlocked: isUnlocked
        };
    });

    stats.overallPercentage = (stats.completedLessons / stats.totalLessons) * 100;

    return stats;
};

/**
 * Check if user can access a specific lesson
 * @param {string} lessonId
 * @param {object} userProgress
 * @returns {boolean}
 */
export const canAccessLesson = (lessonId, userProgress) => {
    // Find which course the lesson belongs to
    const course = courses.find(c =>
        c.lessons.some(lesson => lesson.id === lessonId)
    );

    if (!course) return false;

    // Check if course is unlocked
    if (!isCourseUnlocked(course.id, userProgress)) return false;

    // Check if previous lesson in same course is completed (sequential unlocking within course)
    const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true; // First lesson always accessible if course is unlocked

    const previousLesson = course.lessons[lessonIndex - 1];
    const completedLessons = userProgress.completedLessons || [];

    return completedLessons.includes(previousLesson.id);
};

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    Users,
    Award,
    BookOpen,
    TrendingUp,
    Search,
    Eye,
    Lock,
    Unlock,
    Trash2,
    RefreshCw,
    UserPlus,
    LogOut,
    BarChart3,
    Clock
} from 'lucide-react';

export default function AdminDashboard() {
    const { user, logout, token } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [students, setStudents] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch analytics
            const analyticsRes = await fetch('http://localhost:3000/api/admin/analytics', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const analyticsData = await analyticsRes.json();
            setAnalytics(analyticsData);

            // Fetch students
            const studentsRes = await fetch('http://localhost:3000/api/admin/students', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const studentsData = await studentsRes.json();
            setStudents(studentsData.students || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (studentId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/students/${studentId}/toggle`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                fetchData();
                alert('Student status updated');
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
            alert('Failed to update status');
        }
    };

    const handleDeleteStudent = async (studentId) => {
        if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/admin/students/${studentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                fetchData();
                alert('Student deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete student:', error);
            alert('Failed to delete student');
        }
    };

    const handleResetPassword = async (studentId) => {
        const newPassword = prompt('Enter new password (min 6 characters):');
        if (!newPassword || newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/admin/students/${studentId}/reset-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword })
            });

            if (res.ok) {
                alert('Password reset successfully');
            }
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert('Failed to reset password');
        }
    };

    const handleViewDetails = async (studentId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/students/${studentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setSelectedStudent(data);
            setActiveTab('student-detail');
        } catch (error) {
            console.error('Failed to fetch student details:', error);
        }
    };

    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">ADMIN</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">DEV-Portal Admin</h1>
                                <p className="text-xs text-gray-500">Dashboard & Student Management</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 border-b -mb-px">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeTab === 'overview'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeTab === 'students'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Students
                        </button>
                        <button
                            onClick={() => setActiveTab('create-user')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeTab === 'create-user'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Create User
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <OverviewTab analytics={analytics} students={students} />
                )}

                {activeTab === 'students' && (
                    <StudentsTab
                        students={filteredStudents}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteStudent}
                        onResetPassword={handleResetPassword}
                        onViewDetails={handleViewDetails}
                    />
                )}

                {activeTab === 'create-user' && (
                    <CreateUserTab token={token} onUserCreated={fetchData} />
                )}

                {activeTab === 'student-detail' && selectedStudent && (
                    <StudentDetailTab student={selectedStudent} onBack={() => setActiveTab('students')} />
                )}
            </main>
        </div>
    );
}

// ============================================
// OVERVIEW TAB
// ============================================
function OverviewTab({ analytics, students }) {
    const stats = [
        {
            label: 'Total Students',
            value: analytics?.totalStudents || 0,
            icon: Users,
            color: 'blue'
        },
        {
            label: 'Active Students',
            value: analytics?.activeStudents || 0,
            icon: TrendingUp,
            color: 'green'
        },
        {
            label: 'Total Submissions',
            value: analytics?.totalSubmissions || 0,
            icon: BookOpen,
            color: 'purple'
        },
        {
            label: 'Today\'s Submissions',
            value: analytics?.todaySubmissions || 0,
            icon: Clock,
            color: 'orange'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Registered Students</h2>
                <div className="space-y-3">
                    {students.slice(0, 5).map(student => (
                        <div key={student._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-700 font-semibold text-sm">
                                        {student.firstName[0]}{student.lastName[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                                    <p className="text-sm text-gray-500">{student.email}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{student.points} points</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(student.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// STUDENTS TAB
// ============================================
function StudentsTab({
    students,
    searchQuery,
    setSearchQuery,
    onToggleStatus,
    onDelete,
    onResetPassword,
    onViewDetails
}) {
    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Points
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-700 font-semibold text-sm">
                                                    {student.firstName[0]}{student.lastName[0]}
                                                </span>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {student.firstName} {student.lastName}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-sm text-gray-600">{student.email}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Award className="w-4 h-4 text-yellow-500 mr-1" />
                                            <span className="text-sm font-medium text-gray-900">{student.points}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${student.active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {student.active ? 'Active' : 'Blocked'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(student.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => onViewDetails(student._id)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onToggleStatus(student._id)}
                                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition"
                                                title={student.active ? 'Block' : 'Unblock'}
                                            >
                                                {student.active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => onResetPassword(student._id)}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                                                title="Reset Password"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(student._id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {students.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No students found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// CREATE USER TAB
// ============================================
function CreateUserTab({ token, onUserCreated }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    role: 'student'
                });
                onUserCreated();
            } else {
                setError(data.error || 'Failed to create user');
            }
        } catch (err) {
            setError('Failed to create user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>
                        <p className="text-sm text-gray-600">Add a new student or admin to the system</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-green-800">User created successfully!</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="John"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Minimum 6 characters"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters required</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role *
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Create User
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ============================================
// STUDENT DETAIL TAB
// ============================================
function StudentDetailTab({ student, onBack }) {
    return (
        <div className="space-y-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
                ← Back to Students
            </button>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-bold text-2xl">
                            {student.student.firstName[0]}{student.student.lastName[0]}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {student.student.firstName} {student.student.lastName}
                        </h2>
                        <p className="text-gray-600 mb-2">{student.student.email}</p>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${student.student.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {student.student.active ? 'Active' : 'Blocked'}
                            </span>
                            <span className="text-sm text-gray-500">
                                Joined {new Date(student.student.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 mb-1">Total Points</p>
                        <p className="text-2xl font-bold text-blue-900">{student.student.points}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-600 mb-1">Completed Lessons</p>
                        <p className="text-2xl font-bold text-green-900">
                            {student.progress?.filter(p => p.completed).length || 0}
                        </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-purple-600 mb-1">Submissions</p>
                        <p className="text-2xl font-bold text-purple-900">{student.submissions?.length || 0}</p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Submissions</h3>
                    {student.submissions && student.submissions.length > 0 ? (
                        <div className="space-y-3">
                            {student.submissions.slice(0, 5).map((submission, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{submission.lessonId}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(submission.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${submission.allPassed
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {submission.allPassed ? 'Passed' : 'Failed'}
                                        </span>
                                        <p className="text-sm text-gray-600 mt-1">+{submission.pointsEarned} pts</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No submissions yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

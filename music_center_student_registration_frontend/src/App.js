import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional Theme Tokens
 * These are used to style the page according to the provided style guide.
 */
const theme = {
  name: 'Ocean Professional',
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  gradientFrom: 'rgba(59,130,246,0.08)', // blue-500/10
  gradientTo: '#f9fafb',
};

/**
 * Helper for reading API base URL from environment (with fallback).
 * Users should set REACT_APP_BACKEND_URL in .env to the backend root URL.
 */
const getApiBase = () => {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl && typeof envUrl === 'string') {
    return envUrl.replace(/\/+$/, '');
  }
  // Fallback for local dev proxy or same-origin
  return '';
};

/**
 * Simple field component
 */
function Field({ label, name, type = 'text', required = false, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: theme.text }}>
        {label} {required && <span style={{ color: theme.secondary }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 10,
          border: '1px solid #e5e7eb',
          background: theme.surface,
          color: theme.text,
          outline: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.primary;
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
        }}
      />
    </div>
  );
}

/**
 * Select component for instrument choice
 */
function Select({ label, name, required = false, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: theme.text }}>
        {label} {required && <span style={{ color: theme.secondary }}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 10,
          border: '1px solid #e5e7eb',
          background: theme.surface,
          color: theme.text,
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.primary;
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
        }}
      >
        <option value="">Select instrument</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Button component
 */
function Button({ children, type = 'button', onClick, variant = 'primary', disabled }) {
  const styles = useMemo(() => {
    const base = {
      width: '100%',
      padding: '12px 16px',
      borderRadius: 12,
      fontWeight: 700,
      letterSpacing: 0.3,
      cursor: 'pointer',
      transition: 'transform 0.1s ease, box-shadow 0.2s ease, opacity 0.2s ease',
      boxShadow: '0 8px 24px rgba(37,99,235,0.15)',
      border: 'none',
    };
    if (variant === 'primary') {
      return {
        ...base,
        background: `linear-gradient(180deg, ${theme.primary}, #1E40AF)`,
        color: '#ffffff',
      };
    }
    if (variant === 'secondary') {
      return {
        ...base,
        background: `linear-gradient(180deg, ${theme.secondary}, #B45309)`,
        color: '#111827',
        boxShadow: '0 8px 24px rgba(245,158,11,0.18)',
      };
    }
    return base;
  }, []);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles,
        opacity: disabled ? 0.7 : 1,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {children}
    </button>
  );
}

/**
 * Simple alert component for feedback
 */
function Alert({ kind = 'success', message }) {
  const bg = kind === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.12)';
  const color = kind === 'error' ? theme.error : theme.secondary;
  const border = kind === 'error' ? 'rgba(239,68,68,0.25)' : 'rgba(245,158,11,0.25)';
  return (
    <div
      role="status"
      style={{
        marginTop: 12,
        padding: '10px 12px',
        background: bg,
        color,
        border: `1px solid ${border}`,
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {message}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Theme application to body background
  useEffect(() => {
    document.body.style.background = `linear-gradient(180deg, ${theme.gradientFrom}, ${theme.gradientTo})`;
  }, []);

  const [form, setForm] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    course: '',
    grade: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ kind: '', message: '' });

  // Optional Admin-only section toggle (for demo, use a query param ?admin=1)
  const [isAdmin] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === '1';
    } catch {
      return false;
    }
  });
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const courses = ['Children Piano', 'Adult Piano', 'Others'];
  const grades = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const apiBase = getApiBase();

  const validate = () => {
    if (!form.student_name || !form.email || !form.course) {
      setFeedback({ kind: 'error', message: 'Please fill in all required fields.' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFeedback({ kind: 'error', message: 'Please provide a valid email address.' });
      return false;
    }
    if (form.experience_years && Number.isNaN(Number(form.experience_years))) {
      setFeedback({ kind: 'error', message: 'Experience must be a number of years.' });
      return false;
    }
    return true;
  };

  // PUBLIC_INTERFACE
  async function submitForm(e) {
    e.preventDefault();
    setFeedback({ kind: '', message: '' });

    if (!validate()) return;

    setSubmitting(true);
    try {
      console.log('Submitting to:', `${apiBase}/api/students`);
      const res = await fetch(`${apiBase}/api/students`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          full_name: form.student_name,
          email: form.email,
          phone: form.phone,
          instrument: form.course,
          experience_level: form.grade ? `Grade ${form.grade}` : 'Beginner'
        }),
      });

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        let errorMessage;
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } else {
          errorMessage = await res.text();
        }
        console.error('API Error:', {
          status: res.status,
          statusText: res.statusText,
          error: errorMessage
        });
        throw new Error(errorMessage || `Server error: ${res.status}`);
      }

      setFeedback({ kind: 'success', message: 'Registration successful! We will contact you soon.' });
      setForm({
        student_name: '',
        parent_name: '',
        email: '',
        phone: '',
        course: '',
        grade: '',
      });
      if (isAdmin) {
        // refresh list if admin is viewing
        fetchStudents();
      }
    } catch (err) {
      setFeedback({ kind: 'error', message: `Error: ${err.message}` });
    } finally {
      setSubmitting(false);
    }
  }

  async function fetchStudents() {
    try {
      setLoadingStudents(true);
      const res = await fetch(`${apiBase}/api/students`);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to fetch students');
      }
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (err) {
      setFeedback({ kind: 'error', message: `Could not load students: ${err.message}` });
    } finally {
      setLoadingStudents(false);
    }
  }

  useEffect(() => {
    if (isAdmin) fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <div
      className="App"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '48px 16px',
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: 720,
        }}
      >
        {/* Header / Title Card */}
        <section
          aria-label="Header"
          style={{
            background: theme.surface,
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 35px rgba(17,24,39,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.06))`,
              pointerEvents: 'none',
            }}
          />
          <h1 style={{ margin: 0, color: theme.text, fontSize: 28 }}>
            Music Center Student Registration
          </h1>
          <p style={{ marginTop: 8, color: '#4b5563' }}>
            Join our community. Fill in your details below and choose your instrument.
          </p>
        </section>

        {/* Registration Form */}
        <section
          aria-label="Registration form"
          style={{
            background: theme.surface,
            borderRadius: 16,
            padding: 24,
            border: '1px solid #e5e7eb',
            boxShadow: '0 12px 40px rgba(17,24,39,0.06)',
          }}
        >
          <form onSubmit={submitForm} noValidate>
            <Field
              label="Student Name"
              name="student_name"
              required
              value={form.student_name}
              onChange={handleChange}
              placeholder="e.g., Alex Rivera"
            />
            <Field
              label="Parent Name"
              name="parent_name"
              value={form.parent_name}
              onChange={handleChange}
              placeholder="e.g., Jane Rivera"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <Field
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <Select
                label="Course"
                name="course"
                required
                value={form.course}
                onChange={handleChange}
                options={courses}
              />
              <Select
                label="Grade"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                options={grades}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
              <p style={{ marginTop: 8, color: '#6b7280', fontSize: 12 }}>
                By submitting, you agree to be contacted by our team regarding lessons and schedules.
              </p>
              {feedback.message && <Alert kind={feedback.kind} message={feedback.message} />}
            </div>
          </form>
        </section>

        {/* Optional Admin-only Table */}
        {isAdmin && (
          <section
            aria-label="Registered students"
            style={{
              background: theme.surface,
              borderRadius: 16,
              padding: 24,
              marginTop: 20,
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 35px rgba(17,24,39,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: theme.text, fontSize: 20 }}>Registered Students</h2>
              <button
                onClick={fetchStudents}
                style={{
                  background: 'transparent',
                  color: theme.primary,
                  border: `1px solid ${theme.primary}`,
                  padding: '8px 12px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Refresh
              </button>
            </div>
            <div style={{ marginTop: 12, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: '#f3f4f6' }}>
                    {['Student Name', 'Parent Name', 'Email', 'Phone', 'Course', 'Grade'].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          color: '#374151',
                          fontSize: 13,
                          borderBottom: '1px solid #e5e7eb',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loadingStudents ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                        Loading...
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                        No students registered yet.
                      </td>
                    </tr>
                  ) : (
                    students.map((s, idx) => (
                      <tr key={`${s.id || s.email || idx}`} style={{ background: idx % 2 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.student_name}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.parent_name}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.email}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.phone}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.course}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{s.grade || ''}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ marginTop: 24, textAlign: 'center', color: '#6b7280', fontSize: 12 }}>
          Ocean Professional UI • Modern minimalist with blue & amber accents
        </footer>
      </main>
    </div>
  );
}

export default App;

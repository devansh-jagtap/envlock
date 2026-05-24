"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("keydrop_token");
    if (savedToken) {
      setToken(savedToken);
      fetchProjects(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchProjects(authToken) {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem("keydrop_token", data.token);
        setToken(data.token);
        fetchProjects(data.token);
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  async function deleteProject(projectKey) {
    if (!confirm("Delete this project?")) return;

    try {
      await fetch(`${API_URL}/project/${projectKey}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects(token);
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  function logout() {
    localStorage.removeItem("keydrop_token");
    setToken("");
    setProjects([]);
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">KeyDrop Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No projects yet</p>
            <p className="text-sm text-gray-500">
              Run <code className="bg-gray-100 px-2 py-1 rounded">keydrop push</code> to create your first project
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{project.name || "Untitled"}</h3>
                    <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                      {project.projectKey}
                    </code>
                    <p className="text-xs text-gray-400 mt-2">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProject(project.projectKey)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

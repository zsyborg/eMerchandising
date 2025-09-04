"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleLogin(e) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchLeads();
    } else {
      setError("❌ Wrong password");
    }
  }

  async function fetchLeads() {
    try {
      const res = await fetch("https://e-merchandising.vercel.app/api/lead");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        setError("Failed to fetch leads");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleLogin}
          className="border p-6 rounded shadow-lg bg-white space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 text-center flex flex-col justify-center items-center">

      <h1 className="text-2xl font-bold mb-4 text-center">All Leads</h1>
      {loading ? (
          <>
            <img src="/loader.gif" className="text-center w-20" alt="Loading..." />
        </>
      ) : leads.length === 0 ? (
         <p className="text-gray-500">No leads found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Company</th>
              <th className="border border-gray-300 p-2">Ready</th>
              <th className="border border-gray-300 p-2">Business Type</th>
              <th className="border border-gray-300 p-2">Budget</th>
              <th className="border border-gray-300 p-2">Decision Maker</th>
              <th className="border border-gray-300 p-2">Timeline</th>
              <th className="border border-gray-300 p-2">Goals</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="border border-gray-300 p-2">{lead.name}</td>
                <td className="border border-gray-300 p-2">{lead.email}</td>
                <td className="border border-gray-300 p-2">{lead.phone}</td>
                <td className="border border-gray-300 p-2">{lead.company}</td>
                <td className="border border-gray-300 p-2">{lead.current_website}</td>
                <td className="border border-gray-300 p-2">{lead.business_type}</td>
                <td className="border border-gray-300 p-2">{lead.budget}</td>
                <td className="border border-gray-300 p-2">{lead.decision_maker}</td>
                <td className="border border-gray-300 p-2">{lead.timeline}</td>
                <td className="border border-gray-300 p-2">{lead.additional_info}</td>
                <td className="border border-gray-300 p-2">{ new Date(lead.datetime).toDateString({
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }) } {new Date(lead.datetime).toLocaleTimeString()}</td>
                {/* <td className="border border-gray-300 p-2">
                  {new Date(lead.createdAt).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
